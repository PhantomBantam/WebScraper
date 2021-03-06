const socket = io();
const redditBtn = document.getElementById('reddit-btn');
const drudgeBtn = document.getElementById('drudge-btn');
const zeroBtn = document.getElementById('zero-btn');
const stockBtn = document.getElementById('stock-btn');
const forexBtn = document.getElementById('forex-btn');
const scrapeResults = document.getElementById('scrape-results');
const quoteElem = document.getElementById('quote');

const stockInput = document.getElementById('stock-input');

var fetching = true;

function sendLoadingMsg(){
  scrapeResults.innerHTML = '';
  let msg = document.createElement('div');
  msg.innerHTML = 'Retrieving URLs, this might take a while...';
  scrapeResults.appendChild(msg);
}

redditBtn.addEventListener('click', (e)=>{
  if(!fetching){
    sendLoadingMsg();
    socket.emit('scrapeReddit');
    fetching = true;  
  }else{
    alert("I'm already fetching something!")
  }
});

drudgeBtn.addEventListener('click', (e)=>{
  if(!fetching){
    sendLoadingMsg();
    socket.emit('scrapeDrudge');
    fetching = true;  
  }else{
    alert("I'm already fetching something!")
  }
});

zeroBtn.addEventListener('click', (e)=>{
  if(!fetching){
    sendLoadingMsg();
    socket.emit('scrapeZero');
    fetching = true;  
  }else{
    alert("I'm already fetching something!")
  }
});

forexBtn.addEventListener('click', (e)=>{
  if(!fetching){
    sendLoadingMsg();
    socket.emit('scrapeForex');
    fetching = true;  
  }else{
    alert("I'm already fetching something!")
  }
});

stockBtn.addEventListener('click', (e)=>{
  if(!fetching){
    sendLoadingMsg();
    let stock = stockInput.value;
    socket.emit('scrapeStock', {stock});
    fetching = true;  
  }else{
    alert("I'm already fetching something!")
  }
});

socket.on('scrapeRes', ({res})=>{
  let {links, titles} = res;

  for(var i = 0;i < titles.length; i++){
    let div = document.createElement('div');
    div.setAttribute('class', 'link');
    let a = document.createElement('a');
    a.innerHTML = titles[i];
    a.setAttribute('href', links[i]);
    a.setAttribute('target', 'blank');
    div.appendChild(a);
    scrapeResults.appendChild(div);
  }

  fetching = false;
})

socket.on('quote', (data)=>{
  quoteElem.innerHTML = (data);
  fetching = false;
});