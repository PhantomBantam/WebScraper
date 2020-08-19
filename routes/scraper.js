const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');



const url = 'https://www.reddit.com';
 
var redditURLS = [];


puppeteer
  .launch()
  .then(function(browser) {
    console.log('creating page...');
    return browser.newPage();
  })
  .then(function(page) {
    console.log('grabbing url info...');
    
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    console.log('displaying results...');
    Array.from(($('a[data-click-id="body"]', html))).forEach(elem=>{
      console.log(url+elem.attribs.href);
    })

    $('h3', html).each(function() {
      console.log($(this).text());
    });

  })
  .catch(function(err) {
    //handle error
  });
