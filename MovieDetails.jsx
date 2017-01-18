import React from 'react';
import {Link} from 'react-router';
import API from './api'

let MovieDetails = React.createClass({


	getInitialState() {
		return {
			recommendations: [],
			page: 1
		}
	},

	componentWillMount() {
		this.loadMovie(this.props.location.query.movieID)
	},

	componentWillReceiveProps(nextProps) {
		this.loadMovie(nextProps.location.query.movieID)
	},

	loadMovie(movieID) {
		Promise.all([ 
			API.getMovieDetails(movieID), 
			API.getMovieRecommendations(movieID, this.state.page) 
		])
		.then(([movie, {results}]) => {
			this.setState({
				movie: movie,
				recommendations: results
			})
		})
	},
	addToFavorites() {
		let favorites = JSON.parse( localStorage.getItem("favorites") || '{}' )
		favorites[this.props.location.query.movieID] = true
		localStorage.setItem("favorites", JSON.stringify(favorites)) 
	},

	render() {
		if (!this.state.movie) {
			return (<div> Loading </div>)
		}

		return(
			<div> 
				{this.state.movie.title}
				<br/>
				{this.state.movie.tagline}
				<br/>
				<img src={API.getImageSrc(this.state.movie.poster_path)}/>
				<br/>
				{this.state.movie.genres.map(genre => genre.name).join(', ')}
				<br/>
				{this.state.movie.overview}
				<ul> 
					{this.state.recommendations.map(recommendation => {
						return <li key={recommendation.id}> 
							<Link to={{ pathname: '/movie', query: { movieID: recommendation.id } }}> {recommendation.title} </Link> 
						</li>
					})}
				</ul>
				<button onClick={this.addToFavorites}> Favorite </button>

			</div>
		)
	}
})
export default MovieDetails