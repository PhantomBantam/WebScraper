
const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');

function launchPuppeteer(){
  return puppeteer
  .launch({
    ignoreDefaultArgs: ['--disable-extensions']
  })
  .then(function(browser) {
    console.log('creating page...');
    return browser.newPage();
  })

}
const scraper = {
  getReddit(){
    return new Promise((resolve, reject)=>{
      launchPuppeteer()
      .then(function(page) {        
        return page.goto("https://www.reddit.com").then(function() {
          return page.content();
        });
      })
      .then(function(html) {
        let links = [];
        let titles = [];
        Array.from(($('a[data-click-id="body"]', html))).forEach(elem=>{
          links.push("https://www.reddit.com"+elem.attribs.href);
          titles.push(elem.children[0].children[0].children[0].data);
        })
        resolve({links, titles});
      })
      .catch(function(err) {
        reject(err);
      });    
    })
  },

  getDrudge(){
    return new Promise((resolve, reject)=>{
      launchPuppeteer()
      .then(function(page) {        
        return page.goto("https://www.drudgereport.com").then(function() {
          return page.content();
        });
      })
      .then(function(html) {
        let links = [];
        let titles = [];
        let counter = 0;
        
        for(let elem of Array.from(($('a', html)))){

          if(elem.children[0].data){
            if(elem.children[0].data.split(' ').length>3){
              titles.push(elem.children[0].data);
              links.push(elem.attribs.href);
            }
          }else if(elem.children[0].children[0]){
            // if(counter==0){
            //   titles.push(elem.children[0].children[0].data);
            //   counter++;
            // }else{
            //   titles[1]+=(elem.children[0].children[0].data);
            // }
            titles.push(elem.children[0].children[0].data);
            links.push(elem.attribs.href);
          }
        }
        resolve({links, titles});
      })
      .catch(function(err) {
        reject(err);
      });    
    })
  },

  getZero(){
    return new Promise((resolve, reject)=>{
      launchPuppeteer()
      .then(function(page) {        
        return page.goto("https://www.zerohedge.com/").then(function() {
          return page.content();
        });
      })
      .then(function(html) {
        let links = [];
        let titles = [];
        let counter = 0;
        
        for(let elem of Array.from($('.view-content .views-row article', html))){
          if(elem.children[3]){
            titles.push(elem.children[3].attribs.content);
            links.push("https://www.zerohedge.com" + elem.attribs.about);
          }
          
          
        }
        
        resolve({links, titles});
      })
      .catch(function(err) {
        reject(err);
      });    
    })
  },

  getForex(){
    return new Promise((resolve, reject)=>{
      launchPuppeteer()
      .then(function(page) {        
        return page.goto("https://www.forexlive.com/").then(function() {
          return page.content();
        });
      })
      .then(function(html) {
        let links = [];
        let titles = [];
                
        for(let elem of Array.from($('article', html))){
          if(elem.children[1].children[3].children[1].children[1].children[0]){
            links.push(elem.children[1].children[3].children[1].children[1].attribs.href);
            titles.push(elem.children[1].children[3].children[1].children[1].children[0].data);
          }
        }
        
        resolve({links, titles});
      })
      .catch(function(err) {
        reject(err);
      });    
    })
  },

  getStocks(stock){
    return new Promise((resolve, reject)=>{
      launchPuppeteer()
      .then(function(page) {        
        return page.goto("https://finance.yahoo.com/quote/" + stock).then(function() {
          return page.content();
        });
      })
      .then(function(html) {
        let links = [];
        let titles = [];


        let header = (Array.from($('#quote-header-info', html)))[0];
        try{
          titles.push(header.children[2].children[0].children[0].children[0].children[0].data);
        }catch(err){
          titles = [];
          titles.push("I couldn't find any stocks named: " + stock);
        }

        resolve({links, titles});
      })
      .catch(function(err) {
        reject(err);
      });    
    })
  }    

}

module.exports = scraper;