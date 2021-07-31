import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Image } from 'react-bootstrap';
import img from '../static/upload.png'
import Multiselect from 'multiselect-react-dropdown';
import { ToastContainer, toast } from 'react-toastify';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Edit() {
    const classes = useStyles();
    const [image, setImage] = useState()
    const [text, setText] = useState({ message: "", error: false });
    const [state, setState] = useState({ name: "", password: "", email: "", phone: "", address: "", experience: 0, degree: "none", imageUrl: "" })
    const [skill, setSkill] = useState()
    const option = [{ skills: 'JavaScript', id: 1 },
    { skills: 'Node Js', id: 1 },
    { skills: 'React js', id: 1 },
    { skills: 'Java', id: 1 },
    { skills: 'Python', id: 1 },
    { skills: 'Bootstrap', id: 1 },
    { skills: 'css', id: 1 },
    { skills: 'MongoDb', id: 1 },]
    const id = window.location.href.split("?")[1]

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function onSelect(selectedList, selectedItem) {
        setSkill(selectedList)
    }
    function onRemove(selectedList, selectedItem) {
        setSkill(selectedList)
    }

    function ValidateConfirmPassword(e) {
        if (state.password != e.target.value) {
            setText(prevState => ({
                ...prevState,
                message: "password did not match",
                error: true
            }));

        } else {
            setText(prevState => ({
                ...prevState,
                message: "",
                error: false
            }));
        }
    }
   
    useEffect(() => {
        var axios = require('axios');
        
        var config = {
            method: 'get',
            url: `http://localhost:8001/student/getStudentById/${id}`,
            headers: {}
        };
        axios(config)
            .then(function (response) {
                if (response.data.resultCode == 1) {
                    setState(response.data.resultData)
                    let skill=[]
                    response.data.resultData.skills[0].split(",").forEach(el=>{
                        skill.push({skills:el,id:1})
                    })
                    setSkill(skill)
                }
                else {
                    toast("❌ student not found", { position: toast.POSITION.TOP_CENTER })
                }
            })
            .catch(function (error) {
                console.log(error);
                toast("❌ something went wrong", { position: toast.POSITION.TOP_CENTER })
            });
    }, [])


    toast.configure()
    function submit(e) {
        e.preventDefault()
        if (skill == undefined) {
            toast("❌ please slect skills", { position: toast.POSITION.TOP_CENTER })
            return
        }
        if (skill.length == 0) {
            toast("❌ please select skills", { position: toast.POSITION.TOP_CENTER })
            return
        }
        if (state.degree == "none") {
            toast("❌ please select degree", { position: toast.POSITION.TOP_CENTER })
            return
        }
        if (state.experience == 0) {
            toast("❌ please selecr experience", { position: toast.POSITION.TOP_CENTER })
            return
        }
        
        let skillArr = []
        skill.forEach(element => {
            skillArr.push(element.skills)
        });

        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        if(image)
        data.append('profile', image);
        data.append('name', state.name);
        data.append('phone', state.phone);
        data.append('email', state.email);
        data.append('password', state.password);
        data.append('degree', state.degree);
        data.append('skills', skillArr);
        data.append('address', state.address);
        data.append('experience', state.experience);

        var config = {
            method: 'post',
            url: `http://localhost:8001/student/updateStudentbyId/${id}`,
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.resultCode == 1) {
                    toast("✔️ Account update", { position: toast.POSITION.TOP_CENTER })
                    setTimeout(() => { window.location.href = `./myprofile?${response.data.resultData}` }, 2000)


                }
                else {
                    toast(`❌ ${response.data.resultMessage}`, { position: toast.POSITION.TOP_CENTER })
                }
            })
            .catch(function (error) {
                console.log(error);
                toast(`❌ ${error}`, { position: toast.POSITION.TOP_CENTER })
            });

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   Edit
                </Typography>


                <form onSubmit={submit} className={classes.form}  >

                    <Grid container spacing={2}>
                        <Grid justify="center" xs={12} item >
                            <Image src={image ? URL.createObjectURL(image) : state.imageUrl}
                                width={171}
                                height={180}
                                roundedCircle
                                fluid
                            />
                        </Grid>
                        <Grid justify="center" xs={12} item >
                            <input onChange={(e) => setImage(e.target.files[0])} accept="image/*" style={{ display: "none" }} id="icon-button-file" type="file" d />
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Name"
                                autoFocus
                                onChange={handleChange}
                                value={state.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="phone"
                                name="phone"
                                type="number"
                                onChange={handleChange}
                                value={state.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                onChange={handleChange}
                                value={state.email}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="address"
                                label="Address*"
                                type="text"
                                id="address"
                                onChange={handleChange}
                                value={state.address}
                            />

                        </Grid>
                        <Grid item xs={6} >
                            <br></br>
                            <InputLabel id="demo-controlled-open-select-label">Degree of graduation</InputLabel>
                            <Select
                                style={{ 'min-width': '8rem' }}
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                name="degree"
                                value={state.degree}
                                onChange={handleChange}
                            >
                                <MenuItem value="none">None </MenuItem>
                                <MenuItem value="BE">BE</MenuItem>
                                <MenuItem value="Bsc">Bsc</MenuItem>
                                <MenuItem value="BBA">BBA</MenuItem>
                                <MenuItem value="Bcom">Bcom</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6} >
                            <br></br>
                            <InputLabel id="Year-of-experience">Experience in years</InputLabel>
                            <Select
                                style={{ 'min-width': '8rem' }}
                                labelId="Year-of-experience"
                                id="demo-controlled-open-select"
                                name="experience"
                                value={state.experience}
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6} >
                            <InputLabel id="skill">Skills</InputLabel>
                            <Multiselect
                                labelId="Year-of-experience"
                                options={option} // Options to display in the dropdown
                                selectedValues={skill} //Preselected value to persist in dropdown
                                onSelect={onSelect} // Function will trigger on select event
                                onRemove={onRemove} // Function will trigger on remove event
                                displayValue="skills" // Property name to display in the dropdown options
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{window.location.href=`/myprofile?${id}`}}
                    >
                        Update
                    </Button>
                   
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
