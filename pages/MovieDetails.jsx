import React from 'react';
import {
    PageHeader, Jumbotron, Grid, Row, Col, Glyphicon,
    OverlayTrigger, Tooltip, Table
} from 'react-bootstrap';
import API from '../api';
import { FavoriteButton, GenreLabel, MovieList } from '../components';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendations: [],
            page: 1
        };
    }

    componentWillMount() {
        this.loadMovie(this.props.location.query.movieID);
    }

    componentWillReceiveProps(nextProps) {
        this.loadMovie(nextProps.location.query.movieID);
    }

    handleShowMore() {
        const nextPage = this.state.page + 1;

        return API.getMovieRecommendations(this.props.location.query.movieID, nextPage)
        .then(({ results }) => this.setState({
            recommendations: this.state.recommendations.concat(results),
            page: nextPage
        }));
    }

    loadMovie(movieID) {
        Promise.all([
            API.getMovieDetails(movieID),
            API.getMovieRecommendations(movieID, this.state.page)
        ])
        .then(([movie, { results } ]) => {
            this.setState({
                movie,
                recommendations: results
            });
        });
    }

    render() {
        if (!this.state.movie) {
            return (<div> Loading </div>);
        }
        const tooltip = <Tooltip id='tooltip'>Vote average/vote count</Tooltip>;
        const bigImage = (<Tooltip id='big-image'>
            <img src={API.getImageSrc(this.state.movie.poster_path, 'w500')} />
        </Tooltip>);
        const movieHomepage = this.state.movie.homepage;

        return (
            <Jumbotron>
                <PageHeader> {this.state.movie.title}
                    <br />
                    <small> ({this.state.movie.release_date.split('-')[0]}) </small>
                </PageHeader>
                <br />

                <Grid>
                    <Row className='show-grid'>
                        <Col xs={4} md={4}>
                            <OverlayTrigger trigger='click' overlay={bigImage}>
                                <img src={API.getImageSrc(this.state.movie.poster_path)} />
                            </OverlayTrigger>
                        </Col>
                        <Col xs={4} md={2} />
                        <Col xs={8} md={6}>
                            <h4>
                                {this.state.movie.genres.map(genre => <GenreLabel key={genre.id} genre={genre} />)}
                            </h4>
                            <br />

                            <span>
                                <h4> <i> {this.state.movie.tagline} </i> </h4>
                            </span>

                            <h2> <FavoriteButton movieID={this.props.location.query.movieID} /> </h2>

                            <span>
                                <h3>
                                    <OverlayTrigger overlay={tooltip}>
                                        <span> <Glyphicon glyph='star' />
                                            {this.state.movie.vote_average} / {this.state.movie.vote_count}
                                        </span>
                                    </OverlayTrigger>
                                </h3>
                            </span>

                            <br />
                            <span>
                                <h4>Overview</h4>
                                <p />
                                {this.state.movie.overview}
                            </span>
                        </Col>
                    </Row>
                </Grid>
                <br />

                <Table responsive>
                    <tbody>
                        <tr>
                            <td>Production countries</td>
                            <td>{this.state.movie.production_countries.map(country => country.name).join(', ')} </td>
                        </tr>
                        <tr>
                            <td>Production companies</td>
                            <td>{this.state.movie.production_companies.map(country => country.name).join(', ')} </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{this.state.movie.status} </td>
                        </tr>
                        <tr>
                            <td>Release Information</td>
                            <td> {new Date(this.state.movie.release_date).toLocaleDateString()}
                            </td>
                        </tr>
                        <tr>
                            <td>Budget</td>
                            <td>{this.state.movie.budget} $ </td>
                        </tr>
                        <tr>
                            <td>Revenue</td>
                            <td>{this.state.movie.revenue} $ </td>
                        </tr>
                        <tr>
                            <td>Homepage</td>
                            <td>
                                <a href={movieHomepage} target='_blank'>
                                    {movieHomepage}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <br />
                <h3> Recommendations</h3>
                <MovieList movies={this.state.recommendations} />
                {/* <Button bsStyle='primary' onClick={this.handleShowMore.bind(this)}> Show more </Button> - TODO */}
            </Jumbotron>
        );
    }
}

export default MovieDetails;
