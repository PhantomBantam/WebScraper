
const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');

async function launchPuppeteer(){
  console.log('launching puppeteer');
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], ignoreDefaultArgs: ['--disable-extensions']});
  const page = await browser.newPage();
  return {page, browser};
}
const scraper = {
  async getReddit(){
    try{
      let {page, browser} = await launchPuppeteer();
      let html = await page.goto("https://www.reddit.com").then(function() {
        return page.content();
      });
      let links = [];
      let titles = [];
      
      for(let elem of Array.from(($('a[data-click-id="body"]', html)))){
        links.push("https://www.reddit.com"+elem.attribs.href);
        titles.push(elem.children[0].children[0].children[0].data);
      }
      browser.close();
      return({links, titles});  
    }catch(err){
      console.log(err);
      return(err);
    }
  },

  async getDrudge(){
    try{
      let {page, browser} = await launchPuppeteer();
      let html = await page.goto("https://www.drudgereport.com").then(function() {
        return page.content();
      });
      let links = [];
      let titles = [];
        
      for(let elem of Array.from(($('a', html)))){

        if(elem.children[0].data){
          if(elem.children[0].data.split(' ').length>3){
            titles.push(elem.children[0].data);
            links.push(elem.attribs.href);
          }
        }else if(elem.children[0].children[0]){
          titles.push(elem.children[0].children[0].data);
          links.push(elem.attribs.href);
        }
      }
      browser.close();
      return({links, titles});  
    }catch(err){
      return(err);
    }
  },

  async getZero(){
    try{
      
      let {page, browser} = await launchPuppeteer();
      let html = await page.goto("https://www.zerohedge.com").then(function() {
        return page.content();
      });

      let links = [];
      let titles = [];
        
      for(let elem of Array.from($('.view-content .views-row article', html))){
        if(elem.children[3]){
          titles.push(elem.children[3].attribs.content);
          links.push("https://www.zerohedge.com" + elem.attribs.about);
        }
      }
      browser.close();

      return({links, titles});  
    }catch(err){
      return(err);
    }
  },

  async getForex(){
    try{
      let {page, browser} = await launchPuppeteer();
      let html = await page.goto("https://www.forexlive.com/").then(function() {
        return page.content();
      });
      
      let links = [];
      let titles = [];

      for(let elem of Array.from($('article', html))){
        if(elem.children[1].children[3].children[1].children[1].children[0]){
          links.push(elem.children[1].children[3].children[1].children[1].attribs.href);
          titles.push(elem.children[1].children[3].children[1].children[1].children[0].data);
        }
      }
      browser.close();
      return({links, titles});  

    }catch(err){
      return(err);
    }

  },

  async getStocks(stock){
    try{
      let {page, browser} = await launchPuppeteer();
      let html = await page.goto("https://finance.yahoo.com/quote/" + stock).then(function() {
        return page.content();
      });

      let links = [];
      let titles = [];
      let header = (Array.from($('#quote-header-info', html)))[0];
      try{
        titles.push(header.children[2].children[0].children[0].children[0].children[0].data);
      }catch(err){
        titles = [];
        titles.push("I couldn't find any stocks named: " + stock);
      }
      browser.close()
      return({links, titles});  
    }catch(err){
      return(err);
    }
  }    
}

module.exports = scraper;