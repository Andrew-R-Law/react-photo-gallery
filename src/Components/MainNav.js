import React from 'react';
import {Link} from 'react-router-dom';

const MainNav = (props) => {

    //A function for handling the click of one of the three buttons. Calls the performSearch function from App.js and sets the value of the query to the value of the button text. ("Cats", "Dogs", or "Computers")
    const handleClick = (e) => {
        let btnText = e.target.innerText;
        props.updateQuery(btnText);
    }

    //returns three buttons that, when clicked, search for photos of "Cats", "Dogs", and "Computers", respectively, and link the browser to those routes.
    
    return (
        <nav className="main-nav">
            <ul>
                <li onClick={handleClick}><Link to={'/cats'}>Cats</Link></li>
                <li onClick={handleClick}><Link to={'/dogs'}>Dogs</Link></li>
                <li onClick={handleClick}><Link to={'/computers'}>Computers</Link></li>
            </ul>
        </nav>
    );
}


export default MainNav;
