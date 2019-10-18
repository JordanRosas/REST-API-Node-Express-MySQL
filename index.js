var express = require('express')
var app  = express();
var person = require('./person')
function REST() {
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : '',
        user     : '',
        password : '',
        database : '',
        debug    :  false,
        multipleStatements: true
    });
    self.configureExpress(pool);
}

REST.prototype.configureExpress = function(pool) {
      var self = this;

      app.set('secret', config.secret);
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(cors());
      app.set('view engine', 'hbs');
      
      app.engine( 'hbs', hbs( {
        extname: 'hbs',
      }));

      app.set('views', __dirname + '/views');

      var router = express.Router();
      app.use('/', router); 

      new person(router,pool);

      self.startServer();
}

REST.prototype.startServer = function() {

  var port = process.env.PORT || 3001;

  app.listen(port,function(){
      console.log('All right ! I am alive at Port' + port + '.');
  });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();