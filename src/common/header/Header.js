import React from "react";
import "./Header.css";
import logo from '../../assets/logo.svg';
import { Button } from "@material-ui/core";

const Header = (props) => {

    let loginLogoutButtonName = props.loggedIn ? "Logout" : "Login";
    let bookShowButtonVisibility = props.movieReleased ? true : false;

    return (
        <header>
            <img src={logo} className="logo-img" />
            <div className="action-buttons">
                <Button
                    variant="contained"
                    color="default"
                    className="login-logout"
                >
                    {loginLogoutButtonName}
                </Button>
                {   bookShowButtonVisibility ?
                    <Button
                        variant="contained"
                        color="primary"
                        className="book-button"
                    >
                        Book Show
                    </Button>
                    :
                    ""
                }
            </div>
        </header>
    )
}

export default Header;