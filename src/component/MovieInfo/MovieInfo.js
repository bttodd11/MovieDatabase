import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { ExternalLink } from "react-external-link";
import TypeIt from "typeit-react";
import nyTimesLogo from "./img/nyTimesLogo.png";
import star from "./img/starPng.png";
import line from "./img/straightLine.png";
import "./MovieInfo.css";

const MovieInfo = (MovieInfo) => {
  let [currentMovie, setCurrentMovie] = useState([]);
  let [ratings, setRating] = useState([]);

  let adjustDate = (year) => {
    let newDate = Date.parse(year);
    let date = new Date(newDate);
    var options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    var result = date.toLocaleDateString("en", options); // 10/29/2013

    return result;
  };

  useEffect(() => {
    if (MovieInfo.selected.length != 0) {
      setRating(MovieInfo.selected.Ratings);
      console.log(ratings);
      // This will only run this function once
      // will adjust the date format
      MovieInfo.selected.Released = adjustDate(MovieInfo.selected.Released);

      // This main reason that I am setting the state here is so that I can
      // Force a re render
      setCurrentMovie(MovieInfo.selected);
      console.log(currentMovie);
      console.log(MovieInfo.selected);
    }
  });

  return (
    <div>
      {MovieInfo.selected.length !== 0 ? (
        <div className="movieSectionInfo">
          <TypeIt options={{
            strings: [MovieInfo.selected.Title],
            speed: 100,
            lifeLike: true,
            cursor: false,
       
          }}
            className="movieTitle"></TypeIt>
          <h6 className="rating">
            IMDB Rating - <p className="specialGlow">{MovieInfo.selected.imdbRating} </p>
          </h6>
          <h6 className="rating">Rating - {MovieInfo.selected.Rated} </h6>
          <h6 className="releaseYear">
            {" "}
            Release Year - {MovieInfo.selected.Year}{" "}
          </h6>
          <img src={MovieInfo.selected.Poster} className="moviePoster" />
          <p className="plotInfo">{MovieInfo.selected.Plot}</p>

          <Container>
            <Row> 
            <Col sm={12} md={12} lg={4}>
                <div className="infoSection">
                  <h6>Movie Information </h6>
                  <p>{MovieInfo.selected.Actors} </p>
                  <p>Director {MovieInfo.selected.Director} </p>
                  <p>Awards {MovieInfo.selected.Awards}  </p>
                  <p>Movie Length {MovieInfo.selected.Runtime} </p>
                  <p>Official Release Date  {MovieInfo.selected.Released}</p>
                  {MovieInfo.selected.Website != "N/A" ? (
                    <p> Official Website -
                      <ExternalLink href={MovieInfo.selected.Website}>
                        {MovieInfo.selected.Website}
                      </ExternalLink>
                    </p>
                  ) 
                  : null}
                </div>
              </Col>
              <Col sm={12} md={12} lg={4}>
                <div className="nyTimesSection">
                  <img src={nyTimesLogo} className="nyTimesLogo" />
                  <a href={MovieInfo.selected.link.url} className="nyTimesLink">
                    <p className="nyTimesLink">{MovieInfo.selected.link.suggested_link_text}</p>
                  </a>
                  <img src={line} className="straightLine" />
                  <img src={line} className="straightLine" />
                  <img src={line} className="straightLine" />
                  <img src={line} className="straightLine" />
                  <img src={line} className="straightLine" />
                </div>
              </Col>
              <Col sm={12} md={12} lg={4}>
                <div className="ratingSection">
                  <h6>Available Ratings </h6>
                  {ratings.map((db) => (
                    <div>
                      <p className="movieDatabase">{db.Source}</p>
                      <h6 className="movieDatabaseValue"><p className="specialGlow">{db.Value}</p></h6>
                    </div>    
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default MovieInfo;

