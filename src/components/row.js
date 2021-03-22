import React, { useState, useEffect } from "react";
import axios from "./axios"; //we can rename the default exports
// import requests from "./requests";
import "./row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // A snipet of code that runs based on a specific conditions/variables

  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    //and if we pass movies variable in that [] it means whenever that movies variable changes it will reload

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]); //cuz fetchUrl was pulled outside of the useEffect block
  //   console.log(movies);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => {
          return (
            movie.backdrop_path !== null && (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${baseUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
