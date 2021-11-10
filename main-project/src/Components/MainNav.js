import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MainNav extends Component {

    //A function for handling the click of one of the three buttons. Calls the performSearch function from App.js and sets the value of the query to the value of the button text. ("Cats", "Dogs", or "Computers")
    handleClick = e => {
        let btnText = e.target.innerText;
        this.props.onClick(btnText);
    }

    //renders three buttons that, when clicked, search for photos of "Cats", "Dogs", and "Computers", respectively.
    
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
