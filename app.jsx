import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

let MoviesList = React.createClass({
    getMovies(page) {
	    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2a2664a82e0d0058bcadc0913a2ceb83&language=en-US&page=${page}`, {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	},

	getGenres() {
	    return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=2a2664a82e0d0058bcadc0913a2ceb83&language=en-US", {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	},

	getSearch(query) {
		return fetch(`https://api.themoviedb.org/3/search/movie?api_key=2a2664a82e0d0058bcadc0913a2ceb83&language=en-US&query=${query}`, {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	},

	handleSwowMore() {
		return this.getMovies(this.state.page+1)
		.then(({results}) => {
			this.setState({
				movies: this.state.movies.concat(results),
				page: this.state.page+1
			})
		});
	},

	handleSearch() {
		return this.getSearch(this.state.searchField)
		.then(({results}) => {
			this.setState({
				movies: this.state.results
			})
		})
	},

	updateSearchField(event) {
		this.setState({
			searchField: event.target.value
		})
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
		Promise.all([ this.getMovies(this.state.page), this.getGenres() ])
		.then(([{results}, {genres}]) => {
			this.setState({ 
				movies: results,
				genres
			})
		})
	},

	render() {
		let movies = this.state.movies.map(movie => {
			let movieGenres = movie.genre_ids.map(movieGenreId => {
				return this.state.genres.find(genre => genre.id == movieGenreId)
			})

			let genresNames = movieGenres.map(genre => genre.name).join(', ')

			return <li key={movie.id}>{movie.title}, genres: {genresNames}</li>
		})

		return (
			<div>
				<input type="text" value={this.state.searchField} onChange={this.updateSearchField}/>

				<button onClick={this.handleSearch}> Search </button>

				<ul> 
					{movies}
				</ul>

				<button onClick={this.handleSwowMore}> Show more </button>
			</div>
		);
	},
})

let Search = React.createClass({
	render() {
		return (
			<h1> ok </h1>
		)
	}
})

let NoMatch = React.createClass({
	render() {
		return (<h1> 404 page not found </h1>)
	}
})

render((
 	<Router history={browserHistory}>
    	<Route path="/" component={MoviesList}/>
      	<Route path="search" component={Search}/>
      	<Route path="*" component={NoMatch}/>

  	</Router>
), document.getElementById('app'));



