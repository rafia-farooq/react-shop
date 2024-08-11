import { Box, Container, TextField, Typography, Button, Grid, Snackbar,
    FormControlLabel, Checkbox, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Category(){

    const[snackbar, setSnackbar] = React.useState(false)

    const showSnackbar = () => {
        setSnackbar(true)
    }

    const hideSnackbar = () => {
        setSnackbar(false)
    }


    const [category, setCategory] = React.useState('')

    const saveCategory = (event) => { 
        event.preventDefault();
         const myData = 
            {category: category.category}

            axios.post('http://localhost:4000/category/addCategory', myData)
            .then(
                response => {
                    console.log(response.data)
                    showSnackbar()
                })
    
                setCategory('')
    }
        

    return(
        <Container>
          <Paper elevation={3}>

            <Box className={"my-4 p-3"}>
                <Typography variant={"h4"} align={"center"} className={"my-4"}>Add Category</Typography>

                <form onSubmit={saveCategory}>
                    <TextField label={"Category"} 
                               fullWidth 
                               required
                               className={"mb-3"} 
                               value={category.category}
                               onChange={(event) => {setCategory({category:event.target.value})}} />
                    
                    
                    <Button type={"submit"} variant={"contained"} fullWidth className={"mt-3 text-white"} style={{backgroundColor: "#2F575D", color: "DEE1DD"}} >Save</Button>
            
                </form>

            </Box>
        <Grid container spacing={4}>
            <Grid item>
                <h3>{category.category}</h3>
            </Grid>  
        </Grid>



        {/* Snackbar from material to show saved message */}
            
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={snackbar}
                autoHideDuration={2000}
                onClose={hideSnackbar}                
            >   
                 <Alert severity="success">
                         Saved!
                </Alert>
            </Snackbar>       
          </Paper>
        </Container>

    )
}