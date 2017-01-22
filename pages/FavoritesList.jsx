import React from 'react';
import { PageHeader, Jumbotron } from 'react-bootstrap';
import API from '../api';
import { MovieList } from '../components';

class FavoritesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        };
    }

    componentWillMount() {
        const favoritesIDs = Object.keys(JSON.parse(localStorage.getItem('favorites') || '{}'));

        Promise.all(favoritesIDs.map(API.getMovieDetails))
        .then(movies => this.setState({ movies }));
    }

    render() {
        return (
            <Jumbotron>
                <PageHeader> Favorite movies </PageHeader>
                <MovieList movies={this.state.movies} />
            </Jumbotron>
        );
    }
}

export default FavoritesList;
