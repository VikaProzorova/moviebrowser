import React from 'react';
import {Link} from 'react-router';
import API from './api'

let FavoritesList = React.createClass({
	getInitialState() {
		return {
			movies: []
		}
	},

	componentWillMount() {
		let favoritesIDs = Object.keys(JSON.parse( localStorage.getItem("favorites") || '{}' ))

		Promise.all(favoritesIDs.map(API.getMovieDetails))
		.then(movies => this.setState({movies}))
	},

	render() {
		let movies = this.state.movies.map(movie => {
			return <li key={movie.id}> 
				<Link to={{ pathname: '/movie', query: { movieID: movie.id } }}> {movie.title} </Link> 
			</li>
		})

		return (
			<div>
				<ul> 
					{movies}
				</ul>
			</div>
		);
	},
})
export default FavoritesList
