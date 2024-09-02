const express = require('express');

const router = express.Router();

const recipes = [
  { id: 1, ingredients: 'YellowRice', preparationTime: '30 Minutes' },
  { id: 2, ingredients: 'Turkey', preparationTime: '1 Hour' },
  { id: 3, ingredients: 'ChickenStew', preparationTime: '45 Minutes' },
  { id: 4, ingredients: 'AfricanPorridge', preparationTime: '30 Minutes' },
  { id: 5, ingredients: 'Tea', preparationTime: '5 Minutes' },
];

// GET /recipes
router.get('/recipes', (req, res) => {
  res.render('index', { action: '', recipes, recipe: {} });
});

// GET /recipes/new
router.get('/recipes/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { recipe: {} });
  } else {
    res.render('index', { action: 'new', recipes, recipe: {} });
  }
});

// GET /recipes/1
router.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('recipes', { recipe });
  } else {
    res.render('index', { action: 'show', recipes, recipe });
  }
});

// GET /recipes/1/edit
router.get('/recipes/:id/edit', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('form', { recipe });
  } else {
    res.render('index', { action: 'edit', recipes, recipe });
  }
});

// POST /recipes
router.post('/recipes', (req, res) => {
  const newRecipe = {
    id: recipes.length + 1,
    ingredients: req.body.ingredients,
    preparationTime: req.body.preparationTime,
  };

  contacts.push(newRecipe);

  if (req.headers['hx-request']) {
    res.render('sidebar', { recipes }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">Recipe was successfully added!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', recipes, recipe: {} });
  }
});

// PUT /recipes/1
router.put('/update/:id', (req, res) => {
  const { id } = req.params;

  const newRecipe = {
    id: Number(id),
    ingredients: req.body.ingredients,
    preparationTime: req.body.preparationTime,
  };

  const index = recipes.findIndex((c) => c.id === Number(id));

  if (index !== -1) recipes[index] = newRecipe;

  if (req.headers['hx-request']) {
    res.render('sidebar', { recipes }, (err, sidebarHtml) => {
      res.render('recipe', { recipe: recipes[index] }, (err, contactHTML) => {
        const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">Recipe was successfully updated!</p>
            ${contactHTML}
          </main>
        `;

        res.send(html);
      });
    });
  } else {
    res.redirect(`/recipes/${index + 1}`);
  }
});

// DELETE /recipes/1
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = recipes.findIndex((c) => c.id === Number(id));

  if (index !== -1) recipes.splice(index, 1);
  if (req.headers['hx-request']) {
    res.render('sidebar', { recipes }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">Recipe was successfully deleted!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.redirect('/recipes');
  }
});

module.exports = router;