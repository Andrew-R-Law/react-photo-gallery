import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import apiKey from './config';
import SearchBar from './Components/SearchBar';
import MainNav from './Components/MainNav';
import PhotoContainer from './Components/PhotoContainer';


class App extends Component {

  //sets the initial state, with the initial query being 'Sunsets', ensuring pictures of sunsets are first loaded when the app starts.

  state = {
    photos: [],
    isLoading: true,
    query: ''
  }

  //Updates value of the query above. (This allows the PhotoContainer to update the query without calling the performSearch function.)
  updateQuery = (query) => {
    this.setState({
      query 
    })
  }


  //When app first loads, updateQuery is called and the value of 'query' is set to 'sunsets' as a de facto default value.
  componentDidMount(){
    this.updateQuery('sunsets');
  }

  //Checks to see if the query value is the same as the query value of the previous state. If it is not, then performSearch is called with new query value.
  componentDidUpdate(prevProps, prevState){
    if (this.state.query !== prevState.query) {
      this.performSearch(this.state.query);
    }
  }


  //The following performSearch function is heavily modeled on Guil Hernandez's solution in the course 'Data Fetching in React' on TeamTreeHouse.

  //Takes a query as an argument. First sets the 'isLoading' value to 'true', and sets the 'query' value to value of the 'query' argument passed to it.
  performSearch = ( query ) => {
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

  //The following is rendered: SearchBar, MainNav and, if the state is not loading, a list of routes.
  //The browser is rerouted from the home address to an address that contains what has been searched.
  //When rerouted, the PhotoContainer element is rendered.
  
  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <h1>A Photo Gallery Powered by React and Flickr</h1>
          <SearchBar updateQuery={this.updateQuery}/>
          <MainNav onClick={this.performSearch} updateQuery={this.updateQuery} photos={this.state.photos}/>
          {
            (this.state.isLoading)
            ? <p>Loading...</p>
            : ( 
              <Switch>
                <Route exact path='/' render={ () => <Redirect to={`/${this.state.query}`} /> } />
                <Route path='/:query' render={ () => <PhotoContainer photos={this.state.photos} query={this.state.query} updateQuery={this.updateQuery} />} />
              </Switch>
            ) 
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
