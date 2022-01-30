const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const PORT = process.env.PORT || 8080;
var app = express();

var corsOptions = {
  origin: "http://localhost:8081",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Rota principal",
  });
});

require("./app/routes/tutorial.routes")(app);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Ops! Alguma coisa deu errado!");
  } else {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  }
});
