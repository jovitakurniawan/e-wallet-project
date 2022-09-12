const conn = require("../db/index");

// 2. Balance Related API 

// api get balance by uid
exports.getUserBalanceById = (req, res) => {
    const query = `SELECT u.user_id, u.first_name, 
    u.last_name, b.balance_id, b.current_balance, b.last_updated
    FROM tb_balance b
    INNER JOIN tb_user u 
    ON b.user_id = u.user_id
    WHERE u.user_id = ?`;
    
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

// update user balance 
