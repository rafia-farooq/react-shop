import { Container, Card, CardHeader, CardContent, CardActions, 
    CardMedia, Typography, Avatar, Button, Grid, IconButton, Backdrop, 
    CircularProgress, Dialog, DialogTitle, Divider } from "@material-ui/core";
import axios from "axios";
import React from "react";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./css/showProduct.module.css";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AddProduct from "./AddProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import Search from "./searchBars/Search";



const ShowProducts = () => {

    const dispatch = useDispatch()

    const[loading, setLoading] = React.useState(false)

    const startLoading = () => {
        setLoading(!loading)
    }

    const stopLoading = () => {
        setLoading(false)
    }

    const[product, setProduct] = React.useState(null)

    const getProduct = async() => {
        startLoading()
         const response = await axios.get('http://localhost:4000/shop/getProducts')
         console.log(response.data) 
         setProduct(response.data)
        stopLoading()
         
     }

     React.useEffect(() =>{
        getProduct()
    }, [])


    const filterProducts = (product, query) => {
        if (!query) {
            return product;
        }

        return product.filter((value) => {
            const productName = value.name.toLowerCase();
            return productName.includes(query);
        });
    };

    const { search } = window.location;
    const query = new URLSearchParams(search).get('search-bar');
    const [searchQuery, setSearchQuery] = React.useState(query || '');
    const filteredProducts = filterProducts(product, searchQuery);
    
    

     let productData
     if (product)
        productData = filteredProducts.map((value) => (

        <Grid item lg={4} md={2}>
            
             <Card className={style.outer}>
                 <CardHeader 
                 avatar={<Avatar className={style.avatar}>{value.name.charAt(0)}</Avatar>}
                 subheader={<span>{value.category} <br/> Added {moment(value.date).fromNow()}</span>}
                 title={value.name}
                 action={<MoreVertIcon/>}>
                 </CardHeader>

                 <CardMedia>
                    <img src={value.image} alt={value.name} width={"100%"}/>
                 </CardMedia>
                 
                 <CardContent>
                    <Typography variant={"h6"} className={style.greenText}>PKR {value.price}</Typography>
                 </CardContent>

                 <CardActions disableSpacing className={style.iconbar}>
                    <Button className={style.icons}>
                        <ThumbUpIcon className={"mr-2"}/> {value.likes} Like
                    </Button>
                    
                    <IconButton className={"ml-auto"} 
                                size={"small"}
                                onClick={(event) =>{
                                    event.preventDefault()
                                    window.location = "http://localhost:3000/singleProduct/" + value._id
                                }}>
                        <VisibilityIcon className={style.icons}/>
                    </IconButton>

                    <IconButton size={"small"} 
                                onClick={(event) =>{
                                    event.preventDefault()
                                    axios.get("http://localhost:4000/shop/product/" + value._id)
                                         .then(response => alert(JSON.stringify(response.data.name)))
                                }}>
                        <ErrorOutlineIcon className={style.icons}/>
                    </IconButton>
                   
                    <IconButton size={"small"}
                               onClick={(event) =>{
                                event.preventDefault()
                                window.location = "http://localhost:3000/" + value._id + "/edit"
                            }}>
                        <EditIcon className={style.icons}/>
                    </IconButton>
                    
                    <IconButton  size={"small"}
                                 onClick={(event) =>{
                                    event.preventDefault()
                                    axios.delete("http://localhost:4000/shop/" + value._id)
                                         .then(response => alert(JSON.stringify(response.data)))
                                }}>
                        <DeleteForeverIcon className={style.icons}/>
                    </IconButton>
                 </CardActions>
                 
                 <button type={"button"} className={style.inner} onClick={(event) => {
                        event.preventDefault()
                        dispatch(addToCart(value))
                     }}>
                         Add to Cart
                </button>
             </Card>
             
        </Grid>
            
        ))
            
     else
        productData = ''


    return(
        <Container className={"mt-5"}>
            <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            ></Search>

            <Grid container>
                <Grid item lg={9}>
                    <Grid container  spacing={2}>
                        {productData} 
                    </Grid>                    
                </Grid>
                
                <Grid item lg={3}>
                    <AddProduct />
                </Grid>
            </Grid>


            <Backdrop open={loading}>
                {/* <Dialog>
                    <DialogTitle className={style.loadingIcon}>Loading</DialogTitle>
                </Dialog>
                <Divider/> */}
                <CircularProgress className={style.loadingIcon} />
            </Backdrop>   
                   
        </Container>
     
    )
}

export default ShowProducts