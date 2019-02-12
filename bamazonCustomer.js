var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "jack31094",
  database: "bamazon_db"
});
var items = [];
var quantity = [];
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  purchase();
});

function purchase() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for (i = 0; i < results.length; i++) {
      quantity.push(results[i].quantity);
    }
    //prompt to user to select item to purchase
    inquirer.prompt([{
      name: "itemsForSale",
      type: "list",
      choices: function () {
        for (i = 0; i < results.length; i++) {
          items.push(results[i].item_id + " " + results[i].product_name + " " + results[i].price)
        }
        return items;
      },
      message: "Which item would you like to buy"
    },
    // prompt for how many of said product the user would like to buy
    {
      type: "input",
      name: "product",
      message: "How many would you like to buy?"
    }

    ]).then(function (inquirerResponse) {
      // for loop to update sql database
      for (i=0; i<results.length; i++)
      if (inquirerResponse.itemsForSale === items[i]) {
        if (quantity[i] >= inquirerResponse.product) {
          var newQuantity= quantity[i]- inquirerResponse.product;
          var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                quantity: newQuantity
              },
              {
                item_id: i+1
              }
            ]);
          console.log("Order successfully placed");
          console.log (query.sql);
          console.log(inquirerResponse.product*results[i].price)
          purchase();

        }
        else {
          console.log("Insufficient quantity to fill order")
          purchase();
        }
      }
    })
  })
}