var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id) {
  for(var i= 0; i < storage.items.length ; i++) {
    if(storage.items[i].id === Number(id)){
        storage.items.splice(i, 1);
        break;
    }
  }
};

Storage.prototype.put = function(id, name) {
  for(var i= 0; i < storage.items.length ; i++) {
    if(storage.items[i].id === Number(id)){
        storage.items[i].name = name;
        break;
    }
  }
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
  if (!req.params) {
      return res.sendStatus(400);
  }
  var item = storage.delete(req.params.id);
  res.status(200).json(item);

});

app.put('/items/:id', jsonParser, function(req, res) {
  if (!req.params || !req.body) {
      return res.sendStatus(400);
  }
  var item = storage.put(req.params.id, req.body.name);
  res.status(200).json(item);

});

app.listen(process.env.PORT || 3000);
