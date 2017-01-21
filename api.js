const token = '2a2664a82e0d0058bcadc0913a2ceb83'
const domain = 'https://api.themoviedb.org'
const language = 'en-US'
const imagesDomain = 'http://image.tmdb.org/t/p'

export default {
	 getPopularMovies(page) {
	    return fetch(`${domain}/3/movie/popular?api_key=${token}&language=${language}&page=${page}`, {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	},

	getGenres() {
	    return fetch(`${domain}/3/genre/movie/list?api_key=${token}&language=${language}`, {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	    .then(({genres}) => {
	    	let formattedGenres = {}

	    	for (var i = 0; i < genres.length; i++) {
	    		formattedGenres[genres[i].id] = genres[i]
	    	}
	    	return formattedGenres;	
	    })
	},

	getSearchResults(query, page) {
		return fetch(`${domain}/3/search/movie?api_key=${token}&language=${language}&query=${query}&page=${page}`, {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	},

	getMovieDetails(movieID) {
		return fetch(`${domain}/3/movie/${movieID}?api_key=${token}&language=${language}`, {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	},

	getMovieRecommendations(movieID, page) {
		return fetch(`${domain}/3/movie/${movieID}/recommendations?api_key=${token}&language=${language}&page=${page}`, {
	        method: "get",
	        credentials: "same-origin"
	    })
	    .then(response => response.json())
	},
	

	getImageSrc(imagePath, size='w185') {
		return `${imagesDomain}/${size}${imagePath}`
	}
}