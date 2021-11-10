import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MainNav extends Component {
    handleClick = e => {
        let btnText = e.target.innerText;
        this.props.onClick(btnText);
    }
    
    render () {
        return (
            <nav className="main-nav">
                <ul>
                    <li onClick={this.handleClick}><Link to={'/cats'}>Cats</Link></li>
                    <li onClick={this.handleClick}><Link to={'/dogs'}>Dogs</Link></li>
                    <li onClick={this.handleClick}><Link to={'/computers'}>Computers</Link></li>
                </ul>
            </nav>
        );
    }
}


export default MainNav;
