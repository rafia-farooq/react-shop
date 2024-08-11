import { Box, Container, TextField, Typography, Button, Grid, Snackbar,
    FormControlLabel, Checkbox, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Brand(){

    const[snackbar, setSnackbar] = React.useState(false)

    const showSnackbar = () => {
        setSnackbar(true)
    }

    const hideSnackbar = () => {
        setSnackbar(false)
    }


    const [brand, setBrand] = React.useState({
        brand: '',
        category: ''
    })

    const saveBrand = (event) => { 
        event.preventDefault();
         const myData = 
            {
             brand: brand.brand,
             category: brand.category
            }

            axios.post('http://localhost:4000/brand/addBrand', myData)
            .then(
                response => {
                    console.log(response.data)
                    showSnackbar()
                })
    
                setBrand({
                    brand:'',
                    category: ''
                })
    }

    const[category, setCategory] = React.useState([])

    const getCategory = async() => {
         const response = await axios.get('http://localhost:4000/category/getCategories')
         setCategory(response.data)         
     }

     React.useEffect(()=>{
         getCategory()
     }, [])
     
     let categoryData
     if (category)
        categoryData = category.map((value) =>(
            <option>{value.category}</option>
        ))
            
     else
        categoryData = ''
         

    return(
        <Container>
          <Paper elevation={3}>

            <Box className={"my-4 p-3"}>
                <Typography variant={"h4"} align={"center"} className={"my-4"}>Add Brand</Typography>

                <form onSubmit={saveBrand}>
                    <TextField label={"Brand"} 
                               fullWidth 
                               required
                               className={"mb-3"} 
                               value={brand.brand}
                               onChange={(event) => setBrand({...brand, brand: event.target.value})} />
                    
                    <select className={"form-control"} 
                        onChange={(event) => setBrand({...brand, category: event.target.value})}>

                        <option value={''}>Select Category</option>

                        {categoryData}
                    </select>
                    
                    
                    <Button type={"submit"} variant={"contained"} fullWidth className={"mt-3 text-white"} style={{backgroundColor: "#2F575D", color: "DEE1DD"}} >Save</Button>
            
                </form>

            </Box>  



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