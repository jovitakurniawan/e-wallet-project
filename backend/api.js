const express = require("express");

let router = express.Router();
router.get("/", (request, response) => {
    console.log("Hello! A request is received.");
    // response.send("Hello! Thanks for connecting to this server.");
    response.send({ "first_name": "Gordon", "last_name": "Oh" });
}); // GET
// router.post("/");    // POST
// router.put();        // PUT
// router.delete();     // DELETE

// a sum API which takes input from the request and returns the sum as response
router.get("/sum", (request, response) => {
    let n1 = parseFloat(request.query.number1);
    let n2 = parseFloat(request.query.number2);
    let sum = n1 + n2;
    response.send(`Sum:  ${sum}`);
});

router.post("/multiply", (request, response) => {
    let n1 = parseFloat(request.body.number1);
    let n2 = parseFloat(request.body.number2);
    let product = n1 * n2;
    response.send(`Product: ${product}`);
})

module.exports = { router };