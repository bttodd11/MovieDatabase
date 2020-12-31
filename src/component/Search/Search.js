import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Badge } from 'react-bootstrap';
import MovieInfo from '../MovieInfo/MovieInfo';
import './Search.css';





const Search = () => {

  // Setting our hooks 
  let [movieTitle, setMovieTitle] = useState("")
  let [currentMovieOptions, setCurrentMovieOptions] = useState([]);
  let [pageNation, setPageNation] = useState(1);
  let [selectedMovie, setSelectedMovie] = useState([]);
  

  


    // Setting the movie title user input
  let movieTitleInput = (event) => {
    setMovieTitle(event.target.value)
  }

  // Function to fetch the data from our first API call with the selected movie
  let fetchData = (event) => {
    let nyTimesApi = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + movieTitle + '&api-key=vKMNXxALAeCJBsOuNv1USvjhAHkXhIFJ';
    let omdbApi = 'http://www.omdbapi.com/?apikey=2c533baf&t=' + movieTitle; 
    let fullMovieData = [];


    fetch(omdbApi).then(response => response.json())
      .then(omdbData => {
          console.log(omdbData)
        fullMovieData.push(omdbData)
      })


    fetch(nyTimesApi).then(response => response.json())
      .then(nyTimesData => {
        for (var index = 0; index < nyTimesData.results.length; index++) {
          if (nyTimesData.results[index].display_title.replace(/ /g, '') == movieTitle.replace(/ /g, '')) {
            let joinedData = fullMovieData.concat(nyTimesData.results[index]);
            console.log(joinedData)
            setSelectedMovie(joinedData)
            return;
          }
        }
        setCurrentMovieOptions(nyTimesData.results)
      })
  }

  // Function call to change the offset to get the next movie titles
  let pagenationOffset = () => {
    let nyTimesOffsetApi = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + movieTitle + '&offset=' + pageNation + '&api-key=vKMNXxALAeCJBsOuNv1USvjhAHkXhIFJ';

    fetch(nyTimesOffsetApi).then(response => response.json())
      .then(data => setCurrentMovieOptions(data.results)
      )
    // Changing the offset of the search results
    setPageNation(pageNation + 1)
  }




  return (
    <div>
      { selectedMovie.length == 0 ?
        <div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              {currentMovieOptions.length == 0 ? <FormControl className="searchBar"
                value={movieTitle}
                onChange={movieTitleInput}
                placeholder="Enter Movie Title" />
                : null}
              <div>
                <Container>
                  <Row>
                    {currentMovieOptions.map(movies =>
                      (<Col md="4">
                        <p className="movieNames">{movies.display_title}</p>
                      </Col>
                      ))}
                  </Row>
                  <Row>
                    <Container>
                      <Row>
                        {currentMovieOptions.length !== 0 ? <Button onClick={pagenationOffset} className="nextPageButton" size="sm" variant="primary">Next Page</Button> : null}
                      </Row>
                    </Container>
                  </Row>
                </Container>
              </div>
              <br />
              <Form.Text className="text-muted">
                Created by :  Brian Todd
          </Form.Text>
            </Form.Group>
          </Form>
          {currentMovieOptions.length == 0 ? <Button onClick={fetchData} variant="outline-primary">Search</Button> : null}
        </div>
        : null}
      <div>
        <MovieInfo selected={selectedMovie} />
      </div>
    </div>
  )
}

export default Search;
