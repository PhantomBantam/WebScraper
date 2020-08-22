const express = require('express');
const getInfoFromLink = require('./utils/scraper');
const socketio = require('../socketio');

const router = express.Router();
const {getDrudge, getReddit, getZero, getForex, getStocks, getQuote} = require('./utils/scraper');

router.get('/', (req, res)=>{
  res.render('dashboard');
});

router.get('/loading', (req, res)=>{
  res.send('loading...');
});

socketio.on('connection', async socket=>{

  let data = await getQuote();

  socket.emit('quote', data);

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

  socket.on('scrapeForex', async ()=>{
    let data = await getForex();

    socket.emit('scrapeRes', {res:data});
  });

  socket.on('scrapeStock', async ({stock})=>{
    let data = await getStocks(stock);
    
    socket.emit('scrapeRes', {res:data});
  });
});

module.exports = router;