"use strict";

const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGODB, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(" * DB Connected * ");
};

module.exports = connectDB;