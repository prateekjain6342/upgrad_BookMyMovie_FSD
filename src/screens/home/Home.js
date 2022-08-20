import React, { Fragment } from "react";
import './Home.css';
import Header from "../../common/header/Header";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const Home = () => {
    return (
        <Fragment>
        <Header />
        <div className="upcoming-movies">
            <div className="title-bar">
                Upcoming Movies
            </div>
            
        </div>
        </Fragment>
    )
}

export default Home;