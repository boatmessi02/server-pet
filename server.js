const express = require('express');
const app = express();

//routes

app.get('/', (req,res) => {
    res.send('Hello World');
}) 

app.listen(3001, () => {
    console.log('Node api app is running 3001');
})