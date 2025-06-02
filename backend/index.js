import express from 'express'
import dotenv from 'dotenv'
import connectdb from './database/db.js'

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Server working fine");
})

app.listen(port, () => {
    console.log("Server is running on port: " + port);
    connectdb();
})