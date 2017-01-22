import React from 'react';
import { Navigator } from './';

class Container extends React.Component {
    render() {
        return (<div className='container'>
            <Navigator />
            {this.props.children}
        </div>);
    }
}
export default Container;
