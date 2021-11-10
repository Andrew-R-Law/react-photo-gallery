import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import apiKey from './config';
import SearchBar from './Components/SearchBar';
import MainNav from './Components/MainNav';
import PhotoContainer from './Components/PhotoContainer';


class App extends Component {

  //sets the initial state, with the initial query being 'Sunsets', ensuring pictures of sunsets are first loaded when the app starts.

  state = {
    photos: [],
    isLoading: true,
    query: 'Sunsets'
  }

  //The following function is heavily modeled on Guil Hernandez's solution in the course 'Data Fetching in React' on TeamTreeHouse.

  //Takes a query as an argument. First sets the 'isLoading' value to 'true', and sets the 'query' value to value of the 'query' argument passed to it.
  performSearch = ( query = this.state.query ) => {
    this.setState({
      isLoading: true,
      query
    })
    //then gets a list of 24 photos from flickr using the query argument passed in above.

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)

    //if a response is given, sets the 'photos' value to information about the 24 photos returned and sets the 'isLoading' value to 'false'.
    .then(response => {
        if (response) {
          this.setState({
            photos: response.data.photos.photo,
            isLoading: false
          })
        }
    })

    //catches and logs an error message to the console.
    .catch(error => {
      console.log('Error gathering data', error);
    });
  }


  //When the component mounts, the performSearch function is called, with the initial value being set to 'Sunsets'.

  componentDidMount(){
    this.performSearch();
  }

  //The following is rendered: SearchBar, MainNav and, if the state is not loading, a list of routes.
  
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
                <Route exact path='/' element={ () => <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                <Route exact path='/cats' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                <Route exact path='/dogs' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                <Route exact path='/computers' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route>
                {/* <Route exact path='/:searched' element={ <PhotoContainer photos={this.state.photos} query={this.state.query} />}></Route> <--- To be added once I figure out how to push the browers to the relevant URL address within the SearchBar component*/}
              </Routes>
            ) 
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
