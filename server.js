const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs');



app.get('/', (req, res)=>{
  res.send('webscraper');
});

const users = require('./routes/users');
app.use('/users', users)



app.listen(PORT, ()=>console.log('SERVER RUNNING AT PORT ' + PORT));
