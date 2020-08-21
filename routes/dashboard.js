const express = require('express');
const getInfoFromLink = require('./utils/scraper');
const socketio = require('../socketio');

const router = express.Router();
const {getDrudge, getReddit, getZero } = require('./utils/scraper');

router.get('/', (req, res)=>{
  res.render('dashboard');
});

router.get('/loading', (req, res)=>{
  res.send('loading...');
});


socketio.on('connection', async socket=>{
  socket.on('scrapeReddit', async ()=>{
    let data = await getReddit();

    socket.emit('scrapeRes', {res:data});
  });

  socket.on('scrapeDrudge', async ()=>{
    let data = await getDrudge();

    socket.emit('scrapeRes', {res:data});
  });

  socket.on('scrapeZero', async ()=>{
    let data = await getZero();

    socket.emit('scrapeRes', {res:data});
  });


});

module.exports = router;