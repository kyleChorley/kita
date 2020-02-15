const express = require("express");
const router = express.Router();
//const Project = require("../models/Project");
const axios = require("axios");
const Kita = require("../models/Kita");
const User = require("../models/User");

router.get("/myfavorites", (req, res) => {
  User.findById(req.user._id)
    .populate("kitas")
    .then(user => {
      console.log(user.kitas[user.kitas.length - 1]);
      res.json(user);
    });
});

router.post("/favorites", (req, res) => {
  console.log(req.body);
  // const { title, image, price, num_reviews, stars, kita_id } = req.body;
  Kita.create({ ...req.body }).then(
    // Kita.create({ title, image, price, num_reviews, stars, kita_id }).then(
    response => {
      const kitaId = response._id;
      // ADD KITA TO FAVORITES LIST OF USER
      // $PUSH ADDS TO MONGO ARRAY
      User.findByIdAndUpdate(req.user._id, {
        $push: { kitas: kitaId }
      }).then(responseFromDB => {
        console.log(responseFromDB.kitas[responseFromDB.kitas.length - 1]);
        // console.log("all good");
        res.json({ message: "Kita Successfully added to favorites" });
      });
    }
  );
});

router.put("/favorites", (req, res) => {
  const { kita_id } = req.body;
  // INFO FROM  FRONT END. ONLY RELEVANT INFORMATION IS AMAZON ID
  User.findById(req.user._id)
    .populate("kitas")
    // POPULATE GETS THE ARRAY WITH ALL THE KITAS THERE
    .then(userInfo => {
      // THIS FILTER IS GOING TO RETURN JUST THE OBJECT THAT WERE TRYING TO REMOVE FROM THE USER FAVORITES ARRAY
      const [kitaToDelete] = userInfo.kitas.filter(
        el => el.kita_id === kita_id
      );
      // AND NOW WERE GOING TO REMOVE SAID KITA FROM THE USER KITAS ARRAY
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { kitas: kitaToDelete._id }
        },
        { new: true }
      ).then(updatedUser => {
        // MESSAGE OF SUCCESS SENT TO USER
        res.json({ message: "Kita Removed From Favorites" });
        // KITA NO LONGER RELEVANT ENOUGH TO KEEP IN DATABASE. TIME TO DELETE
        Kita.findByIdAndDelete(kitaToDelete._id).then(deletedSuccess => {
          // HERE IT SAYS THAT SAID KITA WAS DELETED
          console.log("deletedSuccess");
        });
      });
    });
});

module.exports = router;
