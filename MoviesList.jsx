import React from 'react';
import {Link} from 'react-router';
import API from './api'

let MoviesList = React.createClass({
	handleSwowMore() {
		return API.getPopularMovies(this.state.page+1)
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
			genres: [],
			page: 1,
			searchField: ''
		};
	},

	componentWillMount() {
		Promise.all([ API.getPopularMovies(this.state.page), API.getGenres() ])
		.then(([{results}, genres]) => {
			this.setState({ 
				movies: results,
				genres
			})
		})
	},

	updateSearchField(event) {
		this.setState({
			searchField: event.target.value
		})
	},

	handleSearch(event) {
		if (!this.state.searchField) {
			event.preventDefault()	
		}
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
				<input type="text" value={this.state.searchField} onChange={this.updateSearchField}/>

				<Link onClick={this.handleSearch} to={{ pathname: '/search', query: { query: this.state.searchField } }}> Search </Link>

				<ul> 
					{movies}
				</ul>

				<button onClick={this.handleSwowMore}> Show more </button>
			</div>
		);
	},
})
export default MoviesList
