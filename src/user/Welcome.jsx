import { Container, Grid, Typography } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileImg from '../images/profile-img.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import a from '../images/fruit1.jpeg';
import b from '../images/fruit2.jpeg';
import c from '../images/fruit3.jpeg';
import d from '../images/fruit4.jpeg';
import 'animate.css/animate.min.css';

export default function Welcome(){
    return (
        <Container>
            <Grid container className={"mt-5"} spacing={3}>

                <Grid item lg={5}>
                    <Carousel autoPlay={true} infiniteLoop={true} interval={1500}>
                        <div>
                            <img src={a} />
                            <p className="legend">Shop Fruits</p>
                        </div>
                        <div>
                            <img src={b} />
                            <p className="legend">Fresh </p>
                        </div>
                        <div>
                            <img src={c} />
                            <p className="legend">Variety</p>
                        </div>
                        <div>
                            <img src={d} />
                            <p className="legend">Organic</p>
                        </div>
                    </Carousel>
                </Grid>

                <Grid item lg={4} style={{backgroundColor: "#658B6F"}}>
                    <Grid container spacing={3}>
                        <Grid item lg={6}>
                            <Typography variant={"h6"} className={"animate__animated animate__slideInLeft animate__delay-2s"}>ID:</Typography>
                        </Grid>

                        <Grid item lg={6}>
                            <Typography variant={"subtitle1"}>{localStorage.getItem('loginID')}</Typography>
                        </Grid>

                        <Grid item lg={6}>
                            <Typography variant={"h6"} className={"animate__animated animate__slideInLeft animate__delay-2s"}>Name:</Typography>
                        </Grid>

                        <Grid item lg={6}>
                            <Typography variant={"subtitle1"}>{localStorage.getItem('loginName')}</Typography>
                        </Grid>


                        <Grid item lg={6}>
                            <Typography variant={"h6"} className={"animate__animated animate__slideInLeft animate__delay-2s"}>Email:</Typography>
                        </Grid>

                        <Grid item lg={6}>
                            <Typography variant={"subtitle1"}>{localStorage.getItem('loginEmail')}</Typography>
                        </Grid>

                        {localStorage.getItem('loginPassword') && (
                        <>
                            <Grid item lg={6}>
                                <Typography variant={"h6"} className={"animate__animated animate__slideInLeft animate__delay-2s"}>Password:</Typography>
                            </Grid>

                            <Grid item lg={6}>
                                <Typography variant={"subtitle1"}>{localStorage.getItem('loginPassword')}</Typography>                    
                            </Grid>
                        </>
                        )}
                    </Grid>
                </Grid>

                <Grid item lg={3} className={"p-3"} style={{backgroundColor: "#658B6F"}}>
                    <Typography variant={"h6"}>Hi, {localStorage.getItem('loginName')}. <br/>Welcome to our shop.</Typography>  

                    <img src={localStorage.getItem('loginPic') ?? ProfileImg} className={"img-thumbnail"} alt={"Profile Image"} className={"p-2 my-2"}/> 
                      
                </Grid>
            </Grid>
            
        </Container>
    )
}

