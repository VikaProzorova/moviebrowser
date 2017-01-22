import React from 'react';
import { PageHeader, Jumbotron, Button } from 'react-bootstrap';
import API from '../api';
import { MovieList } from '../components';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            page: 1
        };
    }

    componentWillMount() {
        this.loadSearchResults(this.props.location.query.query);
    }

    componentWillReceiveProps(nextProps) {
        this.loadSearchResults(nextProps.location.query.query);
    }

    handleShowMoreSearchResults() {
        return API.getSearchResults(this.props.location.query.query, this.state.page + 1)
        .then(({ results }) => {
            this.setState({
                movies: this.state.movies.concat(results),
                page: this.state.page + 1
            });
        });
    }

    loadSearchResults(searchField) {
        API.getSearchResults(searchField, this.state.page)
        .then(({ results }) => {
            this.setState({
                movies: results
            });
        });
    }

    render() {
        return (
            <Jumbotron>
                <PageHeader> Search results <small>for '{this.props.location.query.query}'</small> </PageHeader>
                <MovieList movies={this.state.movies} />
                <Button bsStyle='primary' onClick={this.handleShowMoreSearchResults.bind(this)}> Show more </Button>
            </Jumbotron>
        );
    }
}

export default SearchResults;
