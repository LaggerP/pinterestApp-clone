import React, { Component } from 'react';
import '../App.css'
import UserNav from './UserNav.js'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

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
    },
});


class UserProfile extends Component {
    state = {
        likedPhotos: [],
        pagina: 0,
    }

    componentDidMount() {
        this.getPhotosFromAPI();
    }

    getPhotosFromAPI = () => {
        if (auth.isAuthenticated()) {
            const apiURL = 'http://localhost:5000/api/likes/'+ auth.user.uid;
            const {likedPhotos} = this.state
            console.log(apiURL)
            fetch(apiURL)
            .then(response => response.json())
            .then(json => 
                this.setState({
                    likedPhotos: [...likedPhotos, ...json.result]
            }))
            .catch(error => console.log(error))
        } else {
            this.props.history.push('/login')
        }
    }

    nextPage = () => {
        this.setState(prevState => ({
            pagina: prevState.pagina + 1
        }), this.getPhotos())
    }

    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <UserNav />
                <Container style={{ marginTop: 80, padding: 30 }} maxWidth="lg">
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
                            'nop'
                    }
                    <Grid container style={{ marginTop: 20 }} justify="center">
                    <Button style={{ marginLeft: 20 }} component={Link} to="/home" variant="contained" color="secondary"> <i className="fa fa-angle-double-left"></i>  Volver atras</Button>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(UserProfile)