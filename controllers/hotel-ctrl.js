const Hotel = require("../models/hotel-model");

const getHotels = (req, res) => {
  Hotel.find()
    .then((hotels) => {
      if (hotels) {
        console.log("Hotels exist");
        return res.status(200).json({
          hotels: hotels,
        });
      } else {
        console.log("Hotels doesn't exist");
        return res.status(200).json({
          hotels: [],
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching hotels", error.message);
    });
};

module.exports = {
  getHotels,
};
