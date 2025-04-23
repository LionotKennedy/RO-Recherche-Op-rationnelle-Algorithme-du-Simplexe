const express = require('express');
const router = express.Router();
const simplexController = require('../controllers/simplexController');

/**
 * @route POST /api/solve
 * @desc Solve a linear programming problem
 * @access Public
 */
router.post('/solve', simplexController.solveSimplexProblem);

module.exports = router;