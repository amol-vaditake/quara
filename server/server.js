const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(
        process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use('/audios', express.static('audios'));

// Routes
const users = require("./routes/api/users");
const draw = require("./routes/api/draw");
const adminroute = require("./routes/api/adminroute");
const category = require("./routes/api/Category.route");

app.use("/api/users", users);
app.use("/api/draw", draw);
app.use("/api/admin", adminroute);
app.use("/api/categories", category);


// Passport config
require("./config/passport")(passport);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));