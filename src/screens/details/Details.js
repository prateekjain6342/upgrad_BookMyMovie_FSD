import React, { Fragment, useState } from "react";
import './Details.css';
import Header from "../../common/header/Header";
import { Typography } from "@material-ui/core";
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const Details = (props) => {

    let movie = props.location.state[0];

    const opts = {
        height: '300',
        width: '700',
        playerVars: {
            autoplay: 1
        }
    }

    let [stars, setStars] = useState([
        {
            id: 1,
            class: "blackStar"
        },
        {
            id: 2,
            class: "blackStar"
        },
        {
            id: 3,
            class: "blackStar"
        },
        {
            id: 4,
            class: "blackStar"
        },
        {
            id: 5,
            class: "blackStar"
        }
    ])


    const assignRating = (id) => {
        let newStars = [];
        stars.forEach((starObj) => {

            starObj.id <= id ? newStars.push({
                id: starObj.id,
                class: "yellowStar"
            }) : newStars.push({
                id: starObj.id,
                class: "blackStar"
            });

        })
        
        setStars(newStars);
    }
    

    const artistGridClick = (url) => {
        window.location.assign(url);
    }
    

    return (
        <Fragment>
            <Header movieReleased={true} movieId={movie.id} />
            <div className="back-link">
                <Typography>
                    <a href="/">  &#60; Back to Home </a>
                </Typography>
            </div>
            <div className="main-content">
                <div className="left-content">
                    <img src={movie.poster_url} alt={movie.title} />
                </div>
                <div className="middle-content">
                    <div>
                        <Typography variant="headline" component="h2">{movie.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography>
                            <span className="bold">Genres: </span> {movie.genres.join(', ')}
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration:</span> {movie.duration} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold"> Rating:</span> {movie.critics_rating}  </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography><span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline} </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        <YouTube
                            videoId={movie.trailer_url.split("?v=")[1]}
                            opts={opts}
                            onReady={this._onReady}
                        />
                    </div>
                </div>
                <div className="right-content">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {stars.map(star => (
                        <StarBorderIcon
                            className={star.class}
                            key={star.id}
                            onClick={() => assignRating(star.id)}
                        />
                    ))}

                    <div className="bold marginBottom16 marginTop16">
                        <Typography>
                            <span className="bold">Artists:</span>
                        </Typography>
                    </div>
                    <div className="paddingRight">
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists != null && movie.artists.map(artist => (
                                <GridListTile
                                    className="gridTile"
                                    onClick={() => artistGridClick(artist.wiki_url)}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar
                                        title={artist.first_name + " " + artist.last_name}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Details;