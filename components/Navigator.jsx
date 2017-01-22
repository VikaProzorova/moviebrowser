import React from 'react';
import { withRouter } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { Search } from './';

class Navigator extends React.Component {
    handleSelect(key) {
        this.props.router.push(key);
    }

    render() {
        return (<Navbar fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    MovieBrowser
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>

                <Navbar.Form>
                    <Nav bsStyle='tabs' activeKey={this.props.location.pathname} onSelect={this.handleSelect.bind(this)}>
                        <NavItem eventKey='/'>Popular</NavItem>
                        <NavItem eventKey='/favorites'>Favorites</NavItem>
                    </Nav>
                    <Search pullRight />
                </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>);
    }
}

export default withRouter(Navigator);
