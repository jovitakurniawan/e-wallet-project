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
            console.log(err);
        }
    });
};

// api/user/get/userdetailbyid - TESTED
exports.getUserDetailById = (req, res) => {
    const query = "SELECT * FROM tb_user WHERE email_address = ?";
    
    conn.query(query, [req.params.email_address], (err, result) => {
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

exports.getUserDetailByPhone = (req, res) => {
    const query = "SELECT * FROM tb_user WHERE phone_no = ?";
    
    conn.query(query, [req.params.phone_no], (err, result) => {
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

    // const balance_query = `INSERT INTO tb_balance (user_id, )`

};

exports.postNewUserv2 = (req, res) => {

    const data = {
        email_address: req.body[0].email_address,
        user_password: req.body[0].user_password,
        first_name: req.body[0].first_name,
        last_name: req.body[0].last_name,
        phone_no: req.body[0].phone_no
    };

    const query = `INSERT INTO tb_user (email_address, user_password, 
    first_name, last_name, phone_no) VALUES (?, ?, ?, ?, ?)`;

    conn.query(query, Object.values(data), (err) => {
        if (!err){
            // res.json({status: "success", message: "Successsfully Created A New User", data: data});
            console.log(req.body);
        } else {
            // res.json({status: "failure", code: err.code, message: err.message});
            console.log(err);
        }
    });

    // After new user is created, we need to create balance record for new user 
    const new_user = `SELECT * FROM tb_user WHERE email_address = "${req.body[0].email_address}"`;

    conn.query(new_user, (err, result) => {
    if (!err) {
        let new_user_id = result[0].user_id;
        console.log(result)

        // Query to create new user_balance 
        const create_balance =  `INSERT INTO tb_balance (user_id) VALUES (${new_user_id})`;
        
        conn.query(create_balance, Object.values(new_user_id), (err, result) => {
           if (!err) {

            console.log("Successfully created user balance");

                // Query to return new user's current_balance 
                const return_user_bal = `SELECT * FROM tb_balance WHERE user_id = ${new_user_id}`;

                    conn.query(return_user_bal, (err, result) => {
                        if (!err) {
                            // user_balance 
                            let user_balance = result[0].current_balance;

                            console.log(user_balance);

                            // API response 
                            res.json({status: "success", message: "Successsfully Created A New User", current_balance: user_balance})
                        } else {
                            console.log(err);
                            res.json({status: "failure", code: err.code, message: err.message});
                        }
                    });
           } else {
            console.log(err);
           }
        });
        console.log(new_user_id);
    } else {
        console.log(err);
    }
    });
};


// api / delete / user account 

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