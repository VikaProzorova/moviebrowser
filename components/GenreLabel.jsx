import React from 'react';
import { Label } from 'react-bootstrap';

const colors = ['primary', 'success', 'info', 'warning', 'danger'];

class GenreLabel extends React.Component {
    render() {
        const genre = this.props.genre;
        const color = colors[genre.id % colors.length];

        return (<span key={genre.id}>
            <Label bsStyle={color}>{genre.name}</Label>
            {' '}
        </span>);
    }
}

export default GenreLabel;

