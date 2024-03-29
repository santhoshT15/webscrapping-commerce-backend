const express = require("express");
const dotenv = require("dotenv");
const mongo = require("./connectdb");
const scraper = require("./scrape");
const productsRouter = require("./routers/Products")
var cors = require("cors");
var cron = require('node-cron');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

 mongo();
 cron.schedule('0 0 */12 * * *', () => {
  console.log('running load task every 12 hour');
   scraper.scrape();
});


app.use("/", (req,res,next) =>{
  console.log("Middleware");
  next();
 });

 app.use("/products",productsRouter);

 app.listen(process.env.PORT)