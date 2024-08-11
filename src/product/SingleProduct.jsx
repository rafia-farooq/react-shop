import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import axios from "axios";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const SingleProduct = (props) => {

    const [singleProduct, setSingleProduct] = React.useState(null)

    const singleProductData = async() =>{
        const singleData = await axios.get("http://localhost:4000/shop/product/" + props.match.params.id)
        setSingleProduct(singleData.data)
    }

    React.useEffect(() => {
        singleProductData()
    }, [])

    let singleData
    if (singleProduct) {
        singleData =
        <Grid container style={{backgroundColor: "#6D9197", color: "white"}} className={"p-4"}>
                <Grid item lg={7}>
                    <Grid container spacing={3}>
                        <Grid item lg={4}>
                                <Typography variant={"h6"}>Category:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                {singleProduct.category}
                            </Grid>

                            <Grid item lg={4}>
                                <Typography variant={"h6"}>Product Name:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                {singleProduct.name}
                            </Grid>

                            <Grid item lg={4}>
                                <Typography variant={"h6"}>Price:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                {singleProduct.price}
                            </Grid>

                            <Grid item lg={4}>
                                <Typography variant={"h6"}>Description:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                {singleProduct.description}
                            </Grid>

                            <Grid item lg={4}>
                                <Typography variant={"h6"}>Likes:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                {singleProduct.likes}
                                <ThumbUpIcon style={{color: "white", marginRight: "10px"}}/> 
                            </Grid>

                            <Grid item lg={4}>
                                <Typography variant={"h6"}>Buy Per:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                {singleProduct.unit.join(', ')}
                            </Grid>
                        </Grid>

                    </Grid>
                <Grid item lg={5}>
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
        </Container>

    )
}

export default SingleProduct