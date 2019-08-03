import React, { Component } from 'react';
import '../App.css'
import Nav from './Nav.js'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    titleBar: {
        background:
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        marginRight: 20 
    },
    icon: {
        color: 'white',
    },
});

const API_KEY = 'da036a3fb90f5138c51a18eae3a4ffd4b2d0761679c0f30f0c9c9d8ad7407219'

class Home extends Component {
    state = {
        photos: [],
        pagina: 1,
    }

    componentDidMount() {
        if (auth.isAuthenticated()) {
            this.props.history.push('./home')
        } else {
            console.log("nono")
        }
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

    likePhoto = () => {
        console.log("click")
        if (auth.isAuthenticated()) {

        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <Nav />
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
                                                        <i className="fa fa-heart fa-2x likeIcon" onClick={this.likePhoto} />
                                                    }
                                                    actionPosition="right"
                                                    className={classes.titleBar}
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

export default withStyles(styles)(Home)