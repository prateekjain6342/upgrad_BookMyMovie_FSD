import React, { Fragment, useState } from "react";
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

    let movies = [
        {
            "id": 1,
            "poster_url": sampleMoviePoster,
            "title": "Sample Releasing Movie"
        },
        {
            "id": 2,
            "poster_url": sampleMoviePoster,
            "title": "Sample Releasing Movie"
        },
        {
            "id": 3,
            "poster_url": sampleMoviePoster,
            "title": "Sample Releasing Movie"
        },
        {
            "id": 4,
            "poster_url": sampleMoviePoster,
            "title": "Sample Releasing Movie"
        },
        {
            "id": 5,
            "poster_url": sampleMoviePoster,
            "title": "Sample Releasing Movie"
        },
        {
            "id": 6,
            "poster_url": sampleMoviePoster,
            "title": "Sample Releasing Movie"
        },
        {
            "id": 7,
            "poster_url": sampleMoviePoster,
            "title": "Sample Releasing Movie"
        }
    ]

    const [upcomingMovies, setUpcomingMovies] = useState(movies);

    // Genres

    let genres = [
        {
            "id": 1,
            "genre": "Drama"
        },
        {
            "id": 2,
            "genre": "Romance"
        },
        {
            "id": 3,
            "genre": "Horror"
        },
        {
            "id": 4,
            "genre": "Action"
        },
        {
            "id": 5,
            "genre": "Crime"
        },
        {
            "id": 6,
            "genre": "Thriller"
        }
    ]

    const [genre, setGenre] = useState([]);
    const genreSetter = (value) => {
        setGenre(value.target.value);
    }

    // Artists

    let artists = [
        {
            "id": 1,
            "first_name": "Prateek",
            "last_name": "Jain"
        },
        {
            "id": 2,
            "first_name": "Satish",
            "last_name": "Sahu"
        },
        {
            "id": 3,
            "first_name": "Anjali",
            "last_name": "Kalsi"
        },
        {
            "id": 4,
            "first_name": "Prateek",
            "last_name": "Kalsi"
        }
    ]

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

    let releasedMovies = [
        {
            "id": 1,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-04"
        },
        {
            "id": 2,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-05"
        },
        {
            "id": 3,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-06"
        },
        {
            "id": 4,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-07"
        },
        {
            "id": 5,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-08"

        },
        {
            "id": 6,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-09"
        },
        {
            "id": 7,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-10"
        },
        {
            "id": 8,
            "poster_url": sampleMoviePoster,
            "title": "Released Movie",
            "release_date": "2022-05-11"
        }
    ]

    

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
                    <GridListTile onClick={() => this.movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
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