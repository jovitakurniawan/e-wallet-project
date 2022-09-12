const conn = require("../db/index");

// 1. User Related APIs 

// api/user/get/alluserdetail - TESTED
exports.getAllUserDetail = (req, res) => {
    const query = 'SELECT * FROM tb_user';
    
    conn.query(query, (err, result) => {
        if (!err){
            // console.log(result);
            res.json(result);
        } else {
            res.json(err);
            // console.log(err);
        }
    });
};

// api/user/get/userdetailbyid - TESTED
exports.getUserDetailById = (req, res) => {
    const query = "SELECT * FROM tb_user WHERE user_id = ?";
    
    conn.query(query, [req.params.user_id], (err, result) => {
        if (!err){
            // console.log(result);
            res.json(result);
        } else {
            res.json(err);
            console.log(req.body);
            // console.log(err);
        }
    });
};

// api/user/post/newuser - TESTED

exports.postNewUser = (req, res) => {

    const data = {
        email_address: req.body[0].email_address,
        user_password: req.body[0].user_password,
        first_name: req.body[0].first_name,
        last_name: req.body[0].last_name,
        phone_no: req.body[0].phone_no
    };

    const query = `INSERT INTO tb_user (email_address, user_password, 
    first_name, last_name, phone_no, created_date) VALUES (?, ?, ?, ?, ?, NOW())`;

    conn.query(query, Object.values(data), (err) => {
        if (!err){
            res.json({status: "success", message: "Successsfully Created A New User", data: data});
            console.log(req.body);
        } else {
            res.json({status: "failure", code: err.code, message: err.message});
        }
    });

};

// api / delete / user account 
// [PENDING UPDATE] delete all data with corresponding user id in other tables

exports.deleteUserById = (req, res) => {
    const query = "DELETE FROM tb_user WHERE user_id = ?";
    
    conn.query(query, [req.params.user_id], (err, result) => {
        if (!err){
            // console.log(result);
            res.json({status:"success", message:"successfully removed account", result:result});
            console.log(req.body);
        } else {
            res.json(err);
            console.log(req.body);
            // console.log(err);
        }
    });
};