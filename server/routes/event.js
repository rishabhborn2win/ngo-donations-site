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

  event
    .save()
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
  let _id = req.params.id;
  const data = req.body ?? {};  // if data not passed in body, then simply don't make any changes
  Event.findByIdAndUpdate(_id, { ...data }, () => { // will fail for malicious inputs
    console.log("data updated");
  });
  res.send("updated");
});

//Delete Event
router.delete("/delete/:id", limiter, (req, res, next) => {
  let _id = req.params.id;
  Event.findByIdAndRemove(_id, () => {
    console.log("Event deleted successfully");
  });
  res.send("Deleted");
});

//@desc filter the events
//@method POST
//@security Public

router.post("/filter", async (req, res) => {
  var { start, endDate, location } = req.body;

  if (!start) res.send("Start date is req.");
  if (!endDate) res.send("EndDate is Required");
  if (!location) res.send("Location is required");
  try {
    const response = await Event.find({
      startDate: {
        $gte: start,
      },
      endDate: {
        $lte: endDate,
      },
      region: location,
    });
    if (response.length === 0) res.send("NO EVENT FOUND");
    res.json(response);
  } catch (error) {
    console.log(error.message || error.code);
  }
});

//@desc search the events by name
//@method POST
//@security Public
router.post('/search', async (req, res) => {
  var {search} = req.body;
  try {
    const response = await Event.find({"name": search});
    if(!response) return res.status(200).json({msg: "No search found!"});
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message || error.code);
  }
})

module.exports = router;
