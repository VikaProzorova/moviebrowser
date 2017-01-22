import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import {FavoriteButton, GenreLabel} from '../components'
import {ListGroup, ListGroupItem, Grid, Row, Col, Glyphicon } from 'react-bootstrap'

let MovieList = React.createClass({
	getInitialState() {
		return {
		};
	},

	componentWillMount() {
		API.getGenres()
		.then(genres => this.setState({genres}))
	},

	render() {
		if (!this.state.genres) {
			return null
		}

		let movies = this.props.movies.map(movie => {
			let movieGenres = movie.genres || movie.genre_ids.map(movieGenreId => {
				let genre = this.state.genres[movieGenreId]
				if (!genre) {
					console.log('Missing genre:', movieGenreId, movie)
				}
				return genre
			})
			.filter(genre => !!genre)

			return <ListGroupItem key={movie.id}> 
				<Grid>
				    <Row className="show-grid">
					    <Col xs={4} md={2}>
							<img src={API.getImageSrc(movie.poster_path, "w92")}/> 
						</Col>

						<Col xs={8} md={9}>
							<Link to={{ pathname: '/movie', query: { movieID: movie.id } }}> 
								<h4> 
									{movie.title} ({movie.release_date.split("-")[0]})
								</h4> 
							</Link> 
							<p/>
							<span> 
								<h4>
							      	<Glyphicon glyph="star"/> 
							      	{movie.vote_average} 
						   		</h4> 
						    </span>
							<br/> 
								<h4>
								{movieGenres.map(genre => <GenreLabel key={genre.id} genre={genre}/>)} 
								</h4>
						</Col>

						<Col xs={4} md={1}>
							<h4> <FavoriteButton movieID={movie.id}/> </h4>
						</Col>
					</Row>
				</Grid>

			</ListGroupItem>

		})

		return <ListGroup>{movies}</ListGroup>
	}

})
export default MovieList