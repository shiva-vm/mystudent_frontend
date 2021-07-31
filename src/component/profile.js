import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {
    Grid,
    Chip,
    Modal,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from '../static/upload.png'
import Multiselect from 'multiselect-react-dropdown';
import { Image } from 'react-bootstrap';
import SignUp from './signup';
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles({
    root: {
        maxWidth: 200,
    },
    media: {
        height: 0,
        width: "206px",
        height: '200px', // 16:9,
        marginTop:'30'
      }
});

const useStyles1 = makeStyles({
    root: {
        maxWidth: 700,
    },
    media: {
        height: 140,
    },
});

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles2 = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Profile() {
    const classes = useStyles();
    const classes1 = useStyles1();
    const [state,setState]=useState({ name: "", password: "", email: "", phone: "", address: "", experience: 0, degree: "none" ,skills:[]})
    let history = useHistory();
    toast.configure()
    let chip=null
    const id=window.location.href.split("?")[1]
    useEffect(() => {
        var axios = require('axios');
       
        var config = {
            method: 'get',
            url: `http://localhost:8001/student/getStudentById/${id}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
               if(response.data.resultCode==1){
                   setState(response.data.resultData)
                   chip=response.data.resultData
               }
               else{
                toast("❌ student not found", { position: toast.POSITION.TOP_CENTER })    
               }
            })
            .catch(function (error) {
                console.log(error);
                toast("❌ something went wrong", { position: toast.POSITION.TOP_CENTER }) 
            });
            
    },[])

    

    return (

        <div style={{ backgroundImage: 'url(https://steemitimages.com/p/HNWT6DgoBc14riaEeLCzGYopkqYBKxpGKqfNWfgr368M9WPXpMQxgG8iSyiJVEErQBP3QKnpth9HNJQeuGqv4p4VSXj1Ugs79qokSDMJ3NCQySVa2Zxt9kC69VQ?format=match&mode=fit)' }} >
            <Grid container spacing={4}>
                <Grid xs={12} md={3} item >
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={state.imageUrl}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                   {state.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid xs={12} md={9} item >
                    <Card className={classes1.root}>
                        <CardActionArea>

                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h7">
                                    Phone
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   {state.phone}
                                </Typography>
                                <hr></hr>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Address
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   {state.address}
                                </Typography>
                                <hr></hr>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Experience
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   {state.experience}
                                </Typography>
                                <hr></hr>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Skills
                                </Typography>
 
                                <Typography variant="body2" color="textSecondary" component="p">
                                    { 
                                   state.skills.length!=0?state.skills[0].split(',').map(item=>{
                                                          
                                       return(<Chip
                                        label={item}
                                        variant="outlined"
                                    />)
                                     }):null
                                    }
                                    
                                </Typography>
                                <hr></hr>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Degree of graduation
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {state.degree}
                                </Typography>
                                <hr></hr>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>

                            <Link to={`/edit?${id}`} >
                                <Button size="small" color="primary">EDIT</Button>
                            </Link>
                            <Link to={`/`} >
                                <Button size="small" color="primary">LOGOUT</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>


    );
}
