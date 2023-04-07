const express = require('express');
const authController = require('./../controllers/authController');
const adminController = require('./../controllers/adminController');

const router = express.Router();

router
  .route('/delete-discussion')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.deleteDiscussion
  );

router
  .route('/delete-message')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.deleteMessage
  );

router
  .route('/all-chats')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.allChats
  );

module.exports = router;
