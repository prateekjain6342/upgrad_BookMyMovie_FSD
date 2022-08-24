import React, { Fragment, useState } from "react";
import "./Header.css";
import logo from '../../assets/logo.svg';
import { Button, FormControl, FormHelperText, Input, InputLabel, Modal, Tab, Tabs, Typography } from "@material-ui/core";
import axios from 'axios';
import { Link } from "react-router-dom";

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


    let bookShowButtonVisibility = props.movieReleased ? true : false;
    let movieId = props.movieId;

    let [loginUsername, setLoginUsername] = useState(undefined);

    const loginUsernameHandler = (username) => {
        setLoginUsername(username);
    }

    let [loginPassword, setLoginPassword] = useState(undefined);

    const loginPasswordHandler = (password) => {
        setLoginPassword(password);
    }

    let [loginState, setLoginState] = useState(sessionStorage.getItem('access-token') ? true : false);
    

    const loginHandler = () => {

        const headers = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": `Basic ${window.btoa(`${loginUsername}:${loginPassword}`)}`,
            "Access-Control-Allow-Origin": "*"
        }

        axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/auth/login`, {}, {headers}).then((response) => {
            sessionStorage.setItem('uuid', response.data.id);
            sessionStorage.setItem('access-token', response.headers('access-token'));
            setLoginState(true);

            closeClickHandler();

        }).catch((err) => {
            console.log(err);
        })
    }

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [registerPassword, setRegisterPassword] = useState('');
    let [contact, setContact] = useState('');

    const registerFirstNameHandler = (firstName) => {
        setFirstName(firstName);
    }
    const registerLastNameHandler = (lastName) => {
        setLastName(lastName);
    }
    const registerEmailHandler = (email) => {
        setEmail(email);
    }
    const registerPasswordHandler = (password) => {
        setRegisterPassword(password);
    }
    const registerContactHandler = (contact) => {
        setContact(contact);
    }

    let [registrationStatus, setRegistrationStatus] = useState(false)

    const registrationHandler = () => {
        let registerData = JSON.stringify({
            "email_address": email,
            "first_name": firstName,
            "last_name": lastName,
            "mobile_number": contact,
            "password": registerPassword
        });

        let XHRRequest = new XMLHttpRequest();

        XHRRequest.open("POST", `${process.env.REACT_APP_API_HOST_URL}/api/signup`);
        XHRRequest.setRequestHeader("Content-Type", "application/json");
        XHRRequest.setRequestHeader("Cache-Control", "no-cache");
        XHRRequest.send(registerData);

        XHRRequest.addEventListener("readystatechange", (res) => {

            if (res.target.status === 201) {
                setRegistrationStatus(true);
            } 
        });
    }

    const logoutHandler = () => {
        const headers = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": `Bearer ${sessionStorage.getItem("access-token")}`,
        }

        axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/logout`, {}, {
            headers
        }).then(res => {
            sessionStorage.removeItem("uuid");
            sessionStorage.removeItem("access-token");

            setLoginState(false);
        }).catch((error) => {
            // handle error
            console.log(error);
        });
    }


    return (
        <Fragment>
        <header>
            <img src={logo} className="logo-img" alt="BookMyMovie Logo" />
            <div className="action-buttons">
                { loginState ?
                    <Button
                    variant="contained"
                    color="default"
                    className="login-logout"
                    onClick={logoutHandler}
                    >
                    Logout
                    </Button>
                    :
                    <Button
                        variant="contained"
                        color="default"
                        className="login-logout"
                        onClick={loginClickHandler}
                    >
                    Login
                    </Button>
                    
                }
                {   bookShowButtonVisibility ?

                        loginState ?

                            <Link to={`/bookshow/${movieId}`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="book-button"
                                >
                                    Book Show
                                </Button>
                            </Link>
                        :
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
            { authModelValue === 0 ?
            <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
                <FormControl required>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" type="text" onChange={(e) => loginUsernameHandler(e.target.value)} />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                    <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                    <Input id="loginPassword" type="password" onChange={(e) => loginPasswordHandler(e.target.value)} />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                    <br /><br />
                <Button variant="contained" color="primary" onClick={loginHandler} >LOGIN</Button>
            </Typography>
            :
            <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
                <FormControl required>
                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                    <Input id="firstname" type="text" onChange={(e) => registerFirstNameHandler(e.target.value)} />
                    <FormHelperText>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                    <Input id="lastname" type="text" onChange={(e) => registerLastNameHandler(e.target.value)} />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" type="text" onChange={(e) => registerEmailHandler(e.target.value)} />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                    <Input id="registerPassword" type="password" onChange={(e) => registerPasswordHandler(e.target.value)} />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                    <Input id="contact" type="text" onChange={(e) => registerContactHandler(e.target.value)} />
                    <FormHelperText >
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                {
                    registrationStatus ? 
                    <FormControl>
                        <span className="successText">
                            Registration Successful. Please Login!
                        </span>
                    </FormControl>
                    :
                    ""
                }
                <Button variant="contained" color="primary" onClick={registrationHandler}>REGISTER</Button> 
            </Typography>
            }
            </div>
        </Modal>
        </Fragment>
    )
}

export default Header;