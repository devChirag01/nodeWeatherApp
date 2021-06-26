const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const geoCode = require("../utils/geoCode");
const geoWeather = require("../utils/getWeather");

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebar
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// SetUp Static Dir To Serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  console.log(req.query);
  res.render("index", {
    title: "Weather App",
    name: "Active Forcast",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Created by",
    name: "Addicted",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "YOOOOOOOOOOOOOOO",
    title: "Help",
    name: "Active Forcast",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({ error: "Provide search address" });
  }
  geoCode(req.query.address, (err, success1) => {
    if (err) {
      return res.send({
        err,
      });
    }
    // console.log("CB geoCode Scs", success);

    // Getting Weather From lat Long Cords
    geoWeather(success1, (err, success2) => {
      if (err) {
        return console.log("geoWeather CB Err", err);
      }
      console.log("geoWeather CB Scs", success2);
      res.send({
        forcast: "Forcast",
        location: success1,
        weather: success2,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({ error: "Provide search text" });
  }
  console.log(req.query);
  res.send({
    prdoducts: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { title: "Help Not Found" });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Node app running on 3000");
});
