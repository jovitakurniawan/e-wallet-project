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



// Create new top up data 
exports.postTopUp = (req,res) => {

    const data = {
        user_id: req.body[0].user_id,
        topup_amt: req.body[0].topup_amt,
        balance_id: req.body[0].balance_id
    };

    const query = `INSERT INTO tb_topup (user_id, topup_amt, balance_id) 
    VALUES (?, ?, ?)`;

    conn.query(query, Object.values(data), (err) => {
        if (err){
            console.log(err);
        }
    });

    // missing logic: restrict negative value input for topup amount 
    const topupAmount = req.body[0].topup_amt;
    const userId = req.body[0].user_id;

    const currBalance = `SELECT * FROM tb_balance WHERE user_id = ${userId}`;
    conn.query(currBalance, (err, result) => {
        if (!err){

            let user_curr_bal = result[0].current_balance + topupAmount;

            const updateBalance = `UPDATE tb_balance 
            SET current_balance = ${user_curr_bal}
            WHERE user_id = ${userId}`;
    
            conn.query(updateBalance, Object.values(user_curr_bal), (err) =>{
                if (!err) {

                    const returnBalance = `SELECT tu.topup_date, 
                    tu.balance_id, tb.user_id, 
                    ts.first_name, ts.last_name, ts.phone_no, 
                    tu.topup_amt, tb.current_balance 
                    FROM tb_balance tb
                    JOIN tb_topup tu 
                    ON tb.balance_id = tu.balance_id
                    JOIN tb_user ts
                    ON ts.user_id = tb.user_id
                    WHERE tb.user_id =  ${userId} 
                    AND tu.topup_date = tb.last_updated;`;
    
                    conn.query(returnBalance, (err, result) => {
                        if (!err) {
                            res.json({status: "success", message: "Successsfully Topup User Wallet", data: result});

                        } else {
                            res.json({status: "failure", code: err.code, message: err.message});

                        }
                    })
    
                } else {
                    console.log(err)
                }
            });
    
        } else {
            console.log(err);
        }
    });

};
