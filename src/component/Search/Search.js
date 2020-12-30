import React, {useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Search.css';





const Search = () => {

  // Setting our hooks 
  let [movieTitle, setMovieTitle] = useState(null)
  let [currentMovieOptions, setCurrentMovieOptions] = useState([]);
  let [pageNation, setPageNation] = useState(1);
  let [selectedMovie, setSelectedMovie] = useState([]);

  // Function to fetch the data from our first API call with the selected movie
  let fetchData = (event) => {
    let nyTimesApi = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + movieTitle + '&api-key=vKMNXxALAeCJBsOuNv1USvjhAHkXhIFJ';

    fetch(nyTimesApi).then(response => response.json())
      .then(data => {
        for (var index = 0; index < data.results.length; index++) {
          if (data.results[index].display_title.replace(/ /g,'') == movieTitle.replace(/ /g,'')) {
            setSelectedMovie(data.results[index]);
            console.log(selectedMovie)
            return;
          }
        }
        setCurrentMovieOptions(data.results)
      })
  }

  // Function call to change the offset to get the next movie titles
  let pagenationOffset = () => {
    let nyTimesOffsetApi = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + movieTitle + '&offset=' + pageNation + '&api-key=vKMNXxALAeCJBsOuNv1USvjhAHkXhIFJ';

    fetch(nyTimesOffsetApi).then(response => response.json())
      .then(data => setCurrentMovieOptions(data.results)
      )
    setPageNation(pageNation + 1)
  }

  let fetchTest = (event) => {
    setMovieTitle(event.target.value)
  }



    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
           {currentMovieOptions.length == 0 ? <FormControl className="searchBar"
              value={movieTitle}
              onChange={fetchTest}
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
                {currentMovieOptions.length !== 0 ? <Button onClick={pagenationOffset} className="nextPageButton" size="sm" variant="primary">Next Page</Button> : null }
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
        {currentMovieOptions.length == 0 ? <Button onClick={fetchData} variant="outline-primary">Search</Button> : null }
      </div>
    )
  
}

export default Search;
