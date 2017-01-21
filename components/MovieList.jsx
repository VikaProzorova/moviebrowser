import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import FavoriteButton from '../components/Favorite.jsx'

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

			let movieGenresNames = movieGenres.map(genre => genre.name).join(', ')
			console.log(movie.id)
			return <li key={movie.id}> 
				<Link to={{ pathname: '/movie', query: { movieID: movie.id } }}> {movie.title}, {movieGenresNames} </Link> 
				<FavoriteButton movieID={movie.id}/>
			</li>

		})

		return <ul>{movies}</ul>
	}

})
export default MovieList