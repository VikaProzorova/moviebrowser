import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';
import pages from './pages'
import Search from "./components/Search.jsx"

let NoMatch = React.createClass({
	render() {
		return (<h1> 404 page not found </h1>)
	}
})

let Navigator = () => (
	<div> 
		<Search/>
		<Link to='/'> Home </Link>
		<Link to='/favorites'> Favorites </Link>
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
    		<IndexRoute component={pages.PopularList}/>
      		<Route path="search" component={pages.SearchResults}/>
      		<Route path="movie" component={pages.MovieDetails}/>
      		<Route path="favorites" component={pages.FavoritesList}/>
      		<Route path="*" component={NoMatch}/>
      	</Route>
  	</Router>
), document.getElementById('app'));

