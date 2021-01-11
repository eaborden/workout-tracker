const { Router } = require('express');
const router = Router();

// const router = require ('express').Router; 
//const app = express(); 
var path = require("path");

  router.get("/exercise", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  })

  router.get('/stats', (_req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
  })

  module.exports = router;