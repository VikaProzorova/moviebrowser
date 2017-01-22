import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import {MovieList} from '../components'
import {PageHeader, Jumbotron, Button} from 'react-bootstrap'

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
			<Jumbotron>
				<PageHeader> Search results <small>for "{this.props.location.query.query}"</small> </PageHeader>
				<MovieList movies={this.state.movies}/> 
				<Button bsStyle="primary" onClick={this.handleSwowMoreSearchResults}> Show more </Button>
			</Jumbotron>
		)
	}
})
export default SearchResults