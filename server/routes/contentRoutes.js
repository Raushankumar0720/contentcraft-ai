const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// All API Endpoints (MANDATORY)
router.post('/generate', contentController.generateContent);
router.post('/ask', contentController.askQuestion);
router.post('/ideas', contentController.generateIdeas);
router.post('/improve', contentController.improveContent);

module.exports = router;
