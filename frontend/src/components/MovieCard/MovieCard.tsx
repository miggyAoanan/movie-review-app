import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.scss";
import { Movie } from '../../interfaces/movie'

function MovieCard(props: Movie) {
  const [data] = useState(props)

  return (
    <div className="card-item">
      <Link to={`/movie/${data.id}`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={data.imageURL} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{data.title}</h4>
            <p>{data.year}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
