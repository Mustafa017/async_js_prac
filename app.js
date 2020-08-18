const express = require("express");
const fsPromises = require("fs").promises;// node version should be >= 10 
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.resolve(__dirname, 'data/restaurants.json')

async function getJson(){
    let jsonData = await fsPromises.readFile(dataFilePath, 'utf-8');
    let restaurants = JSON.parse(jsonData);
    console.log(restaurants);
    return(restaurants);
}

app.get('/data', (req, res)=>{
    getJson()
        .then(data => res.send(data));
});

app.get('/', (req, res)=>{
    res.send('Asynchronous Javascript Practice');
})

app.listen(3000, (err)=>(err) ? err : console.log(`server up and running on port ${port}`))