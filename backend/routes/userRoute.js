const express = require('express');
const { getData, registerUser, loginUser, logout, addData, isAuth } = require('../controllers/userController');
const isaunthenticated = require('../middleware/auth');

const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(isaunthenticated,logout);
router.route('/getdata').get(isaunthenticated,getData);
router.route('/adddata').put(isaunthenticated,addData);
router.route('/islogin').get(isAuth);

module.exports = router;
