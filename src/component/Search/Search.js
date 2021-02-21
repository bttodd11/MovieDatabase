import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Badge } from 'react-bootstrap';
import MovieInfo from '../MovieInfo/MovieInfo';
import MovieLogo from '../Search/img/moviePng.png';
import Error from '../Error/Error';
import './Search.css';





const Search = () => {

  // Setting our hooks 
  let [movieTitle, setMovieTitle] = useState("")
  let [currentMovieOptions, setCurrentMovieOptions] = useState([]);
  let [pageNation, setPageNation] = useState(1);
  let [selectedMovie, setSelectedMovie] = useState([]);
  let [datafailure, setDataFailure] = useState(false);
  let omdbApi = 'http://www.omdbapi.com/?apikey=2c533baf&t=';
  let nyTimesApi = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=';
  let apiKey = '&api-key=vKMNXxALAeCJBsOuNv1USvjhAHkXhIFJ'
  let fullMovieData = {};




  // Setting the movie title user input
  let movieTitleInput = (event) => {
    setMovieTitle(event.target.value)
  }

  // Fetch call for OMDB Database
  let getOmdbObject = (movieTitle) => {
    return new Promise((resolve, reject) => {
      omdbApi = omdbApi + movieTitle;
      resolve(fetch(omdbApi).then(response => response.json())
        .then(omdbData => {
          return omdbData;
        }))

    })
  }

  // Fetch call for NY Times Database
  let getNyTimesObject = (movieTitle, offset) => {
    return new Promise((resolve, reject) => {
      // If an offset is present we will need to change the API
      if (offset) {
        nyTimesApi = nyTimesApi + movieTitle + '&offset=' + offset + apiKey;
      }
      else {
        nyTimesApi = nyTimesApi + movieTitle + apiKey;
      }

      // Fetch call for NY Times API
      resolve(fetch(nyTimesApi).then(response => response.json())
        .then(nyTimesData => {
          return nyTimesData.results;
        })
      )
    })
  }


  // Fetch the data from our first API call with the selected movie
  let fetchData = (movieTitle) => {
    return Promise.all([getNyTimesObject(movieTitle), getOmdbObject(movieTitle)]).then((movies => {

      if(movies[0] == null || movies[1].Response == false){
        setDataFailure(true);
        return;
      }

      for (var index = 0; index < movies[0].length; index++) {
         // Setting movie title
        movieTitle = movieTitle.replace(/\s/g, '').toLowerCase();
        let currentMovieTitle = movies[0][index].display_title.replace(/\s/g, '').toLowerCase();
        
        if (currentMovieTitle == movieTitle) {
          fullMovieData = {
            ...movies[1],
            ...movies[0][index]
          }

          setSelectedMovie(fullMovieData)
          return;
        }
      }
      setCurrentMovieOptions(movies[0])
        // Changing the offset of the search results
      setPageNation(pageNation + 1)

    }))
  }
  
 
  // Fetch call to change the offset to get the next movie titles
  let pageNationOffset = (movieTitle) => {
   return Promise.all([getNyTimesObject(movieTitle, pageNation)]).then((movieOptions => {
      setCurrentMovieOptions(movieOptions[0])
      setPageNation(pageNation + 1)
   }))}





  return (
    <div id="searchSection">
      {selectedMovie.length == 0 && datafailure == false ?
        <div>
          {currentMovieOptions.length == 0 && selectedMovie.length == 0 ? 
          <div className="imageDiv">
        <img className="movieLogo" src={MovieLogo}  />
            </div>
            : null }
          <Form>
            <Form.Group>
              {currentMovieOptions.length == 0 ? <FormControl className="searchBar"
                value={movieTitle}
                onChange={movieTitleInput}
                placeholder="Enter Movie Title" />
                : null}
              {currentMovieOptions.length != 0 ?
              <div>
                <Container>
           
                  <h6 className="movieOptionTitle">Similar Movie Title Names</h6>
                  <Row>
                    {currentMovieOptions.map(movies =>
                      (<Col md="4">
                        <span onClick={() => {fetchData(movies.display_title)}}><p className="movieNames">{movies.display_title}</p></span>
                      </Col>
                      ))}
                  </Row>
                  <Row>
                    <Container>
                      <Row>
                        {currentMovieOptions.length !== 0 ? <Button onClick={() => pageNationOffset(movieTitle)} className="nextPageButton" size="sm" variant="primary">Next Page</Button> : null}
                      </Row> 
                    </Container>
                  </Row>
                </Container>
              </div> : null }
              <br />
              <Form.Text className="text-muted">
                Created by :  Brian Todd
          </Form.Text>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
          {currentMovieOptions.length == 0 ? <Button onClick={() => fetchData(movieTitle)} className="searchButton" variant="outline-info">Search</Button> : null}
          </div>
        </div>
        : null}
        { datafailure == false ? 
      <div>
        <MovieInfo selected={selectedMovie} />
      </div> :
      <div>
        <Error />
        </div>
}
    </div>
  )
}

export default Search;

