import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, TextField, Box, Button, Typography, Snackbar } from '@material-ui/core';
import css from './user.module.css';
import { Alert } from '@material-ui/lab';

export default function Login(){

    const[snackbar, setSnackbar] = React.useState(false)

    const showSnackbar = () => {
        setSnackbar(true)
    }

    const hideSnackbar = () => {
        setSnackbar(false)
    }

    const [register, setRegister] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const registerUser = (event) => {
        event.preventDefault();
         const userDetails = {
            name: register.name,
            email: register.email,
            password: register.password 
        }

        axios.post('http://localhost:4000/user/register', userDetails)
        .then(
            response => {
                console.log(response.data)
                showSnackbar()
                window.location = "http://localhost:3000/login"
            })

        setRegister({
            name: '',
            email: '',
            password: ''
        })
    }

    return(
        <Container className={"mt-5"} maxWidth={"sm"}>
            <Box className={css.width}>

                <Typography variant={"h4"} align={"center"}>Register</Typography>

                <form onSubmit={registerUser}>
                    <TextField label={"Name"}
                    fullWidth
                    required
                    className={"mb-3"} 
                    value={register.name}
                    onChange={(event) => {setRegister({...register, name:event.target.value})}}
                    />

                    <TextField label={"Email"}
                    fullWidth
                    required
                    className={"mb-3"} 
                    value={register.email}
                    onChange={(event) => {setRegister({...register, email:event.target.value})}}
                    />

                    <TextField label={"Password"}
                    fullWidth
                    required
                    className={"mb-3"} 
                    type={"password"}
                    value={register.password}
                    onChange={(event) => {setRegister({...register, password:event.target.value})}}
                    />

                    <Button type={"submit"} variant={"contained"} fullWidth className={"mt-5 text-white"} style={{backgroundColor: "#2F575D", color: "DEE1DD"}}>Register</Button>
                </form>
            </Box> 

            <h4>{register.name}</h4>           
            <h4>{register.email}</h4>    
            <h4>{register.password}</h4>    

              {/* Snackbar from material to show saved message */}
            
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={snackbar}
                autoHideDuration={3000}
                onClose={hideSnackbar}                
            >   
                 <Alert severity="success">
                        Welcome! You are a registered user now.
                </Alert>
            </Snackbar>                     
        </Container>
    )
}