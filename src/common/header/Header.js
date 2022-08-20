import React, { Fragment, useState } from "react";
import "./Header.css";
import logo from '../../assets/logo.svg';
import { Button, FormControl, FormHelperText, Input, InputLabel, Modal, Tab, Tabs, Typography } from "@material-ui/core";

const Header = (props) => {

    const [authModelValue, setAuthModelValue] = useState(0);

    const authModalTabChange = (event, value) => {
        setAuthModelValue(value);
    }

    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            // marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
        }
    };

    let [formModalOpen, setformModalOpen] = useState(false);
    const loginClickHandler = () => setformModalOpen(true);
    const closeClickHandler = () => setformModalOpen(false);


    let loginLogoutButtonName = props.loggedIn ? "Logout" : "Login";
    let bookShowButtonVisibility = props.movieReleased ? true : false;

    return (
        <Fragment>
        <header>
            <img src={logo} className="logo-img" />
            <div className="action-buttons">
                <Button
                    variant="contained"
                    color="default"
                    className="login-logout"
                    onClick={loginClickHandler}
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
        <Modal
            open={formModalOpen}
            // className={modalStyle}
            onClose={closeClickHandler}
            style={modalStyle}
        >
            <div className="authModal">
            <Tabs
                className="tabStyle"
                value={authModelValue}
                variant="fullWidth"
                onChange={authModalTabChange}
            >
                <Tab label="Login" />
                <Tab label="Register" />

            </Tabs>
            { authModelValue == 0 ?
            <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
                <FormControl required>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" type="text" />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                    <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                    <Input id="loginPassword" type="password" />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                    <br /><br />
                <Button variant="contained" color="primary" >LOGIN</Button>
            </Typography>
            :
            <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
                <FormControl required>
                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                    <Input id="firstname" type="text" />
                    <FormHelperText>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                    <Input id="lastname" type="text" />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" type="text" />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                    <Input id="registerPassword" type="password" />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                    <Input id="contact" type="text" />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <Button variant="contained" color="primary" >REGISTER</Button> 
            </Typography>
            }
            </div>
        </Modal>
        </Fragment>
    )
}

export default Header;