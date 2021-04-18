const router = require("express").Router();
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const Event = require("../models/event");

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
});

var string = require("string-sanitizer");
var sanitizer = require("sanitize")();

//Get all the events
router.get("/", async (req, res, next) => {
  const response = await Event.find({});
  res.send(response);
});

//Create a new Event
router.post("/", (req, res, next) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),

    name: req.body.name,
    description: req.body.description,
    region: req.body.region,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  event.save()
    .then(() => {
      console.log(event);
      res.send("Event Added Successfully");
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

// Edit Event
router.post("/update/:id", limiter, (req, res, next) => {
  let _id  = req.params.id;
  Event.findByIdAndUpdate(_id, string.sanitize(req.body), () => {
    console.log("data updated");
  });
  res.send("updated");
});

//Delete Event
router.delete("/delete/:id", limiter, (req, res, next) => {
  let _id  = req.params.id;
  Event.findByIdAndRemove(_id, () => {
    console.log("Event deleted successfully");
  });
  res.send("Deleted");
});

// this route won't execute if correct route is accessed
// router.get("", (req, res, next) => {
//   res.send("Get request handled by event page");
// });

//@desc filter the events
//@method POST
//@security Public

router.post("/filter", async (req, res) => {
  var start = req.body.startDate;
  if(!start) res.send("Start date is req.")
  var endDate = req.body.endDate;
  if(!endDate) res.send("EndDate is Required");
  var location = req.body.location;
  if(!location) res.send("Location is required");
  try {
    const response = await Event.find()
          .where('startDate').gte(start)
          .where('endDate').lte(start)
          .where('region', location);

    if (response.length === 0) return res.send("NO EVENT FOUND");

    res.send(response);
  } catch (error) {
    console.log(error.message || error.code);
  }
});

module.exports = router;
