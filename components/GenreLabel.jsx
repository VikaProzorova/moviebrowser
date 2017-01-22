import React from 'react';
import { Label } from 'react-bootstrap';

let colors = ['primary', 'success', 'info', 'warning', 'danger']

let FavoriteButton = React.createClass({
	render() {
		let genre = this.props.genre
		let color = colors[genre.id % colors.length]

		return <span key={genre.id}>
			<Label bsStyle={color}>{genre.name}</Label>
			{' '}
		</span>
	}
})

export default FavoriteButton

