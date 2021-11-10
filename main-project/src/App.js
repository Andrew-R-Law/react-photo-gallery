import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import apiKey from './config';
import SearchBar from './Components/SearchBar';
import MainNav from './Components/MainNav';
import PhotoContainer from './Components/PhotoContainer';


class App extends Component {
  state = {
    photos: [],
    isLoading: true,
    query: 'Sunsets'
  }

  performSearch = ( query = this.state.query ) => {
    this.setState({
      isLoading: true,
      query
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
        if (response) {
          this.setState({
            photos: response.data.photos.photo,
            isLoading: false
          })
        }
    })
    .catch(error => {
      console.log('Error gathering data', error);
    });
  }

  componentDidMount(){
    this.performSearch();
  }

  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <h1>A Photo Gallery Powered by React and Flickr</h1>
          <SearchBar onSearch={this.performSearch}/>
          <MainNav onClick={this.performSearch} photos={this.state.photos}/>
          {
            (this.state.isLoading)
            ? <p>Loading...</p>
            : ( 
              <Routes>
                <Route exact path='/' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                <Route exact path='/cats' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                <Route exact path='/dogs' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                <Route exact path='/computers' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                <Route exact path='/:searched' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
              </Routes>
            ) 
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
