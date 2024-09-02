import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//requests are sent and responses are recieved in JSON
app.use(express.json());


let currentPrice = 60;
app.get('/get-price',(req,res)=>{
currentPrice = currentPrice + Math.random() * 2 - 1;
res.send('$' + currentPrice.toFixed(1))
});

//Specify the post the server will run on
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


