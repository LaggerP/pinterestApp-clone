import React, {Component} from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import auth from '../auth.js';
import {Link} from 'react-router-dom'
import '../App.css'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
});

class UserNav extends Component {
    authLogOut = () => {
        auth.logout(() => { this.props.history.push('/') })
        console.log("logout completed")
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Pinterest Clone
                        </Typography>
                        <h5>Bienvenido {auth.user.email}</h5>
                        <Button variant="contained" style={{ marginLeft: 20 }} color="secondary" onClick={this.authLogOut}>Logout</Button>
                        <Button style={{ marginLeft: 20 }} component={Link} to="/me" variant="contained" color="secondary"> <i className="fa fa-user"></i>Perfil</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(UserNav))





