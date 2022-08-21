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

    return (
        <Fragment>
            <Header movieReleased={true} />
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
                    
                </div>
            </div>
        </Fragment>
    )
}

export default Details;