let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let router = require("./routes/router.js")
require('dotenv/config')

const app = express();

app.use(bodyParser.json());
app.use(
bodyParser.urlencoded({
    extended: true,}),
);

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use("/", router);


//connecting to Database using mongoose

const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log('DB connected'))
.catch(err => console.log(err))


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});




// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });


// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });