const express = require('express');
const conn = require('../db/index');
const balanceAPI = require("../controllers/balance");
const userAPI = require("../controllers/user");
const transferAPI = require("../controllers/transfer");
const topupAPI = require("../controllers/topup");
const withdrawAPI = require("../controllers/withdraw");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({test: 'test'});
});

// User API routes 
router.route("/api/user/get/UserDetail/All").get(userAPI.getAllUserDetail);
router.route("/api/user/get/UserDetail/ById/:email_address").get(userAPI.getUserDetailById);
router.route("/api/user/get/UserDetail/ByPhone/:phone_no").get(userAPI.getUserDetailByPhone);
router.route("/api/user/post/NewUser").post(userAPI.postNewUserv2);
router.route("/api/user/delete/User/ById/:user_id").delete(userAPI.deleteUserById);

// Balance API routes
router.route("/api/balance/get/Balance/ById/:user_id").get(balanceAPI.getUserBalanceById);

// Topup API routes 
router.route("/api/topup/get/History/ById/:user_id").get(topupAPI.getTopupHistoryById);
router.route("/api/topup/post/TopUp").post(topupAPI.postTopUp);

// Withdraw API routes 
router.route("/api/withdraw/get/History/ById/:user_id").get(withdrawAPI.getWithdrawHistoryById);
router.route("/api/withdraw/post/Withdraw").post(withdrawAPI.postWithdraw);

// Transfer API routes 
router.route("/api/transfer/get/TransferHistory/BySenderId/:user_id").get(transferAPI.getSenderTrfHist);
router.route("/api/transfer/get/TransferHistory/ByRecipientId/:user_id").get(transferAPI.getRecipientTrfHist);
router.route("/api/transfer/post/Transfer").post(transferAPI.postTransfer);

module.exports = router; 

