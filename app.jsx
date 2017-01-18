import React from 'react';
import {render} from 'react-dom';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';
import MoviesList from './MoviesList.jsx';
import Search from './Search.jsx'
import MovieDetails from './MovieDetails.jsx'

let NoMatch = React.createClass({
	render() {
		return (<h1> 404 page not found </h1>)
	}
})

let Navigator = () => (
	<div> 
		<Link to='/'> Home </Link>
	</div>
)

let Container = (props) => (
	<div>
		<Navigator />
		{props.children}
	</div>
)

render((
 	<Router history={browserHistory}>
    	<Route path="/" component={Container}>
    		<IndexRoute component={MoviesList}/>
      		<Route path="search" component={Search}/>
      		<Route path="movie" component={MovieDetails}/>
      		<Route path="*" component={NoMatch}/>
      	</Route>
  	</Router>
), document.getElementById('app'));

