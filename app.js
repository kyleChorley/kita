require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const Kita = require("./models/Kita");

// authentication
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const LocalStrategy = require("passport-local").Strategy;
require("./passport/index");
const flash = require("connect-flash");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/kita", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Kita";

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
require("./passport")(app);

const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth/auth");
app.use("/auth", auth);

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const kitaDetailCardRoutes = require("./routes/kitaDetailCard");
app.use("/kitaDetailCard", kitaDetailCardRoutes);

app.get("/api/kita", paginatedResults(Kita), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const query = req.query.q === undefined ? "" : req.query.q;

    console.log("app.js:", query);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    results.current = { page, limit };
    results.numFound = await model.countDocuments().exec();

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
    try {
      if (query === "") {
        results.results = await model
          .find({})
          // .find({ $text: { $search: query } })
          .limit(limit)
          .skip(startIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } else {
        results.results = await model
          // .find({})
          .find(
            {
              $text: {
                $search: query
              }
            },
            { score: { $meta: "textScore" } }
          )
          .limit(limit)
          .skip(startIndex)
          .sort({ score: { $meta: "textScore" } })
          .exec();
        res.paginatedResults = results;
        next();
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.paginatedResults = results;
  };
}

module.exports = app;

// how to create an index via terminal
// type in "mongo"
//
// then type in "use kita"
//
// db.kitaBerlin.createIndex({"$**": "text"},{"weights": { name: 3, postleitzahl:2,addresse:2 }}}
