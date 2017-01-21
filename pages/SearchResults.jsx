import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import MovieList from '../components/MovieList.jsx'

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
		API.getSearchResults(this.state.searchField, this.state.page)
		.then(({results}) => {
			this.setState({ 
				movies: results,
			})
		})
	},

	render() {
		return (
			<div>
				<h1> Search results </h1>
				<MovieList movies={this.state.movies}/> 
				<button onClick={this.handleSwowMoreSearchResults}> Show more </button>
			</div>
		)
	}
})
export default Search