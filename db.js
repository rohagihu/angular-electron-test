const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const cors = require('cors')
const router = express.Router();
const app = express()
const bodyParser = require("body-parser");
const port = 3000

module.exports = function() {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // app.use(cors(
  //  {
  //    // "origin": "*",
  //    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
  //    "preflightContinue": false,
  //    "optionsSuccessStatus": 204,
  //    "credentials": true,
  //    "origin": true
  //  }
  //  ));
   app.options('*', cors())

  // open database in memory
  let db = new sqlite3.Database('./src/assets/data/data.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the data.db SQlite database.');
  });

  db.run('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);')
  db.run('CREATE TABLE IF NOT EXISTS `preliminary-schedule` (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT);')

  app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ user: 'tobi' })
  })


  router.get('/getAllSavedPreliminarySchedules', cors(), (req, res) => {
    db.all('SELECT id FROM `preliminary-schedule`;', (err, rows) => {
      res.json(rows)
      console.log('1', rows)
    });
  })

  router.post('/insert', cors(), (req, res) => {
    db.run('INSERT INTO test (name) VALUES(json('+req.body.title+'));');
    res.json({"success": "true"});
  })

  router.post('/savepreliminaryschedule', cors(), (req, res) => {
    db.serialize(function() {
    // console.log(req.body.data)
    let stmt = db.prepare("INSERT INTO `preliminary-schedule` (`data`) VALUES(?);")
    stmt.run(req.body.data);
    stmt.finalize();
    res.json({"success": "true"});
    })
    // db.run('INSERT INTO `preliminary-schedule` (data) VALUES(json('+req.body.data+'));');
    // db.run('INSERT INTO `preliminary-schedule` (data) VALUES("'+req.body.data+'");');
  })

  router.get('/select', cors(), (req, res) => {
    // res.send('Hello World!')
    db.all('SELECT * FROM test;', (err, rows) => {
      // res.header("Access-Control-Allow-Origin", "*");
      res.json(rows)
      console.log('1', rows)
    });
    // res.send('Done SELECT')
  })

  app.listen(port, () => {
    console.log(`Database App listen on http://localhost:${port}`)
  })

  app.use("/", router);

}



// db.run('CREATE TABLE IF NOT EXISTS some_table (id INTEGER PRIMARY KEY AUTOINCREMENT, ...);')

// process.on('exit', function() {
//   console.log('Ende gelände')
// });

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });