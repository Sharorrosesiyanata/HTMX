const express = require('express');

const router = express.Router();

const contacts = [
  { id: 1, name: 'Pretoria Girls High', email: 'info@phsg.org.za' },
  { id: 2, name: 'Crawford International', email: 'fourways@crawfordinternational.co.za' },
  { id: 3, name: 'Courtney House International School', email: 'info.courtney@curro.co.za' },
  { id: 4, name: 'Cambridge High School', email: 'office@cambridgehs.co.za' },
  { id: 5, name: 'Hoërskool Brandwag', email: 'ontvangs@hsbrandwag.co.za I' },
  { id: 6, name: 'King David ', email: 'kdinfo@kingdavid.org.za' },
  { id: 7, name: 'King Edward VII ', email: 'info@kes.co.za' },
  { id: 8, name: 'Waverley Girls High School', email: 'wghs@mweb.co.za' },
  { id: 9, name: 'The Glen High School', email: 'admin@theglenhighschool.co.za' },
  { id: 10, name: 'CornerStone College', email: 'info@cornerstone.ac.za' },
];
// Function for default page
// GET /contacts
router.get('/contacts', (req, res) => {
  res.render('index', { action: '', contacts, contact: {} });
});
//To put in a new contact
// GET /contacts/new
router.get('/contacts/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { contact: {} });
  } else {
    res.render('index', { action: 'new', contacts, contact: {} });
  }
});
//show details of the contact on the left
// GET /contacts/1
router.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('contact', { contact });
  } else {
    res.render('index', { action: 'show', contacts, contact });
  }
});
//edit the contact
// GET /contacts/1/edit
router.get('/contacts/:id/edit', (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('form', { contact });
  } else {
    res.render('index', { action: 'edit', contacts, contact });
  }
});

// POST /contacts
router.post('/contacts', (req, res) => {
  const newContact = {
    id: contacts.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  contacts.push(newContact);

  if (req.headers['hx-request']) {
    res.render('sidebar', { contacts }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">School was successfully added!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', contacts, contact: {} });
  }
});
// updating the contact
// PUT /contacts/1
router.put('/update/:id', (req, res) => {
  const { id } = req.params;

  const newContact = {
    id: Number(id),
    name: req.body.name,
    email: req.body.email,
  };

  const index = contacts.findIndex((c) => c.id === Number(id));

  if (index !== -1) contacts[index] = newContact;

  if (req.headers['hx-request']) {
    res.render('sidebar', { contacts }, (err, sidebarHtml) => {
      res.render('contact', { contact: contacts[index] }, (err, contactHTML) => {
        const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">School was successfully updated!</p>
            ${contactHTML}
          </main>
        `;

        res.send(html);
      });
    });
  } else {
    res.redirect(`/contacts/${index + 1}`);
  }
});

// DELETE /contacts/1
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex((c) => c.id === Number(id));

  if (index !== -1) contacts.splice(index, 1);
  if (req.headers['hx-request']) {
    res.render('sidebar', { contacts }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">School was successfully deleted!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.redirect('/contacts');
  }
});

module.exports = router;