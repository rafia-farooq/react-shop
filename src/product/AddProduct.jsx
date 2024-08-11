import { Box, Container, TextField, Typography, Button, Grid, Snackbar,
         FormControlLabel, Checkbox } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AttachFile from 'react-file-base64';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Fab from '@material-ui/core/Fab';



export default function AddProduct(){

    const[snackbar, setSnackbar] = React.useState(false)

    const showSnackbar = () => {
        setSnackbar(true)
    }

    const hideSnackbar = () => {
        setSnackbar(false)
    }

    const moveToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    
    const [product, setProduct] = React.useState({
        name: '',
        category: '',
        price: '',
        description: '',
        likes: 0,
        image: ''
    })

    const saveProduct = (event) => { 
        event.preventDefault();
         const myData = {
            category: product.category,
            name: product.name,
            price: product.price,
            description: product.description,
            likes: product.likes,
            image: product.image,
            unit: options
    }
        
        axios.post('http://localhost:4000/shop/addProduct', myData)
        .then(
            response => {
                console.log(response.data)
                showSnackbar()
            })

          setProduct({
            category: '',
            name: '',
            price: '',
            description: '',
            likes: 0,
            image: ''
          })
        }

    const checkbox = ['dozen', 'kg', 'g', 'unit', '500 ml', '1 L']

    const [options, setOptions] = React.useState([])

    const handleValue = (event) => {
        if(event.target.checked)
            setOptions([...options, event.target.value])
        else
            setOptions(options.filter(l => l !== event.target.value))
        }

    
    const[category, setCategory] = React.useState([])

    const getCategory = async() => {
         const response = await axios.get('http://localhost:4000/category/getCategories')
         setCategory(response.data)         
     }

    const[brand, setBrand] = React.useState([])

    const getBrand = async() => {
          const response = await axios.get('http://localhost:4000/brand/getBrands')
          setBrand(response.data)         
      }

    React.useEffect(()=>{
        getCategory()
        getBrand()
    }, [])


    let categoryData, brandData

     if (category)
        categoryData = category.map((value) => (
            <option>{value.category}</option>
        ))
            
     else
        categoryData = ''

     if (brand)
        brandData = brand.map((value) =>
            { 
                if(product.category === value.category)
                     return <option>{value.brand}</option>
            })
            
     else
        brandData = ''

    return(
        <Container>
            <Grid container>
                <Grid item lg={8}>
                    <Typography variant={"h4"} align={"center"} className={"my-4"}>Add Product</Typography>

                        <form onSubmit={saveProduct}>
                            <Grid container spacing={2}>
                                <Grid item lg={6}>
                                    <select className={"form-control"}  onChange={(event) => {setProduct({...product, category:event.target.value})}}>
                                        <option>Select Category</option>
                                        {categoryData}
                                    </select>
                                </Grid>

                                <Grid item lg={6}>
                                    {product.category && (
                                        <select className={"form-control"}  onChange={(event) => {setProduct({...product, brand:event.target.value})}}>
                                            <option>Select Brand</option>
                                                    {brandData}
                                        </select>
                                    )}
                                </Grid>
                            </Grid>

                                
                            <TextField label={"Product Name"} 
                                        fullWidth 
                                        required
                                        className={"mb-3"}
                                        value={product.name}
                                        onChange={(event) => {setProduct({...product, name:event.target.value})}} />
                                
                            <TextField label={"Product description"} 
                                            fullWidth 
                                            required 
                                            multiline 
                                            className={"mb-3"}
                                            value={product.description}
                                            onChange={(event) => {setProduct({...product, description:event.target.value})}} />

                            <TextField label={"Product Price"} 
                                            fullWidth 
                                            required 
                                            className={"mb-3"}
                                            value={product.price}
                                            onChange={(event) => {setProduct({...product, price:event.target.value})}} />
                            
                            <TextField label={"Product Likes"} 
                                                fullWidth 
                                                required 
                                                className={"mb-3"}
                                                value={product.likes}
                                                onChange={(event) => {setProduct({...product, likes:event.target.value})}} />
                             
                                
                            <Typography variant={"p"} align={"center"} className={"mr-4"}>Buy per:</Typography>
                                
                                {checkbox.map((option) => (
                                
                            <FormControlLabel
                                        control={<Checkbox
                                            value={option}
                                            onChange={handleValue}
                                        />}
                                        label={option}
                                    />
                                ))}
                            
                                <br/>
                            <AttachFile type={"File"} 
                                            multiple={false} 
                                            fullWidth 
                                            required
                                            onDone={({base64}) => setProduct({...product, image: base64})}/>
                                
                            <Button type={"submit"} variant={"contained"} fullWidth className={"mt-3 text-white"} style={{backgroundColor: "#2F575D", color: "DEE1DD"}} >Save</Button>

                        </form>


                            <Grid container spacing={4}>
                                <Grid item>
                                <h3>{product.category}</h3>
                                </Grid>
                                <Grid item>
                                <h3>{product.name}</h3>
                                </Grid>
                                <Grid item>
                                <h3>{product.price}</h3>
                                </Grid>
                                <Grid item>
                                <h3>{product.description}</h3>
                                </Grid>
                                <Grid item>
                                <h3>{product.likes}</h3>
                                </Grid>
                                <Grid item>
                                <h3>{product.image}</h3>
                                </Grid>  
                                <Grid item>
                                <h3>{options}</h3>
                                </Grid>    
                            </Grid>


                </Grid>
                
            </Grid>   

        {/* Snackbar from material to show saved message */}
            
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={snackbar}
                autoHideDuration={4000}
                onClose={hideSnackbar}                
            >   
                 <Alert severity="success">
                        Product Saved!
                </Alert>
            </Snackbar>  

            {/*-------------Scroll to top icon-----------*/}

               <Fab style={{margin: "70px", backgroundColor: "#2F575D", color: "white", bottom: "0", right: "0", position: "fixed"}} onClick={moveToTop}>
                    <ArrowUpwardIcon/>      
               </Fab>     
            
        </Container>

    )

}