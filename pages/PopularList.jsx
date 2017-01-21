import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import MovieList from '../components/MovieList.jsx'

let PopularList = React.createClass({
	handleSwowMore() {
		API.getPopularMovies(this.state.page+1)
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
			searchField: ''
		};
	},

	componentWillMount() {
		API.getPopularMovies(this.state.page)
		.then(({results}) => {
			this.setState({ 
				movies: results
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
		return (
			<div>
				<input type="text" value={this.state.searchField} onChange={this.updateSearchField}/>

				<Link onClick={this.handleSearch} to={{ pathname: '/search', query: { query: this.state.searchField } }}> Search </Link>

				<MovieList movies={this.state.movies}/> 
				
				<button onClick={this.handleSwowMore}> Show more </button>
			</div>
		);
	}
})
export default PopularList
