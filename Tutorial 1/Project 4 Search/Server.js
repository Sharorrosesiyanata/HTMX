import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded ({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

  const contacts = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Williams', email: 'bob@example.com' },
    { name: 'Mary Harris', email: 'mary@example.com' },
    { name: 'David Mitchell', email: 'david@example.com' },
  ];
  
  // Handle POST request for contacts search
  app.post('/search', (req, res) => {
    const searchTerm = req.body.search.toLowerCase();
  
    if (!searchTerm) {
      return res.send('<tr></tr>');
    }
  
    const searchResults = contacts.filter((contact) => {
      const name = contact.name.toLowerCase();
      const email = contact.email.toLowerCase();
  
      return name.includes(searchTerm) || email.includes(searchTerm);
    });
  
    setTimeout(() => {
      const searchResultHtml = searchResults
        .map(
          (contact) => `
        <tr>
          <td><div class="my-4 p-2">${contact.name}</div></td>
          <td><div class="my-4 p-2">${contact.email}</div></td>
        </tr>
      `
        )
        .join('');
  
      res.send(searchResultHtml);
    }, 1000);
  });
  
  // Handle POST request for contacts search from jsonplaceholder
  app.post('/search/api', async (req, res) => {
    const searchTerm = req.body.search.toLowerCase();
  
    if (!searchTerm) {
      return res.send('<tr></tr>');
    }
  
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const contacts = await response.json();
  
    const searchResults = contacts.filter((contact) => {
      const name = contact.name.toLowerCase();
      const email = contact.email.toLowerCase();
  
      return name.includes(searchTerm) || email.includes(searchTerm);
    });
  
    setTimeout(() => {
      const searchResultHtml = searchResults
        .map(
          (contact) => `
        <tr>
          <td><div class="my-4 p-2">${contact.name}</div></td>
          <td><div class="my-4 p-2">${contact.email}</div></td>
        </tr>
      `
        )
        .join('');
  
      res.send(searchResultHtml);
    }, 1000);
  });
  
// Start the server
app.listen (3000, () => {
console. log('Server listening on port 3000');
});
