var express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express()
const pushRoutes = require('./routes/push.routes');
const userRoutes = require('./routes/user.routes');
const loginRoutes = require('./routes/login.routes');
let jwt = require("jsonwebtoken");
let jwtKey = require("./utils/jwt");
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/*', function(req, res, next) {
  console.log(req.url);
  console.log(req.headers);
  console.log(req.body);
  const token = req.headers.token;
  try {
    jwt.verify(token, jwtKey.secret);
    next();
  } catch {
    res.send(' {status:"401", message:not auth, data:""}');
  }
})

app.use('/api/push', pushRoutes);
app.use('/api/user', userRoutes);
app.use('/auth/', loginRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to push server application." });
});

const port = 3002;
app.listen(port, ()=>console.log('Listening on port : ' + port ))