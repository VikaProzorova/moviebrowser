import React from 'react';
import {render} from 'react-dom';

let MoviesList = React.createClass({
    getMovies() {
	    return fetch("https://api.themoviedb.org/3/movie/popular?api_key=2a2664a82e0d0058bcadc0913a2ceb83&language=en-US&page=1", {
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
	

	getInitialState() {
		return {
			movies: [],
			genres: []
		};
	},

	componentWillMount() {
		Promise.all([ this.getMovies(), this.getGenres() ])
		.then(([moviesResponse, {genres}]) => {

			let movies = moviesResponse.results.map(movie => {
				let movieGenres = movie.genre_ids.map(movieGenreId => {
					return genres.find(genre => genre.id == movieGenreId)
				})

				movie.genres = movieGenres
				return movie
			})

			this.setState({ 
				movies,
				genres
			})
		})
	},

	render() {
		let movies = this.state.movies.map(movie => {
			let genresNames = movie.genres.map(genre => genre.name).join(', ')

			return <li key={movie.id}>{movie.title}, genres: {genresNames}</li>
		})

		return (
			<ul> 
				{movies}
			</ul>
		);
	}

  }
)

render(<MoviesList/>, document.getElementById('app'));