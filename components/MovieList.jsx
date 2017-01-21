import React from 'react';
import {Link} from 'react-router';
import API from '../api'

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
			let movieGenres = movie.genres || movie.genre_ids.map(movieGenreId => this.state.genres[movieGenreId])
			let movieGenresNames = movieGenres.map(genre => genre.name).join(', ')

			return <li key={movie.id}> 
				<Link to={{ pathname: '/movie', query: { movieID: movie.id } }}> {movie.title}, {movieGenresNames} </Link> 
			</li>
		})

		return <ul>{movies}</ul>
	}

})
export default MovieList