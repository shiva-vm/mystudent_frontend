import { React, useState } from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.mefy.care">
                MeFy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://steemitimages.com/p/HNWT6DgoBc14riaEeLCzGYopkqYBKxpGKqfNWfgr368M9WPXpMQxgG8iSyiJVEErQBP3QKnpth9HNJQeuGqv4p4VSXj1Ugs79qokSDMJ3NCQySVa2Zxt9kC69VQ?format=match&mode=fit)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginPage() {
    const classes = useStyles();
    const [state, setState] = useState({ email: "", password: "" });
    const [text, setText] = useState({ message: "", error: false });
    let history = useHistory();
    toast.configure()
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function ValidateEmail(e) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            const { name, value } = e.target;
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
            setText(prevState => ({
                ...prevState,
                message: "",
                error: false
            }));
        } else {
            setText(prevState => ({
                ...prevState,
                message: "invalid emailId",
                error: true
            }));
        }

    }

    function submit(e) {

        e.preventDefault()

        if (text.error) {
            toast.error("❌ please enter valid email Id", { position: toast.POSITION.TOP_CENTER })
            return
        }
        console.log(state)
        var axios = require('axios');
        var data = JSON.stringify({
            "email": state.email,
            "password": state.password
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8001/student/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) { 
                if(response.data.resultCode==1){
                toast("✔️ Login sucess", { position: toast.POSITION.TOP_CENTER })
                history.push(`/myprofile?${response.data.resultData}`)
            }
                else
                toast.error("❌ Invalid Credentials", { position: toast.POSITION.TOP_CENTER })
            })
            .catch(function (error) {
                console.log(error)
                //toast.error(`❌ ${error} `, { position: toast.POSITION.TOP_CENTER })
            });

    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={submit} className={classes.form} autoComplete="off">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                        />
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
