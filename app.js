const express = require("express");
const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const { rejects } = require("assert");

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.resolve(__dirname, 'data/restaurants.json')

const getJson = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFilePath,'utf-8', (err, data)=>{
            if(err){
                reject(err); 
            }else{
                console.log('reading file data');
                resolve(data);
            }
        });
        console.log('after reading file');
    });
}

app.get('/data', (req, res)=>{
    getJson()
        .then(data => {
            let restaurantData = JSON.parse(data);
            res.send(restaurantData);
        })
});

app.get('/', (req, res)=>{
    res.send('Asynchronous Javascript Practice');
})

app.listen(3000, (err)=>(err) ? err : console.log(`server up and running on port ${port}`))