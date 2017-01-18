import React from 'react';
import {Link} from 'react-router';
import API from './api'

let Search = React.createClass({
	handleSwowMoreSearchResults() {
		return API.getSearchResults(this.state.searchField, this.state.page+1)
		.then(({results}) => {
			this.setState({
				movies: this.state.movies.concat(results),
				page: this.state.page+1
			})
		});
	},
	getInitialState() {
		return {
			movies: [],
			page: 1,
			searchField: this.props.location.query.query
		};
	},

	componentWillMount() {
		Promise.all([ API.getSearchResults(this.state.searchField, this.state.page), API.getGenres() ])
		.then(([{results}, genres]) => {
			this.setState({ 
				movies: results,
				genres
			})
		})
	},

	render() {
		let movies = this.state.movies.map(movie => {
			let movieGenres = movie.genre_ids.map(movieGenreId => this.state.genres[movieGenreId]).join(', ')
			return <li key={movie.id}> 
				<Link to={{ pathname: '/movie', query: { movieID: movie.id } }}> {movie.title} </Link> 
				{movieGenres}
			</li>
		})

		return (
			<div>
				<h1> Search results </h1>
				<ul> 
					{movies}
				</ul>
				<button onClick={this.handleSwowMoreSearchResults}> Show more </button>
			</div>
		)
	}
})
export default Search