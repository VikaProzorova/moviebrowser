import React from 'react';
import {Link} from 'react-router';
import API from '../api'

let Search = React.createClass({
	getInitialState() {
		return {
			searchField: '' 
		};
	},
	updateSearchField(event) {
		this.setState({
			searchField: event.target.value
		})
	},
	handleSearch(event) {
		this.setState({
			searchField: ''
		})
		
		if (!this.state.searchField) {
			event.preventDefault()	
		}
	},

	render() {
		return (
			<div>
			<input type="text" value={this.state.searchField} onChange={this.updateSearchField}/>

			<Link onClick={this.handleSearch} to={{ pathname: '/search', query: { query: this.state.searchField } }}> Search </Link>

			</div>
		)
	}
})
export default Search