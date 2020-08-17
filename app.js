const express = require("express");
const fs = require("fs");
const utils = require("utils");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.resolve(__dirname, 'data/restaurants.json')

const getJson = (callback) => {
    fs.readFile(dataFilePath,'utf-8', (err, data)=>{
        if(err){
            callback(err, null); 
        }else{
            console.log('reading file data');
            callback(null, data);
        }
    });
    console.log('after reading file');
}

app.get('/data', (req, res)=>{
    getJson((err, data)=>{
        if(err){
            throw err;
        }
        let restaurantData = JSON.parse(data);
        res.send(restaurantData);
    });
});

app.get('/', (req, res)=>{
    res.send('Asynchronous Javascript Practice');
})

app.listen(3000, (err)=>(err) ? err : console.log(`server up and running on port ${port}`))