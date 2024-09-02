import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded ({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST request for temp conversion
app.post('/convert', (req, res) => {
    setTimeout(() => {
      const fahrenheit = parseFloat(req.body.fahrenheit);
      const celsius = (fahrenheit - 32) * (5 / 9);
  
      res.send(`
        <p>
          ${fahrenheit} degrees Farenheit is equal to ${celsius.toFixed(2)} degrees Celsius
        </p>
      `);
    }, 2000);
  });
  
// Start the server
app.listen (3000, () => {
console. log('Server listening on port 3000');
});
