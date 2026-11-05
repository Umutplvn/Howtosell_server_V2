"use strict";

const sendEmail = require("../helpers/sendEmail");
const User = require("../models/user");
const Admin = require("../models/admin");
const confirmationEmail = require("../helpers/confirmationEmail");

/* -------------------------------------------------------
    EXPRESSJS - How To Sell Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const fields = [
      "name", "email", "phone", "companyName", "companyWebsite",
      "role", "teamSize", "investment", "when", "challenge"
    ];
    const requiredFields = fields.filter(field => field !== "companyWebsite");
    const dataToSave = Object.fromEntries(
      fields.map(field => [field, typeof req.body?.[field] === "string" ? req.body[field].trim() : ""])
    );

    if (requiredFields.some(field => !dataToSave[field])) {
      return res.status(400).send({ error: true, message: "Please complete all required fields." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataToSave.email)) {
      return res.status(400).send({ error: true, message: "Please provide a valid email address." });
    }

    try {
      const data = await User.create(dataToSave);

      // Notify Babar and confirm receipt to the applicant.
      // A mail delivery failure should not cause the saved application to be submitted twice.
      const mailResults = await Promise.allSettled([
        sendEmail(dataToSave),
        confirmationEmail(dataToSave.email, dataToSave.name),
      ]);
      mailResults.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(index === 0 ? "Lead notification failed:" : "Confirmation email failed:", result.reason);
        }
      });

      return res.status(201).send({ error: false, result: data });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).send({ error: true, message: "An error occurred while processing your request." });
    }
  },

  update: async (req, res) => {
    const { updateData } = req.body;
    const { userId } = req.params;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true, runValidators: true }
    );
    res.status(202).send({
      error: false,
      result: updatedUser,
    });
  },

  delete: async (req, res) => {
    const { userId } = req.body;
    const data = await User.deleteOne({ _id: userId });

    if (data.deletedCount >= 1) {
      res.send({
        message: "Successfully deleted",
      });
    } else {
      res.send({
        message: "There is no recording to be deleted.",
      });
    }
  },

  list: async (req, res) => {
    const data = await req.getModelList(User);
    const user = req.user;
    const isAdmin = await Admin.findOne({ _id: user });

    if (isAdmin.authorization) {
      res.status(200).send({
        error: false,
        count: data.length,
        result: data,
      });
    } else {
      res.status(200).send({
        error: false,
        result: "You have no authorization to see this page!",
      });
    }
  },
};
