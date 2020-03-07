const db = require("../models");

module.exports = app => {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", function (req, res) {
        db.Workout.find({}, {}, { sort: { _id: -1 } }).limit(7)
            .then(dbWorkouts => {
                res.json(dbWorkouts.reverse());
            })
            .catch(err => {
                res.status(404).json(err);
            });
    });

}