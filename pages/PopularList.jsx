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
			<div>
				<MovieList movies={this.state.movies}/> 
				<button onClick={this.handleSwowMore}> Show more </button>
			</div>
		);
	}
})
export default PopularList
