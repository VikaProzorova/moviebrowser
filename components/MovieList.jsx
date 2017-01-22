import React from 'react';
import { withRouter } from 'react-router';
import { ListGroup, ListGroupItem, Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import Scrollchor from 'react-scrollchor';
import API from '../api';
import { FavoriteButton, GenreLabel } from '../components';

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        API.getGenres()
        .then(genres => this.setState({ genres }));
    }

    handleClick(movieID) {
        this.props.router.push({ pathname: '/movie', query: { movieID } });
    }

    render() {
        if (!this.state.genres) {
            return null;
        }

        const movies = this.props.movies.map(movie => {
            const movieGenres = movie.genres || movie.genre_ids.map(movieGenreId => {
                const genre = this.state.genres[movieGenreId];

                if (!genre) {
                    console.log('Missing genre:', movieGenreId, movie);
                }

                return genre;
            })
            .filter(genre => !!genre);

            return (<ListGroupItem key={movie.id}>
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={4} md={2}>
                            <img src={API.getImageSrc(movie.poster_path, 'w92')} />
                        </Col>

                        <Col xs={8} md={9}>
                            <Scrollchor to='' afterAnimate={() => this.handleClick(movie.id)}>
                                <h4>
                                    {movie.title} ({movie.release_date.split('-')[0]})
                                </h4>
                            </Scrollchor>
                            <p />
                            <span>
                                <h4>
                                    <Glyphicon glyph='star' />
                                    {movie.vote_average}
                                </h4>
                            </span>
                            <br />
                            <h4>
                                {movieGenres.map(genre => <GenreLabel key={genre.id} genre={genre} />)}
                            </h4>
                        </Col>

                        <Col xs={4} md={1}>
                            <h4> <FavoriteButton movieID={movie.id} /> </h4>
                        </Col>
                    </Row>
                </Grid>

            </ListGroupItem>);
        });

        return <ListGroup>{movies}</ListGroup>;
    }

}

export default withRouter(MovieList);
