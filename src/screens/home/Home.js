import React, { Fragment, useEffect, useReducer, useState } from "react";
import './Home.css';
import Header from "../../common/header/Header";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import sampleMoviePoster from '../../assets/movie.jpeg';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";


const styles = theme => ({
    "um-gl-root": {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    
    "um-grid-list": {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});


const Home = (props) => {


    const { classes } = props;

    // Movies

    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST_URL}/api/v1/movies?limit=1000&status=PUBLISHED`).then(
            (response) => {
                return response.json();
            }
        ).then((data) => {
            console.log(data);
            setUpcomingMovies(data.movies);
        }).catch(
            (err) => {
                console.log(err);
            }
        )
    }, [])


    // Genres

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST_URL}/api/v1/genres`).then(
            (response) => {
                return response.json();
            }
        ).then((data) => {
            console.log(data);
            setGenres(data.genres);
        }).catch(
            (err) => {
                console.log(err);
            }
        )
    }, [])

    const [genre, setGenre] = useState([]);
    const genreSetter = (value) => {
        setGenre(value.target.value);
    }

    // Artists

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST_URL}/api/v1/artists?limit=1000`).then(
            (response) => {
                return response.json();
            }
        ).then((data) => {
            console.log(data);
            setArtists(data.artists);
        }).catch(
            (err) => {
                console.log(err);
            }
        )
    }, [])

    const [artist, setArtist] = useState([]);
    const artistSetter = (value) => {
        setArtist(value.target.value);
    }

    // Release Date Start
    const [releaseDateStart, setReleaseDateStart] = useState("");
    const releaseDateStartSetter = (value) => {
        setReleaseDateStart(value.target.value);
    }

    // Release Date End
    const [releaseDateEnd, setReleaseDateEnd] = useState("");
    const releaseDateEndSetter = (value) => {
        setReleaseDateEnd(value.target.value);
    }

    // Movie Name
    const [movieName, setMovieName] = useState("");

    // Apply Filter
    const applyFilter = () => {
        let query = "?status=RELEASED"
        movieName !== "" ? query += `&title=${movieName}` : false;
        genre.length > 0 ? query += `&genre=${genre.toString()}` : false;
        artist.length > 0 ? query += `&artists=${artist.toString()}` : false;
        releaseDateStart !== "" ? query += `&start_date=${releaseDateStart}` : false;
        releaseDateEnd !== "" ? query += `&start_date=${releaseDateEnd}` : false;
    }

    // Released Movies

    const [releasedMovies, setReleasedMovies] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST_URL}/api/v1/movies?limit=1000&status=RELEASED`).then(
            (response) => {
                return response.json();
            }
        ).then((data) => {
            console.log(data);
            setReleasedMovies(data.movies);
        }).catch(
            (err) => {
                console.log(err);
            }
        )
    }, [])


    const showMovieDetails = (movieId) => {

        const filterMovie = (object) => {
            return object.id === movieId;
        };

        props.history.push(`/movie/${movieId}`, releasedMovies.filter(filterMovie));
    }

    return (
        <Fragment>
        <Header />
        <div className="upcoming-movies">
            <div className="title-bar">
                Upcoming Movies
            </div>
            <div className={classes["um-gl-root"]}>
                <GridList cols={6} cellHeight={250} className={classes["um-grid-list"]}>
                        {upcomingMovies.map(movie => (
                            <GridListTile key={"upcoming" + movie.id}>
                                <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                <GridListTileBar title={movie.title} />
                            </GridListTile>
                        ))}
                </GridList>
            </div>  
        </div>
        <br />
        <div className="released-movies">
            <div className="rm-list">
            <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                {releasedMovies.map(movie => (
                    <GridListTile onClick={() => showMovieDetails(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                        <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                        <GridListTileBar
                            title={movie.title}
                            subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                        />
                    </GridListTile>
                ))}
            </GridList>
            </div>
            <div className="rm-search">
                <Card>
                    <CardContent>
                        <FormControl className={classes.formControl}>
                            <Typography className={classes.title} color="textSecondary">
                                FIND MOVIES BY:
                            </Typography>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                            <Input id="movieName" onChange={(event) => setMovieName(event.target.value)} />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                            <Select
                                multiple
                                input={<Input id="select-multiple-checkbox-genre" />}
                                renderValue={selected => {return selected.join(',')}}
                                value={genre}
                                onChange={genreSetter}
                            >
                                {genres.map(genre => (
                                    <MenuItem key={genre.id} value={genre.genre}>
                                        <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                                        <ListItemText primary={genre.genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                            <Select
                                multiple
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(',')}
                                value={artist}
                                onChange={artistSetter}
                            >
                                {artists.map(artist => (
                                    <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                        <Checkbox checked={artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                        <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField
                                id="releaseDateStart"
                                label="Release Date Start"
                                type="date"
                                defaultValue=""
                                InputLabelProps={{ shrink: true }}
                                onChange={releaseDateStartSetter}
                            />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField
                                id="releaseDateEnd"
                                label="Release Date End"
                                type="date"
                                defaultValue=""
                                InputLabelProps={{ shrink: true }}
                                onChange={releaseDateEndSetter}
                            />
                        </FormControl>
                        <br /><br />
                        <FormControl className={classes.formControl}>
                            <Button onClick={applyFilter} variant="contained" color="primary">
                                APPLY
                            </Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </div>
        </div>
        </Fragment>
    )
}

export default withStyles(styles)(Home);