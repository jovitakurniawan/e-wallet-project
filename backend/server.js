const express = require('express');
const app = express();
const router = require('../backend/routes/index');

// require('dotenv').config();
// console.log(process.env);

// parses incoming JSON requests and puts the parsed data
app.use(express.json());

// whenever a request hits your backend, Express will execute the functions you passed to app.use()
// in this case, relevant endpoints called in router folder will be executed accordingly
app.use('/', router);


app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});

