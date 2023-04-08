const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Ctf = require('../models/ctfModel');
const AppError = require('../utils/appError');

exports.createCtf = catchAsync(async (req, res, next) => {
  const { heading, description, flag, link, hint } = req.body;
  const newCtf = await Ctf.create({
    host: req.user._id,
    heading: heading,
    description: description,
    flag: flag,
    link: link,
    hint: hint,
  });
  if (!newCtf) {
    return next(new AppError('Please Try again', 401));
  }
  res.status(201).json({
    status: 'sucess',
    data: newCtf,
  });
});

exports.flagSubmission = catchAsync(async (req, res, next) => {
  const { flag, ctfId } = req.body;
  const solve = await Ctf.findById(ctfId);
  if (solve.flag === flag) {
    const done = await Ctf.findByIdAndUpdate(ctfId, {
      $push: { fusers: req.user._id },
    });
    if (!done) {
      return next(new AppError('Please Try again', 401));
    }
    return res.status(201).json({
      status: 'success',
      message: 'Greetings, You sucessfully found the flag',
    });
  }
  res.status(401).json({
    status: 'fail',
    message: 'Entered Flag is not correct, Please try again',
  });
});
