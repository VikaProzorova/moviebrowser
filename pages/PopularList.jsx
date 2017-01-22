import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import {MovieList} from '../components'
import {PageHeader, Jumbotron, Button} from 'react-bootstrap'


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
			page: 1
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

	render() {
		return (
			
			<Jumbotron>
				<PageHeader> Popular movies </PageHeader>
				<MovieList movies={this.state.movies}/> 
				<Button bsStyle="primary" onClick={this.handleSwowMore}> Show more </Button>
			</Jumbotron>
		);
	}
})
export default PopularList
