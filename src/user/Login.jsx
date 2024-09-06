import React from 'react';
import axios from 'axios';
import { Container, TextField, Box, Button, Typography, Snackbar } from '@material-ui/core';
import css from './user.module.css';
import { Alert } from '@material-ui/lab';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login(){

    const[snackbar, setSnackbar] = React.useState(false)

    const showSnackbar = () => {
        setSnackbar(true)
    }

    const hideSnackbar = () => {
        setSnackbar(false)
    }

    const responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem('loginID', response.profileObj.googleId)
        localStorage.setItem('loginName', response.profileObj.name)
        localStorage.setItem('loginEmail', response.profileObj.email)
        localStorage.setItem('loginPic', response.profileObj.imageUrl)
        localStorage.removeItem('loginPassword')
        window.location = "http://localhost:3000/welcome"
    }

    // const responseFacebook = (response) => {
    //     console.log(response);
    //     localStorage.setItem('loginID', response.googleId)
    //     localStorage.setItem('loginName', response.name)
    //     localStorage.setItem('loginEmail', response.email)
    //     localStorage.setItem('loginPic', response.picture.data.url)
    //     localStorage.removeItem('loginPassword')
    //     window.location = "http://localhost:3000/welcome"
    // }

    const [login, setLogin] = React.useState({
        email: '',
        password: ''
    })

    const enterUser = (event) => {
        event.preventDefault()
        const userDetails = {
            email: login.email,
            password: login.password 
        }

        axios.post('http://localhost:4000/user/login', userDetails)
        .then(response => {
                console.log(response.data)
                
                if(response.data === "Wrong email or password"){
                    alert (response.data)

                }
                else{
                    showSnackbar()
                    localStorage.setItem('loginID', response.data._id)
                    localStorage.setItem('loginName', response.data.name)
                    localStorage.setItem('loginEmail', response.data.email)
                    localStorage.setItem('loginPassword', response.data.password)
                    localStorage.removeItem('loginPic')
                    window.location = "http://localhost:3000/welcome"
                } 
            })

        setLogin({
            email: '',
            password: ''
        })

    }


    return(
        <Container className={"mt-5"} maxWidth={"sm"}>
            <Box>

                <Typography variant={"h4"} align={"center"} className={css.color}>Login</Typography>

                <form onSubmit={enterUser}>
                    <TextField label={"Email"}
                    fullWidth
                    required
                    value={login.email}
                    onChange={(event) => {setLogin({...login, email:event.target.value})}}
                    />

                    <TextField label={"Password"}
                    fullWidth
                    required
                    type={"password"}
                    value={login.password}
                    onChange={(event) => {setLogin({...login, password:event.target.value})}}
                    />

                    <Button type={"submit"} variant={"contained"} fullWidth className={"mt-5 text-white"} style={{backgroundColor: "#2F575D", color: "DEE1DD"}} >Login</Button>
                </form>
            </Box> 

            <Box mt={5}>
                <Typography variant={"h4"} align={"center"} className={css.color}>Or Login With </Typography>

                <GoogleLogin
                    clientId="372809785738-ctng48ipsmjm9l18dehas44t03n6cnj9.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className={"m-5"}
                />

                {/* <FacebookLogin
                    appId="1113980082360995"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                /> */}

            </Box>
            
             {/* Snackbar from material to show message */}
            
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={snackbar}
                autoHideDuration={2000}
                onClose={hideSnackbar}                
            >   
                 <Alert severity="success">
                        Welcome To Our Shop.
                </Alert>
            </Snackbar>                
        </Container>
    )
}