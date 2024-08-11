import React from "react";
import { Grid, Container, Button, TextField, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import axios from "axios";
import AttachFile from 'react-file-base64';

const EditProduct = (props) => {

    const[snackbar, setSnackbar] = React.useState(false)

    const showSnackbar = () => {
        setSnackbar(true)
    }

    const hideSnackbar = () => {
        setSnackbar(false)
    }


    const [singleProduct, setSingleProduct] = React.useState(null)
    const [update, setupdate] = React.useState({
        name: '',
        category: '',
        price:'',
        description: '',
        likes: '',
        image: ''
    })

    const singleProductData = async() =>{
        const singleData = await axios.get("http://localhost:4000/shop/product/" + props.match.params.id)
        setSingleProduct(singleData.data)
        // await setupdate({
        //     name: singleProduct.name,
        //     category: singleProduct.category,
        //     price: singleProduct.price,
        //     description: singleProduct.description,
        //     likes: singleProduct.likes,
        //     image: singleProduct.image
        // })
    }

    

    const updateProduct = (event) => { 
        event.preventDefault();
         const myData = {
            category: update.category,
            name: update.name,
            price: update.price,
            description: update.description,
            likes: update.likes,
            image: update.image
        }

        // alert(JSON.stringify(myData))



    axios.patch('http://localhost:4000/shop/'+ props.match.params.id +'/edit', myData)
        .then(
            response => {
                console.log(response.data)
                showSnackbar()
                alert("Data has been Updated")
            })
    }

    const[category, setCategory] = React.useState([])

    const getCategory = async() => {
         const response = await axios.get('http://localhost:4000/category/getCategories')
         setCategory(response.data)         
     }

    React.useEffect(() => {
        singleProductData()
        getCategory()
    }, [])

    let singleData, categoryData

    if (category)
       categoryData = category.map((value) => (
           <option>{value.category}</option>
       ))
           
    else
       categoryData = ''

   
    if (singleProduct) {
        singleData =
        <Grid container style={{backgroundColor: "#99AEAD", color: "white"}} className={"p-4"}>
                <Grid item lg={6}>
                    <Grid container spacing={3}>

                        <form onSubmit={updateProduct}>

                            <Grid item lg={12}>
                                    <select className={"form-control"}  onChange={(event) => {setupdate({...update, category:event.target.value})}}>
                                        <option>Select Category</option>
                                                {categoryData}
                                    </select>
                            </Grid>

                            <Grid item lg={12}>
                                <TextField label={"Product Name"} 
                                fullWidth 
                                required
                                className={"mb-3"} 
                                defaultValue={singleProduct.name}
                                onChange={(event) => {setupdate({...update, name:event.target.value})}}
                                />
                            </Grid>

                            <Grid item lg={12}>
                                <TextField label={"Description"} 
                                fullWidth 
                                required
                                className={"mb-3"} 
                                defaultValue={singleProduct.description}
                                onChange={(event) => {setupdate({...update, description:event.target.value})}}
                                />
                            </Grid>

                            <Grid item lg={4}>
                                <TextField label={"Price"} 
                                fullWidth 
                                required
                                className={"mb-3"} 
                                defaultValue={singleProduct.price}
                                onChange={(event) => {setupdate({...update, price:event.target.value})}}
                                />
                            </Grid>


                            <Grid item lg={4}>
                                <TextField label={"Likes"} 
                                fullWidth 
                                required
                                className={"mb-3"} 
                                defaultValue={singleProduct.likes}
                                onChange={(event) => {setupdate({...update, likes:event.target.value})}}
                                />
                            </Grid>

                            <Grid item lg={4}>
                                <AttachFile type={"File"} 
                                    multiple={false} 
                                    fullWidth 
                                    required
                                    onDone={({base64}) => setupdate({...update, image: base64})}
                                    />
                            </Grid>

                            <Button type={"submit"} variant={"contained"} fullWidth className={"mt-3 text-white"} style={{backgroundColor: "#2F575D", color: "DEE1DD"}} >Update</Button>
            
                        </form>
                    </Grid>                      
                </Grid>

                <Grid item lg={3}>
                </Grid>

                <Grid item lg={3}>
                    <img src={singleProduct.image} width={"100%"} alt={singleProduct.name}/>
                </Grid>
               
            </Grid>
    }

    else {
        singleData = ''
    }
    
    
    return (
        <Container className={"mt-5"}>

            {singleData}

              {/* Snackbar from material to show message */}
            
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
                        Product Updated!
                </Alert>
            </Snackbar>   
            
            <Grid container>
                <Grid item lg={12}>
                    <h4>{update.name}</h4>    
                    <h4>{update.category}</h4>
                    <h4>{update.description}</h4>
                    <h4>{update.likes}</h4>
                    <h4>{update.image}</h4>
                    <h4>{update.price}</h4>
                </Grid>
            </Grid>
            
        </Container>

    )
}

export default EditProduct