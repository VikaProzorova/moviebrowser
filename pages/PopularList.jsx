import React from 'react';
import { PageHeader, Jumbotron, Button } from 'react-bootstrap';
import API from '../api';
import { MovieList } from '../components';

class PopularList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            page: 1
        };
    }

    componentWillMount() {
        API.getPopularMovies(this.state.page)
        .then(({ results }) => {
            this.setState({
                movies: results
            });
        });
    }

    handleShowMore() {
        API.getPopularMovies(this.state.page + 1)
        .then(({ results }) => {
            this.setState({
                movies: this.state.movies.concat(results),
                page: this.state.page + 1
            });
        });
    }

    render() {
        return (
            <Jumbotron>
                <PageHeader> Popular movies </PageHeader>
                <MovieList movies={this.state.movies} />
                <Button bsStyle='primary' onClick={this.handleShowMore.bind(this)}> Show more </Button>
            </Jumbotron>
        );
    }
}

export default PopularList;
