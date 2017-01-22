import React from 'react';
import { Link } from 'react-router';
import { Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
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
		if (this.state.isFavorite) {
			let tooltip = <Tooltip id="tooltip">Remove from favorites</Tooltip>

			return <OverlayTrigger overlay={tooltip}>
				<Glyphicon onClick={this.deleteFromFavorites} glyph="heart"/>
			</OverlayTrigger>
		} 

		let tooltip = <Tooltip id="tooltip">Add to favorites</Tooltip>

		return <OverlayTrigger overlay={tooltip}>
			<Glyphicon onClick={this.addToFavorites} glyph="heart-empty"/>
		</OverlayTrigger>
	}
})

export default FavoriteButton