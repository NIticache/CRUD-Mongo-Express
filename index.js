// const express = require("express")
// import express from "express"
// import Client from 'pg'
// import { MongoClient } from "mongodb";
// import mongoose from "mongoose";
require('dotenv').config() //importing env file
const express = require("express") //importing express
const app = express() // store the express
const mongoose = require("mongoose") //importing  the mongoose
const Product = require('./productModels')


app.use(express.json())



const PORT = process.env.PORT || 6000
const MongoURL = process.env.MongoURL


mongoose.connect(MongoURL).then(() => {
  console.log("Connected to MONGODB")
  app.listen(PORT, () => {
    console.log(`running in port ${PORT}`)
  })
})

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json({ product })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

app.get("/product", async (req, res) => {
  try {
    const product = await Product.find({})
    res.status(200).json({ message: product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//update the product
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

//delete a product

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product, "....................")
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
})

