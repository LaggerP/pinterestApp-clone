import React, { Component } from 'react';
import '../App.css'
import UserNav from './UserNav.js'
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom'
import auth from '../auth.js'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
    containerStyles: {
        padding: '100px',
    },
    gridList: {
        width: 500,
        height: '90vh',
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    }
});

class Profiles extends Component {
    state = {
        likedPhotos: [],
        pagina: 0,
        userEmail: '',
    }

    handleChange = name => event => this.setState({ [name]: event.target.value })

    getUserPhotosFromAPI = () => {
        if (auth.isAuthenticated()) {
            const apiURL = 'http://localhost:5000/api/Userlikes/' + this.state.userEmail;
            console.log(apiURL)
            fetch(apiURL)
                .then(response => response.json())
                .then(json =>
                    this.setState({
                        likedPhotos: json.result
                    }))
                .catch(error => console.log(error))
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <UserNav />
                <Container style={{ marginTop: 80, padding: 30 }} maxWidth="lg">
                    <h4>Buscador de fotos likeadas por otros usuarios:</h4>
                    <Grid container style={{ marginButtom: 20 }} justify="center">
                        <InputBase
                            className={classes.inputSearch}
                            placeholder="Email usuario"
                            onChange={this.handleChange('userEmail')}
                        />

                        <Button
                            type="submit"
                            size="small"
                            className={classes.button}
                            onClick={this.getUserPhotosFromAPI}
                        >
                            Buscar <i style={{ marginLeft: 5 }} className="fa fa-search"></i>
                        </Button>
                    </Grid>

                    <hr />
                    {
                        (this.state.likedPhotos.length !== 0)
                            ?
                            (
                                <div className={classes.root}>
                                    <GridList cellHeight={360} spacing={1} className={classes.gridList}>
                                        {this.state.likedPhotos.map(photo => (
                                            <GridListTile key={photo.id_user} cols={photo.featured ? 2 : 1} rows={photo.featured ? 2 : 1}>
                                                <img src={photo.url} alt={photo.alt_description} />
                                            </GridListTile>

                                        ))}
                                    </GridList>
                                </div>
                            )
                            :
                            "No hay información asociada a usuario"
                    }
                    <Grid container style={{ marginTop: 20 }} justify="center">
                        <Button style={{ marginLeft: 20 }} component={Link} to="/home" variant="contained" color="secondary"> Volver al inicio</Button>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Profiles)