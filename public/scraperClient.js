

$.ajax({ url: './scraper'
, type: 'GET'
, dataType: 'html'
})
.done(function(data) {
console.log(  $('*').html(data));
})
.fail(function() {
console.log("Something went wrong!");
});

$.ajax({ url: './loading'
     , type: 'GET'
     , dataType: 'html'
    })
.done(function(data) {
  console.log(  $('*').html(data));
})
.fail(function() {
  console.log("Something went wrong!");
});

