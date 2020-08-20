const express = require('express');
const getInfoFromLink = require('./utils/scraper');
const socketio = require('../socketio');

const router = express.Router();
const url = 'https://www.reddit.com';
const scraper = require('./utils/scraper');
const { chooseScraper, getDrudge, getReddit } = require('./utils/scraper');

router.get('/', (req, res)=>{
  res.render('dashboard');
});

router.get('/loading', (req, res)=>{
  res.send('loading...');
});

router.get('/scraper', async (req, res)=>{
  let data = await getInfoFromLink(url);

  res.send(data);
})

socketio.on('connection', async socket=>{
  socket.on('scrapeReddit', async ()=>{
    let data = await getReddit();

    socket.emit('scrapeRes', {res:data});
  });

  socket.on('scrapeDrudge', async ()=>{
    let data = await getDrudge();

    socket.emit('scrapeRes', {res:data});
  });


});

module.exports = router;