import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import a from '../images/fruit1.jpeg';
import b from '../images/fruit2.jpeg';
import c from '../images/fruit3.jpeg';
import d from '../images/fruit4.jpeg';
import e from '../images/fruit5.jpeg';
import f from '../images/fruit6.jpeg';
import g from '../images/fruit7.jpeg';
import h from '../images/fruit8.jpeg';
import i from '../images/fruit9.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import productCSS from './css/product.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Search from "./searchBars/SearchBar";

const Shop = () => {
    const myProducts = [
        {
            image: a,
            name: 'Fruit A',
            price: 'PKR 50,000',
        },

        {
            image: b,
            name: 'Fruit B',
            price: 'PKR 85,000',
        },

        {
            image: c,
            name: 'Fruit C',
            price: 'PKR 10,000',
        },

        {
            image: d,
            name: 'Fruit D',
            price: 'PKR 8,000',
        },

        {
            image: e,
            name: 'Fruit E',
            price: 'PKR 4,500',
        },

        {
            image: f,
            name: 'Fruit E',
            price: 'PKR 4,500',
        },

        {
            image: g,
            name: 'Fruit G',
            price: 'PKR 1,500',
        },

        {
            image: h,
            name: 'Fruit H',
            price: 'PKR 800',
        },

        {
            image: i,
            name: 'Fruit I',
            price: 'PKR 20,000',
        },
    ]

    React.useEffect(() =>{
        AOS.init({duration:3000});
    })

    const [quantity, setQuantity] = React.useState(0)

    const addToCart = (event) => {
        event.preventDefault()
        setQuantity(quantity + 1)
    }

    const { search } = window.location;
    const query = new URLSearchParams(search).get('search-bar');

    const filterProducts = (myProducts, query) => {
        if (!query) {
            return myProducts;
        }

        return myProducts.filter((product) => {
            const myquery = query.toLowerCase();
            const postName = product.name.toLowerCase();
            return postName.includes(myquery);
        });
    };
    const filteredProducts = filterProducts(myProducts, query);

    return(
        <Container className={productCSS.body}>
            <Typography variant={"h3"} className="text-white text-center">Shop</Typography>
            <Typography variant={"p"} className={productCSS.qty}>Selected items: {quantity}</Typography>
            <Search></Search>
            <Box>
                <Grid container>
                    {
                        filteredProducts.map(product=>( 
                            <Grid item xs={6} md={6} lg={4} className={productCSS.image} style={{margin:"20px 0"}} data-aos="flip-left" data-aos-once="true">
                              
                                <img src={product.image} alt={product.name} width={350}/>
                                
                                <Typography variant={"h5"} className="text-white">{product.name}</Typography>
                                <Typography variant={"p"} className="text-danger">{product.price}</Typography>
                               
                                <a href={"#"} className={productCSS.link} onClick={addToCart}>
                                    <ShoppingCartIcon mr={3}/>
                                    Add to cart 
                                </a>
                            </Grid>
                        ))
                    }
                    
                </Grid>
            </Box>
        </Container>
    )
}

export default Shop;