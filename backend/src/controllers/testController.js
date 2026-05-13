// @desc    Test GET route
// @route   GET /api/test
// @access  Public
const testGet = (req, res) => {
  res.status(200).json({
    success: true,
    message: "GET request to /api/test was successful!"
  });
};

// @desc    Test POST route
// @route   POST /api/test
// @access  Public
const testPost = (req, res) => {
  const data = req.body;
  res.status(200).json({
    success: true,
    message: "POST request to /api/test was successful!",
    receivedData: data
  });
};

module.exports = {
  testGet,
  testPost
};
