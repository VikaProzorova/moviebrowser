import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import {MovieList} from '../components'
import {PageHeader, Jumbotron} from 'react-bootstrap'

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
			<Jumbotron>
				<PageHeader> Favorite movies </PageHeader>
				<MovieList movies={this.state.movies}/> 
			</Jumbotron>
		);
	},
})
export default FavoritesList
