const express  = require("express");
const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors");
const app  = express();



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



const routes = require("./routes/index")
app.use("/v1", routes);


app.use((req, res,next)=>{
    res.status(404).json({
        status:"failed",
        message:"Incorrect path entered"
    })
})

app.use((err, req,res ,next)=>{
    console.log(err);


    res.status(500).json({
        status:"failed",
        message:"Internal server error "
    })
})

module.exports = app;
