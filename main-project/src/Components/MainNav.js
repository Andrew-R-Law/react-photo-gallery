import React from 'react';
import {Route, Routes, NavLink, BrowserRouter} from 'react-router-dom';
import PhotoContainer from './PhotoContainer';

const MainNav = () => {
    return (
        <BrowserRouter>
            <nav className="main-nav">
                <ul>
                    <li><NavLink to={'/cats'}>Cats</NavLink></li>
                    <li><NavLink to={'/dogs'}>Dogs</NavLink></li>
                    <li><NavLink to={'/computers'}>Computers</NavLink></li>
                </ul>
                <Routes>
                    <Route path={'/cats'} component={PhotoContainer} />
                    <Route path={'/dogs'} component={PhotoContainer} />
                    <Route path={'/computers'} component={PhotoContainer} />
                </Routes>
            </nav>
        </BrowserRouter>
    );
};


export default MainNav;
