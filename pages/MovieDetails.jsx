import React from 'react';
import {Link} from 'react-router';
import API from '../api'
import MovieList from '../components/MovieList.jsx'
import FavoriteButton from '../components/Favorite.jsx'

let MovieDetails = React.createClass({

	getInitialState() {
		return {
			recommendations: [],
			page: 1
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

	render() {
		if (!this.state.movie) {
			return (<div> Loading </div>)
		}
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
				<FavoriteButton movieID={this.props.location.query.movieID}/>
			</div>
		)
	}
})
export default MovieDetails