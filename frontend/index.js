const express = require('express');
const app = express();
// const router = require('../backend/routes/index');
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const { response } = require('express');

// middleware for parsing json objects
app.use(express.json());

// middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// to enable ejs template use 
app.set("view engine", "ejs");

// specify css as static files
app.use(express.static("public"));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// var session - not recommended to store user session like this. 
var cookiesSession;

// Render pages when user enter the link on the browser 
app.get("/login", function(req,res){
    res.render("login");
    cookiesSession = req.session;
});

app.get("/", function(req,res){
    res.render("login");
    cookiesSession = req.session;
});


app.get("/register", function(req,res){
    res.render("register");
});


app.get("/home", function(req,res){
    cookiesSession = req.session;
    let myName = req.session.first_name;
    let myUID = req.session.user_id;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    fetch(`http:localhost:3000/api/balance/get/Balance/ById/${myUID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let myBalanceId = result[0].balance_id;
            let myCurrentBal = result[0].current_balance;

            cookiesSession = req.session;
            cookiesSession.balance_id = myBalanceId;

            res.render("home", {myName: myName, myCurrentBal: myCurrentBal});

        })
        .catch(error => console.log('error', error));

});


app.get("/topup", function(req,res){
    cookiesSession = req.session;
    let myName = req.session.first_name;
    let myUID = req.session.user_id;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    fetch(`http:localhost:3000/api/balance/get/Balance/ById/${myUID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let myBalanceId = result[0].balance_id;
            let myCurrentBal = result[0].current_balance;

            cookiesSession = req.session;
            cookiesSession.balance_id = myBalanceId;

            res.render("topup", {myName: myName, myCurrentBal: myCurrentBal});

        })
        .catch(error => console.log('error', error));
    // res.render("topup");
});

app.get("/withdraw", function(req,res){
    // res.render("withdraw");
    cookiesSession = req.session;
    let myName = req.session.first_name;
    let myUID = req.session.user_id;
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    fetch(`http:localhost:3000/api/balance/get/Balance/ById/${myUID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let myBalanceId = result[0].balance_id;
            let myCurrentBal = result[0].current_balance;

            cookiesSession = req.session;
            cookiesSession.balance_id = myBalanceId;

            res.render("withdraw", {myName: myName, myCurrentBal: myCurrentBal});

        })
        .catch(error => console.log('error', error));
});

app.get("/transfer", function(req,res){
    // res.render("transfer");
    cookiesSession = req.session;
    let myName = req.session.first_name;
    let myUID = req.session.user_id;
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    fetch(`http:localhost:3000/api/balance/get/Balance/ById/${myUID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let myBalanceId = result[0].balance_id;
            let myCurrentBal = result[0].current_balance;

            cookiesSession = req.session;
            cookiesSession.balance_id = myBalanceId;

            res.render("transfer", {myName: myName, myCurrentBal: myCurrentBal});

        })
        .catch(error => console.log('error', error));
});


// 1. Login Page API Call 
// GET to check user credential. After user successfully login, redirect to /home page. Else, stay on /login page 

app.post("/login", (req,res) => {

    let emailAddress = req.body.email_address;
    let userPassword = req.body.user_password;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:3000/api/user/get/UserDetail/ById/${emailAddress}`, requestOptions)
        .then(response => response.json())
        .then(
            result => {

                let resEmail = result[0].email_address;
                let resPass = result[0].user_password;
                let resUserId = result[0].user_id;
                let resName = result[0].first_name;
                let resPhone = result[0].phone_no;

                if (resEmail === emailAddress && resPass === userPassword) {

                    cookiesSession = req.session;
                    cookiesSession.email_address = resEmail;
                    cookiesSession.user_password = resPass;
                    cookiesSession.user_id = resUserId;
                    cookiesSession.first_name = resName;
                    cookiesSession.phone_no = resPhone;

                    res.redirect("/home");
                    console.log("Login successful")
                } else {
                    res.redirect("/login");
                    console.log("Credentials not found");
                }

            })
        .catch(error => console.log('error', error));
            
});


// 2. Register Page API Call 
// When user register successfully, POST new user data and redirect to /login page. 

app.post("/register", (req, res) => {
    console.log(req.body);

    let newUser = JSON.stringify([req.body]);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: newUser,
        redirect: 'follow'
      };
      
      fetch("http:localhost:3000/api/user/post/NewUser", requestOptions)
        .then(response => response.text())
        .then(resuld => res.redirect("/login"))
        .catch(error => console.log('error', error));

});


// 3. Transfer Page API Call 
// When user transfer successfully, POST new transfer transaction. Give alert banner to user "Transfer is successful". 

app.post("/transfer", (req, res) => {

    cookiesSession = req.session;

    const trfData = ([{
        "transfer_amt": req.body.transfer_amt,
        "sender_id": cookiesSession.user_id,
        "sender_balance_id": cookiesSession.balance_id,
        "sender_phone_no": cookiesSession.phone_no,
        "recipient_phone_no": req.body.recipient_phone_no,
        "transfer_message": req.body.transfer_message
    }]);

    // check if user balance > topup amount 

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch(`http:localhost:3000/api/balance/get/Balance/ById/${trfData[0].sender_id}`, requestOptions)
    .then(response => response.json())
    .then(result => {

        let senderBalance = result[0].current_balance;


        if (senderBalance > trfData[0].transfer_amt) {

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            }

            fetch(`http:localhost:3000/api/user/get/UserDetail/ByPhone/${trfData[0].recipient_phone_no}`)
            .then(response => response.json())
            .then(result => {

                


                if (result.length === 1) {

                    let recipientUserId = result[0].user_id;

                    trfData[0].recipient_id = recipientUserId;

                    console.log(trfData);

                    var requestOptions = {
                        method: 'GET',
                        redirect: 'follow'
                    }
        
                    fetch(`http:localhost:3000/api/balance/get/Balance/ById/${trfData[0].recipient_id}`)
                    .then(response => response.json())
                    .then(result => {


                        let recipientBalanceId = result[0].balance_id;

                        trfData[0].recipient_balance_id = recipientBalanceId;

                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        
                        var raw = JSON.stringify(trfData);
                        
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };
                        
                        fetch("http:localhost:3000/api/transfer/post/Transfer", requestOptions)
                            .then(response => response.json())
                            .then(result => {console.log(result.message, result.status, res.redirect("/home"))})
                            .catch(error => console.log('error', error));
                    
                    });

                } else { console.log("User does not exist")}

            });

        } else { console.log("Insufficient balance. Please topup first")}

    })
    .catch(error => console.log('error', error));

});


// 4A. Topup Page API Call 
// When user topup successfully, POST new topup transaction. Give alert banner to user "Topup  is successful". 

app.post("/topup", (req, res) => {

    cookiesSession = req.session;


    let topupAmt = parseFloat(req.body.topup_amt);




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
    {
        "user_id": req.session.user_id,
        "topup_amt": topupAmt,
        "balance_id": req.session.balance_id
    }
    ]);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http:localhost:3000/api/topup/post/TopUp", requestOptions)
    .then(response => response.text())
    .then(result => {

        res.redirect("/home")
    })
    .catch(error => console.log('error', error));

});

// 4B Withdraw Page API Call 

app.post("/withdraw", (req, res) => {

    cookiesSession = req.session;


    let withdrawAmt = parseFloat(req.body.withdraw_amt);




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
    {
        "user_id": req.session.user_id,
        "withdraw_amt": withdrawAmt,
        "balance_id": req.session.balance_id
    }
    ]);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http:localhost:3000/api/withdraw/post/Withdraw", requestOptions)
    .then(response => response.text())
    .then(result => {

        res.redirect("/home")
    })
    .catch(error => console.log('error', error));

});


// 5. History Page API Call (Optional - if we have time, we can display the history of user activities)

app.get("/history", (req, res) => {

    // cookie info to feed as query param 
    let historyUID = cookiesSession.user_id;


    cookiesSession = req.session;
    let myName = req.session.first_name;
    let myUID = req.session.user_id;



    // get topup history 
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    // get topup History 
    fetch(`http:localhost:3000/api/topup/get/History/ById/${historyUID}`, requestOptions)
    .then(response => response.json())
    .then(result => {

        const trfHist = result;


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
            };

        // get withdraw History 
        fetch(`http:localhost:3000/api/withdraw/get/History/ById/${historyUID}`, requestOptions)
        .then(response => response.json())
        .then(result => {

            const withHist = result;
            

                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                  };
                  
                  // get transfer history - sender 
                  fetch(`http:localhost:3000/api/transfer/get/TransferHistory/BySenderId/${historyUID}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
    
                        const trfSendHist = result;
    
                        var requestOptions = {
                            method: 'GET',
                            redirect: 'follow'
                          };

                          // get transfer history - receiver 
    
                          fetch(`http:localhost:3000/api/transfer/get/TransferHistory/ByRecipientId/${historyUID}`, requestOptions)
                            .then(response => response.json())
                            .then(result => {
    
                                const trfRecHist = result;
                                // const date = trfRecHist[0].transfer_date;
                                // console.log(trfRecHist, trfRecHist[0].transfer_date, type(date));
                                var requestOptions = {
                                    method: 'GET',
                                    redirect: 'follow'
                                  };
                                  
                                fetch(`http:localhost:3000/api/balance/get/Balance/ById/${myUID}`, requestOptions)
                                    .then(response => response.json())
                                    .then(result => {
                                        let myBalanceId = result[0].balance_id;
                                        let myCurrentBal = result[0].current_balance;
                            
                                        cookiesSession = req.session;
                                        cookiesSession.balance_id = myBalanceId;

                                        res.render("history", {trfHist: trfHist, withHist: withHist, trfSendHist: trfSendHist, trfRecHist: trfRecHist, myCurrentBal: myCurrentBal});
                            
                            
                                    })
                                    .catch(error => console.log('error', error));
                                
    
                            })
                            .catch(error => console.log('error', error));
    
                    })
                    .catch(error => console.log('error', error));

              })
              .catch(error => console.log('error', error));


    })
    .catch(error => console.log('error', error));

});


// Pending transform date
// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow'
// };



// Calling Post request 
// Link to blog: https://www.freecodecamp.org/news/how-to-make-api-calls-with-fetch/


// Cookie guidelines here 
// https://codeforgeek.com/manage-session-using-node-js-express-4/


// Listen to port 3001. 

app.listen(process.env.PORT || '3001', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3001'}`);
});

