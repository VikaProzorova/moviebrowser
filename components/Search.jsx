import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchField: ''
        };
    }

    handleSearch() {
        this.setState({
            searchField: ''
        });

        const searchField = this.state.searchField;
        if (searchField) {
            this.props.router.push({ pathname: '/search', query: { query: searchField } });
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    updateSearchField(event) {
        this.setState({
            searchField: event.target.value
        });
    }

    render() {
        const searchField = this.state.searchField;

        return (
            <Navbar.Form pullLeft>
                <FormGroup>
                    <FormControl
                        type='text'
                        placeholder='Search'
                        value={searchField}
                        onChange={this.updateSearchField.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                </FormGroup>
                {' '}
                <Button onClick={this.handleSearch.bind(this)} >
                    Submit
                </Button>
            </Navbar.Form>


        );
    }
}

export default withRouter(Search);
