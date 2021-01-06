require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 7000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const PWD = process.env.DB_PASSWORD;
const databaseUrl = `mongodb+srv://Andre2020:${encodeURIComponent(
  PWD
)}@primarycluster.o092b.mongodb.net/BudgetTracker`;
mongoose.connect(process.env.MONGODB_URI || databaseUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
