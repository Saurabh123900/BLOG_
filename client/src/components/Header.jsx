
import {AppBar , Toolbar, Typography, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';

const useStyles = makeStyles({
component : {
    background: '#FFFFFF',
    color : 'black'
},
container : {
    justifyContent : 'center',
    '& > *' : {
        padding: 20
    }
},
link :{
    textDecoration: 'none',
    color : 'inherit'
}
})

const Header = () => {
    const classes = useStyles();

    const { oktaAuth, authState } = useOktaAuth();

    if (authState && authState.isPending) return null;

    const history = useHistory ;
    const login = async () => history.push('/login');
    const logout = async () => oktaAuth.signOut();


    const button = authState.isAuthenticated ?
    <button onClick={logout}>Logout</button> :
    <button onClick={login}>Login</button>;

    return (
        <AppBar className = {classes.component} >
            <Toolbar className = {classes.container}>
                <Link to= {'/'} className={classes.link}>
                    <Typography>Home</Typography>
                </Link>
                <Typography>About</Typography>
                <Typography>Contact</Typography>
                <Typography>{button}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header ;