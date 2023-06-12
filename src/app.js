const express = require('express');
const path = require('path');
const app = express();

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname,'../public');

const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


app.set('view engine', 'ejs');
app.set('views',viewsPath);
app.use(express.static(publicStaticDirPath));

app.listen(port, () =>{
    console.log("Chl gya server",port);
});

app.get('/', (req,res)=> {
    // res.render();
    // res.send("AAJA yaha ");
    res.render('index');
});

app.get('/weather',(req,res) =>{
    
    const address = req.query.address;

    if(!address){
        return res.send({
            error: "bsdk naam to daal shi se",
        })
    }

    weatherData(address, (error,{temperature,description, cityName} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature,description,cityName);
        
        res.send({
            temperature,
            description,
            cityName
        });
    });
    
});

app.get("*", (req,res) => {
    
    res.render("404");
});