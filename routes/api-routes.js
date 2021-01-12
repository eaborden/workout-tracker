// const { Router } = require('express');
// const router = Router();
const router = require("express").Router();

//const express = require ('express'); 
//const router = require ('express').Router(); 
const db = require("../models");
const Workout = require('../models/workoutModel');

router.get("/api/workouts", (req, res) => {
  console.log("this is line 10")
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
    .catch((err) => {
      res.json(err);
    });
  });

router.put('/api/workouts/:id', ({ body, params }, res) => {
      db.Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        // "runValidators" will ensure new exercises meet our schema requirements
        { new: true, runValidators: true }
      )
        .then((dbWorkout) => {
          res.json(dbWorkout);
        })
        .catch((err) => {
          res.json(err);
        });
    });

router.post('api/workouts', (req, res) => {     
  db.Workout.create(req.body)
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;