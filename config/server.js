module.exports = {
  drawRoutes: function(app) {

    app.get('/resume/', function(req, res){
      fs = require('fs');
      data = fs.readFileSync('vendor/static/resume.json', 'utf8');
      res.json(JSON.parse(data));
    });
  }
};