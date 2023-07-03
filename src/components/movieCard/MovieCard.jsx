/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./MovieCard.scss";
import Img from "../lazyLoadImage/LazyloadImage";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const sortedArray = data.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    });
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {/* {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )} */}
            </div>

            <div className="textBlock">

                <span className="title bolder" style={{ fontStyle: 'italic' }}>{data.title || data.name}</span>
                <span className="date bold" style={{ fontStyle: 'italic' }}>
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;