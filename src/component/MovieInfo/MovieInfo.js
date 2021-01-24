import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { ExternalLink } from "react-external-link";

import nyTimesLogo from "./img/nyTimesLogo.png";
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
          <h2 className="movieTitle">{MovieInfo.selected.Title}</h2>
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
              <Col>
                <div className="infoSection">
                  <h6>Movie Information </h6>
                  <p>Actors : {MovieInfo.selected.Actors} </p>
                  <p>Director: {MovieInfo.selected.Director} </p>
                  <p>Awards : {MovieInfo.selected.Awards} </p>
                  <p>Movie Length : {MovieInfo.selected.Runtime} </p>
                  <p>Official Release Date : {MovieInfo.selected.Released} </p>
                  {MovieInfo.selected.Website != "N/A" ? (
                    <p> Official Website -
                      <ExternalLink href={MovieInfo.selected.Website}>
                        {MovieInfo.selected.Website}
                      </ExternalLink>
                    </p>
                  ) : null}
                </div>
              </Col>
              <Col>
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
                  <img src={line} className="straightLine" />
                </div>
              </Col>
              <Col>
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

// Actors: "Jamie Foxx, Tina Fey, Graham Norton, Rachel House"
// Awards: "5 wins & 18 nominations."
// BoxOffice: "N/A"
// Country: "USA"
// DVD: "N/A"
// Director: "Pete Docter, Kemp Powers(co-director)"
// Genre: "Animation, Adventure, Comedy, Family, Fantasy, Music"
// Language: "English"
// Metascore: "86"
// Plot: "A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul learning about herself."
// Poster: "https://m.media-amazon.com/images/M/MV5BZGE1MDg5M2MtNTkyZS00MTY5LTg1YzUtZTlhZmM1Y2EwNmFmXkEyXkFqcGdeQXVyNjA3OTI0MDc@._V1_SX300.jpg"
// Production: "N/A"
// Rated: "PG"
// Ratings: (2) [{…}, {…}]
// Released: "25 Dec 2020"
// Response: "True"
// Runtime: "100 min"
// Title: "Soul"
// Type: "movie"
// Website: "N/A"
// Writer: "Pete Docter (story and screenplay by), Mike Jones (story and screenplay by), Kemp Powers (story and screenplay by)"
// Year: "2020"
// byline: "A.O. Scott"
// critics_pick: 1
// date_updated: "2020-12-24 14:04:02"
// display_title: "Soul"
// headline: "‘Soul’ Review: Pixar’s New Feature Gets Musical, and Metaphysical"
// imdbID: "tt2948372"
// imdbRating: "7.8"
// imdbVotes: "662"
// link: {type: "article", url: "http://www.nytimes.com/2020/12/24/movies/soul-review-pixar.html", suggested_link_text: "Read the New York Times Review of Soul"}
// mpaa_rating: "PG"
// multimedia: {type: "mediumThreeByTwo210", src: "https://static01.nyt.com/images/2020/12/25/arts/25…Cover-a/25Soul-Cover-a-mediumThreeByTwo210-v3.jpg", width: 210, height: 140}
// opening_date: "2020-12-25"
// publication_date: "2020-12-24"
// summary_short: "This inventive tale stars Jamie Foxx as a jazz musician caught in a world that human souls pass through on their way into and out of life."
