const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listeners for successful connection and error
db.on("connected", () => {
  console.log("MongoDB connection is successful");
});

db.on("error", (error) => {
  console.error("Error in MongoDB connection", error);
});

// Export the connected mongoose instance
module.exports = mongoose;
