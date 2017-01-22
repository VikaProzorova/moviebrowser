import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { PopularList, SearchResults, MovieDetails, FavoritesList } from './pages';
import { Container } from './components';

class NoMatch extends React.Component {
    render() {
        return (<h1> 404 page not found </h1>);
    }
}

render((
    <Router history={browserHistory}>
        <Route path='/' component={Container}>
            <IndexRoute component={PopularList} />
            <Route path='search' component={SearchResults} />
            <Route path='movie' component={MovieDetails} />
            <Route path='favorites' component={FavoritesList} />
            <Route path='*' component={NoMatch} />
        </Route>
    </Router>
), document.getElementById('app'));

