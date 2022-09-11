const express = require("express");
const { router } = require("./api");

let app = express();
app.use(express.json());
app.use(router);
                            // or can simply const api = require("./api"); --> app.use(api.router);
app.listen(3000, (error) => {
    if (error) {
        console.log(error);
        process.exit(0);
    }
    else {
        console.log("Server started on port: 3000");
    }
});