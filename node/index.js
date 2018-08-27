const express = require('express');
const app = new express();

app.get('/', function(req, res){
  console.log("req, res", [req, res]);

  res.status(200).send("OK");
});

app.listen(3030, function(e){
  console.log("Backend escuchando");
});
