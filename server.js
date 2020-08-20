const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const http = require('http');
const path = require('path');
var sockets = require('./socketio');


const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
sockets.connect(server);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
  res.send('webscraper');
});

const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
app.use('/users', users)
app.use('/dashboard', dashboard)



server.listen(PORT, ()=>console.log('SERVER RUNNING AT PORT ' + PORT));
