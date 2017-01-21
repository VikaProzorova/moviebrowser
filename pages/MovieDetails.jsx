import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import MovieList from '../components/MovieList.jsx'

let MovieDetails = React.createClass({

	getInitialState() {
		return {
			recommendations: [],
			page: 1,
			isFavorite: this.getFavorites()[this.props.location.query.movieID]
		}
	},

	componentWillMount() {
		this.loadMovie(this.props.location.query.movieID)
	},

	componentWillReceiveProps(nextProps) {
		this.loadMovie(nextProps.location.query.movieID)
	},

	loadMovie(movieID) {
		Promise.all([ 
			API.getMovieDetails(movieID), 
			API.getMovieRecommendations(movieID, this.state.page) 
		])
		.then(([movie, {results}]) => {
			this.setState({
				movie: movie,
				recommendations: results
			})
		})
	},

	getFavorites() {
		let favorites = JSON.parse( localStorage.getItem("favorites") || '{}' )
		return favorites;
	},

	setFavorites(favorites){
		localStorage.setItem("favorites", JSON.stringify(favorites)) 
	},

	addToFavorites() {
		let favorites = this.getFavorites();
		favorites[this.props.location.query.movieID] = true
		this.setFavorites(favorites)
		this.setState({isFavorite: true})
	},

	deleteFromFavorites() {
		let favorites = this.getFavorites();
		delete favorites[this.props.location.query.movieID] 
		this.setFavorites(favorites)
		this.setState({isFavorite: false})
	},

	render() {
		if (!this.state.movie) {
			return (<div> Loading </div>)
		}
		let favoritesButton = this.state.isFavorite
			? <button onClick={this.deleteFromFavorites}> Not a Favorite </button> 
			: <button onClick={this.addToFavorites}> Favorite </button>

		return(
			<div> 
				{this.state.movie.title}
				<br/>
				{this.state.movie.tagline}
				<br/>
				<img src={API.getImageSrc(this.state.movie.poster_path)}/>
				<br/>
				{this.state.movie.genres.map(genre => genre.name).join(', ')}
				<br/>
				{this.state.movie.overview}
				<MovieList movies={this.state.recommendations}/> 
				{favoritesButton}
			</div>
		)
	}
})
export default MovieDetails