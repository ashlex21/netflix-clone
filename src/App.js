import React from "react";
import "./App.css";
import Row from "./components/row";
import requests from "./components/requests";
import Banner from "./components/banner";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGANLS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
