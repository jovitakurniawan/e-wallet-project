const conn = require("../db/index");

// 3. Topup related API 

// Top up history TESTED
exports.getTopupHistoryById = (req, res) => {
    const query = `SELECT u.first_name, u.last_name, u.user_id, b.balance_id, 
    b.current_balance, b.last_updated, 
    tu.topup_amt, tu.topup_date
    FROM tb_topup tu
    JOIN tb_balance b
    ON tu.balance_id = b.balance_id
    JOIN tb_user u 
    ON tu.user_id = u.user_id
    WHERE tu.user_id = ?`;
    
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


// Update balance 
exports.updateBalanceById = (req,res) => {
    const query = `SELECT u.first_name, u.last_name, u.user_id, b.balance_id, 
    b.current_balance, b.last_updated, 
    tu.topup_amt, tu.topup_date
    FROM tb_topup tu
    JOIN tb_balance b
    ON tu.balance_id = b.balance_id
    JOIN tb_user u 
    ON tu.user_id = u.user_id
    WHERE tu.user_id = ?`;
    
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

// Create new top up data 
exports.postTopUp = (req,res) => {
    const data = {
        user_id: req.body[0].user_id,
        topup_amt: req.body[0].topup_amt,
        balance_id: req.body[0].balance_id
    };

    const query = `INSERT INTO tb_topup (user_id, topup_amt, topup_date, balance_id) 
    VALUES (?, ?, NOW(), ?)`;

    conn.query(query, Object.values(data), (err) => {
        if (!err){
            res.json({status: "success", message: "Successsfully Topup User Wallet", data: data});
            console.log(req.body);
        } else {
            res.json({status: "failure", code: err.code, message: err.message});
            console.log(req.body);
        }
    });

    const topupAmount = req.body[0].topup_amt;
    console.log(topupAmount);
    const userId = req.body[0].user_id;
    console.log(userId);

    const currBalance = `SELECT current_balance FROM tb_balance WHERE user_id = ${userId}`;
    conn.query(currBalance, (err, result) => {
        if (!err){
            console.log(result, typeof(result));
        } else {
            console.log(err);
        }
    });

    // console.log(currBalance);

};

