import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Typography, Grid, TableContainer, 
    Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useDispatch } from "react-redux";
import { addMore, minus } from "../redux/actions";

export default function MyCart(){

    const cart = useSelector(state => state.addCart)

    const dispatch = useDispatch()

      const storedCart = localStorage.getItem('storeReduxValues')
     


    const singleProductCount = (name) => {
        const countSameItem = cart.product.filter(value => value.name === name)
        return countSameItem.length
    }

    const findInProductData = (name) => {
        const abc = cart.product.find(x => x.name === name)
        return abc
    }

    const uniqueItems = () => {
        const item = cart.product
                                .map(data => data.name)
                                .filter((name, index, array) => 
                                    array.indexOf(name) === index);

        const countItem = item.map(data => ({
            data: findInProductData(data),
            count: singleProductCount(data)
        }));

        return countItem
    }

    // const clearCart = () => {
        localStorage.removeItem('storeReduxValues')
    // }

    return (
        <Container>
            {storedCart}
           {/* <h4>Cart:</h4> {JSON.stringify(cart)}<br/> */}
           {/* <h4>Find product data: </h4>{JSON.stringify(findInProductData())}<br/> */}
           {/* <h4>Single product count:</h4> {JSON.stringify(singleProductCount())} */}
           

            <Typography variant={"h4"} className={"text-center my-5"}> 
                <ShoppingBasketIcon fontSize={"large"} className={"mr-3"}/> 
                My Cart
            </Typography>

        <Grid container spacing={5} className={"mt-3"}>
            <Grid item lg={8}>
                <Paper elevation={6}>
                <TableContainer>
                    <Table>

                        <TableHead>
                        <TableRow>
                            <TableCell className={"font-weight-bold"}>Your Cart: </TableCell>
                            <TableCell align="right">Total Price ({cart.totalPrice})</TableCell>
                            <TableCell align="right">Total Quantity ({cart.totalQty})</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>          
                            <TableCell>Products</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Item Price</TableCell>
                        </TableBody>
                            {uniqueItems().map(data => (
                            <TableBody>
                                <TableCell><img src={data.data.image} alt={data.data.name} width={"50px"}/></TableCell>
                                <TableCell>{data.data.name}</TableCell>
                                <TableCell>
                                    <Button variant={"outlined"}> -
                                    </Button>

                                    <span className={"mx-3"}>{singleProductCount(data.data.name)}</span>
                                    <Button variant={"outlined"} onClick={(event) => {
                                            event.preventDefault()
                                            dispatch(addMore(data))
                                        }}> +
                                    </Button>
                                </TableCell>
                                <TableCell>{data.data.price}</TableCell>
                            </TableBody>
                            ))}
                       

                    </Table>
                </TableContainer> 
                </Paper>
            </Grid>

            <Grid item lg={4}>
                <Grid container spacing={4}>
                    <Grid item lg={12}>
                        <Typography variant={"h6"}>Total Price:</Typography> 
                        <Typography variant={"p"} className={"ml-5"}>{cart.totalPrice}</Typography> 
                    </Grid>

                    <Grid item lg={12}>
                        <Typography variant={"h6"}> Quantity of Items: </Typography>
                        <Typography variant={"p"} className={"ml-5"}>{cart.totalQty}</Typography>
                    </Grid>

                    <Grid item lg={12}>
                        {/* <button onClick={clearCart()}>Clear Cart</button> */}
                    </Grid>
                </Grid>
            </Grid>
                    

        </Grid>         
          
        </Container>
    )
}