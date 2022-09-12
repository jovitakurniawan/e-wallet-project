const express = require('express');
const app = express();
const router = require('./routes/index');
// require('dotenv').config();
// console.log(process.env);


app.use(express.json());

app.use('/', router);

app.use('/api/test', router);

// new api require app.use 
app.use('/api/balance/get/Balance/ById/:user_id', router);

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});

