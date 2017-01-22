import React from 'react';
import {Link} from 'react-router';
import { Button, Navbar, FormGroup, FormControl } from 'react-bootstrap';
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
			<Navbar.Form pullLeft>
				<FormGroup>
          			<FormControl type="text" placeholder="Search" value={this.state.searchField} onChange={this.updateSearchField}/>
        		</FormGroup>
        		{' '}
        		<Link onClick={this.handleSearch} to={{ pathname: '/search', query: { query: this.state.searchField } }}> Submit </Link>
      		</Navbar.Form>


		)
	}
})
export default Search