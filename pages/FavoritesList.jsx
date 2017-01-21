import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import MovieList from '../components/MovieList.jsx'

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
		return (
			<div>
				<MovieList movies={this.state.movies}/> 
			</div>
		);
	},
})
export default FavoritesList
