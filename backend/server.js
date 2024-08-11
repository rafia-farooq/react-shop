const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotEnv = require("dotenv")

const shopRoutes = require("./routes/shopRoutes")
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const brandRoutes = require("./routes/brandRoutes")

const bodyParser = require('body-parser')
const cors = require("cors")

dotEnv.config()
mongoose.connect(process.env.DATABASE_CONNECT,
                    {useNewUrlParser: true, useUnifiedTopology: true}, 
                    () => {console.log("Mongoose DB connected")}
                )
                
                // save larger image files
                app.use(bodyParser.json({limit: "30mb", extended: true}))
                app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

app.use(express.json())
app.use(cors())
app.use("/shop", shopRoutes)
app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/brand", brandRoutes)
app.listen (4000, console.log("Server is now running"))