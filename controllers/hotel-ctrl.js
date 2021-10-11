getHotels = (req, res) => {
  return res.status(200).json({
    hotels: ["h1", "h2", "h3"],
  });
};

module.exports = {
  getHotels,
};
