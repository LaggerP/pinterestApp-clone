import React, { Component } from 'react';
import UserNav from './UserNav.js'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import GridListTileBar from '@material-ui/core/GridListTileBar';
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

const API_KEY = 'da036a3fb90f5138c51a18eae3a4ffd4b2d0761679c0f30f0c9c9d8ad7407219'

class User extends Component {
    state = {
        photos: [],
        pagina: 0,
    }

    componentDidMount() {
        this.getPhotos();
    }

    getPhotos = () => {
        const { pagina, photos } = this.state
        fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${pagina}`)
            .then(response => response.json())
            .then(json => this.setState({
                photos: [...photos, ...json]
            }))
            .catch(error => console.log(error))
    }
    nextPage = () => {
        this.setState(prevState => ({
            pagina: prevState.pagina + 1
        }), this.getPhotos())
    }

    likePhoto = (e) => {
        if (auth.isAuthenticated()) {
            const apiURL = 'http://localhost:5000/api/likes';
            const data = { url: e, id_user: auth.user.uid, email_user: auth.user.email };
            fetch(apiURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
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
                    {
                        (this.state.photos.length !== 0)
                            ?
                            (
                                <div className={classes.root}>
                                    <GridList cellHeight={360} spacing={1} className={classes.gridList}>
                                        {this.state.photos.map(photo => (
                                            <GridListTile key={photo.id} cols={photo.featured ? 2 : 1} rows={photo.featured ? 2 : 1}>
                                                <img src={photo.urls.regular} alt={photo.alt_description} />
                                                <GridListTileBar
                                                    titlePosition="buttom"
                                                    actionIcon={
                                                        <i className="fa fa-heart fa-2x likeIcon" onClick={() => this.likePhoto(photo.urls.regular)} />
                                                    }
                                                    actionPosition="right"
                                                />
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                            )
                            :
                            'nop'
                    }
                    <Grid container style={{ marginTop: 20 }} justify="center">
                        <Button style={{ marginLeft: 10 }} variant="contained" color="primary" onClick={this.nextPage}>Siguiente</Button>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(User)