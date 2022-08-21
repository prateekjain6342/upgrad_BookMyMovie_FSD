import React, { Fragment, useState } from "react";
import './Details.css';
import Header from "../../common/header/Header";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Details = () => {
    return (
        <Fragment>
            <Header movieReleased={true} />
            <div className="back-link">
                <Typography>
                    <a href="/">  &#60; Back to Home </a>
                </Typography>
            </div>
            <div className="main-content">
                
            </div>
        </Fragment>
    )
}

export default Details;