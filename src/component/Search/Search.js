import React, {useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import './Search.css';





const Search = () => {

  let [movieTitle, setMovieTitle] = useState("")

  let fetchData = (event) => {
    console.log(event.target.value)
    setMovieTitle(event.target.value)
    console.log(movieTitle)
    // let nyTimesApi = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=vKMNXxALAeCJBsOuNv1USvjhAHkXhIFJ'
  }
  let fetchTest = (event) => {
    console.log(event.target.value)
  }



    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <FormControl className="searchBar" 
            value = {movieTitle}
            onChange = {fetchTest}
            placeholder = "Enter Movie Title" />
            <br />
            <Form.Text className="text-muted">
              Muted Place Holder
          </Form.Text>
          </Form.Group>
        </Form>
        <Button onClick={fetchData} variant="outline-primary">Search</Button>{' '}
      </div>
    )
  
}

export default Search;
