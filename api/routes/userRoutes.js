const express = require('express');
const validateData = require('../validation/userValidation');

const router = express.Router();

let users = [];

router.post('/register', (req, res) => {
  const userData = req.body;
  const validationError = validateData(userData);
  if (validationError) {
    return res.status(400).json({ messages: validationError });
  }

  users.push(userData);
  res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: userData });
});


router.get('/users', (req, res) => {
  res.status(200).json(users);
});

module.exports = router;
