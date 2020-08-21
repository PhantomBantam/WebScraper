
const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');

function launchPuppeteer(){
  return puppeteer
  .launch()
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
  }    

}

module.exports = scraper;