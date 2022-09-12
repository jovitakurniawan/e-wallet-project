const conn = require("../db/index");

// 4. Transfer Related API 

// Transfer history - sender TESTED
exports.getSenderTrfHist = (req, res) => {
    const query = `SELECT 
    tf.transfer_id, tf.transfer_amt, 
    tf.transfer_date,
    tf.sender_id, us.first_name as sender_fname, 
    us.last_name as sender_lname, 
    tf.sender_phone_no, 
    bs.balance_id, 
    bs.current_balance, bs.last_updated, 
    tf.recipient_id, ur.first_name as recipient_fname, 
    ur.last_name as recipient_lname, 
    tf.recipient_phone_no, 
    br.balance_id, 
    br.current_balance, br.last_updated
    FROM tb_transfer tf 
    JOIN tb_user us
    ON tf.sender_id  = us.user_id
    JOIN tb_user ur
    ON tf.recipient_id = ur.user_id
    JOIN tb_balance br
    ON tf.recipient_balance_id  = br.balance_id
    JOIN tb_balance bs
    ON tf.sender_balance_id  = bs.balance_id
    WHERE tf.sender_id = ?`;
    
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



// Transfer history - recipient TESTED

exports.getRecipientTrfHist = (req, res) => {
    const query = `SELECT 
    tf.transfer_id, tf.transfer_amt, 
    tf.transfer_date,
    tf.recipient_id, ur.first_name as recipient_fname, 
    ur.last_name as recipient_lname, 
    tf.recipient_phone_no, 
    br.balance_id, 
    br.current_balance, br.last_updated, 
    tf.sender_id, us.first_name as sender_fname, 
    us.last_name as sender_lname, 
    tf.sender_phone_no, 
    bs.balance_id, 
    bs.current_balance, bs.last_updated
    FROM tb_transfer tf 
    JOIN tb_user us
    ON tf.sender_id  = us.user_id
    JOIN tb_user ur
    ON tf.recipient_id = ur.user_id
    JOIN tb_balance br
    ON tf.recipient_balance_id  = br.balance_id
    JOIN tb_balance bs
    ON tf.sender_balance_id  = bs.balance_id
    WHERE tf.recipient_id = ?`;
    
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

// Create new transfer data 
exports.postTransfer = (req,res) => {
    const data = {
        transfer_amt: req.body[0].transfer_amt,
        sender_id: req.body[0].sender_id,
        sender_phone_no: req.body[0].sender_phone_no,
        recipient_id: req.body[0].recipient_id,
        recipient_phone_no: req.body[0].recipient_phone_no,
        sender_balance_id: req.body[0].sender_balance_id,
        recipient_balance_id: req.body[0].recipient_balance_id
    };

    const query = `INSERT INTO tb_transfer (transfer_amt, sender_id, 
    sender_phone_no, recipient_id, recipient_phone_no,
    sender_balance_id, recipient_balance_id, transfer_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

    conn.query(query, Object.values(data), (err) => {
        if (!err){
            res.json({status: "success", message: "Successsfully Transfer Funds", data: data});
            console.log(req.body);
        } else {
            res.json({status: "failure", code: err.code, message: err.message});
        }
    });
};

// Update balance of both sender & recipient 

