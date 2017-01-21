import React from 'react';
import {Link} from 'react-router';
import API from '../api'

let FavoriteButton = React.createClass({
	getInitialState() {
		return{
			isFavorite: this.getFavorites()[this.props.movieID]
		}
	},

	componentWillReceiveProps(nextProps) {
		this.setState({
			isFavorite: this.getFavorites()[nextProps.movieID]
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
		favorites[this.props.movieID] = true
		this.setFavorites(favorites)
		this.setState({isFavorite: true})
	},

	deleteFromFavorites() {
		let favorites = this.getFavorites();
		delete favorites[this.props.movieID] 
		this.setFavorites(favorites)
		this.setState({isFavorite: false})
	},

	render() {

		let favoritesButton = this.state.isFavorite
			? <button onClick={this.deleteFromFavorites}> Not a Favorite </button> 
			: <button onClick={this.addToFavorites}> Favorite </button>
		return (favoritesButton)
	}
})

export default FavoriteButton