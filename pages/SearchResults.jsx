import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import MovieList from '../components/MovieList.jsx'

let SearchResults = React.createClass({
	componentWillReceiveProps(nextProps) {
		this.loadSearchResults(nextProps.location.query.query)
	},

	getInitialState() {
		return {
			movies: [],
			page: 1
		};
	},

	componentWillMount() {
		this.loadSearchResults(this.props.location.query.query)
	},

	loadSearchResults(searchField) {
		API.getSearchResults(searchField, this.state.page)
		.then(({results}) => {
			this.setState({ 
				movies: results,
			})
		})
	},

	handleSwowMoreSearchResults() {
		return API.getSearchResults(this.props.location.query.query, this.state.page+1)
		.then(({results}) => {
			this.setState({
				movies: this.state.movies.concat(results),
				page: this.state.page+1
			})
		});
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
export default SearchResults