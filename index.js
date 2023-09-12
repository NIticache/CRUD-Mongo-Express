require('dotenv').config() //importing env file
const express = require("express") //importing express
const app = express() // store the express
const mongoose = require("mongoose") //importing  the mongoose
const productRoute = require("./routes/productRoute")
const errorHandler = require('./middleware/errorHandler')
const cors = require("cors")
const corsOptions = {
  origin: process.env.FRONT_END,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(errorHandler)
app.use(express.json())
app.use("/api/product", productRoute)


const PORT = process.env.PORT
const MongoURL = process.env.MongoURL

app.get("/", (req, res) => {
  try {
    res.send("Hi , call my endpoints , it is legendary")
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})
app.use(errorHandler)
mongoose.connect(MongoURL).then(() => {
  console.log("Connected to MONGODB")
  app.listen(PORT, () => {
    console.log(`running in port ${PORT}`)
  })
})



