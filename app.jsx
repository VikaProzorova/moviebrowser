import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, Link, browserHistory, withRouter } from 'react-router';
import { Nav, NavItem, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap'
import { PopularList, SearchResults, MovieDetails, FavoritesList} from './pages'
import { Search } from "./components"

let NoMatch = React.createClass({
	render() {
		return (<h1> 404 page not found </h1>)
	}
})

let Navigator = React.createClass({
	handleSelect(key) {
		this.props.router.push(key)
	},

	render() {
		console.log(this.props)
		return  <Navbar fixedTop>
		    <Navbar.Header>
		     	<Navbar.Brand>
		       		MovieBrowser
		     	</Navbar.Brand>
		     	<Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		     	
		      	<Navbar.Form>
		        	<Nav bsStyle="tabs" activeKey={this.props.location.pathname} onSelect={this.handleSelect}>
		        		<NavItem eventKey='/'>Popular</NavItem>
		        		<NavItem eventKey='/favorites'>Favorites</NavItem>

		        	</Nav>
		        	<Search pullRight/>
		      	</Navbar.Form>
		    </Navbar.Collapse>
		 </Navbar>
	}

})

let NavigatorWithRouter = withRouter(Navigator)


let Container = (props) => (
	<div className="container">
		<NavigatorWithRouter />
		{props.children}
	</div>
)

render((
 	<Router history={browserHistory}>
    	<Route path="/" component={Container}>
    		<IndexRoute component={PopularList}/>
      		<Route path="search" component={SearchResults}/>
      		<Route path="movie" component={MovieDetails}/>
      		<Route path="favorites" component={FavoritesList}/>
      		<Route path="*" component={NoMatch}/>
      	</Route>
  	</Router>
), document.getElementById('app'));

