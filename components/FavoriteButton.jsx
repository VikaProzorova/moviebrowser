import React from 'react';
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

class FavoriteButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFavorite: this.getFavorites()[this.props.movieID]
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isFavorite: this.getFavorites()[nextProps.movieID]
        });
    }

    getFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');


        return favorites;
    }

    setFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    addToFavorites() {
        const favorites = this.getFavorites();

        favorites[this.props.movieID] = true;
        this.setFavorites(favorites);
        this.setState({ isFavorite: true });
    }

    deleteFromFavorites() {
        const favorites = this.getFavorites();

        delete favorites[this.props.movieID];
        this.setFavorites(favorites);
        this.setState({ isFavorite: false });
    }

    render() {
        if (this.state.isFavorite) {
            const tooltip = <Tooltip id='tooltip'>Remove from favorites</Tooltip>;

            return (<OverlayTrigger overlay={tooltip}>
                <Glyphicon onClick={this.deleteFromFavorites.bind(this)} glyph='heart' />
            </OverlayTrigger>);
        }

        const tooltip = <Tooltip id='tooltip'>Add to favorites</Tooltip>;

        return (<OverlayTrigger overlay={tooltip}>
            <Glyphicon onClick={this.addToFavorites.bind(this)} glyph='heart-empty' />
        </OverlayTrigger>);
    }
}

export default FavoriteButton;
