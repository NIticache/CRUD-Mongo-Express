require('dotenv').config() //importing env file
const express = require("express") //importing express
const app = express() // store the express
const mongoose = require("mongoose") //importing  the mongoose
const productRoute = require("./routes/productRoute")

app.use(express.json())
app.use("/api/product", productRoute)


const PORT = process.env.PORT || 6000
const MongoURL = process.env.MongoURL


mongoose.connect(MongoURL).then(() => {
  console.log("Connected to MONGODB")
  app.listen(PORT, () => {
    console.log(`running in port ${PORT}`)
  })
})



