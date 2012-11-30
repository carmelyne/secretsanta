$(function(){
  $('#wish_list_container').masonry({
    itemSelector : '.gift-box',
    columnWidth : 240
  });
});

function displayContent(json) {

    var wish_list_html='';
    var len = json.feed.entry.length

    for (var i=0; i<len; i++) {
        wish_list_html += [
            '<div class="gift-box">',
            '<p class="gift-box-header">',
            '<i class="icon-gift icon-white ss"></i> ',
            '<a target="_blank" class="" title="Wish List" href="',
            json.feed.entry[i].gsx$amazonwishlist.$t, 
            '">',
            'View Wishlist</a><p>',
            '<p><a class="user" target="_blank" title="',
            json.feed.entry[i].gsx$name.$t,,
            '" href="', 
            json.feed.entry[i].gsx$googleplusprofilelink.$t, 
            '">', 
            json.feed.entry[i].gsx$name.$t,
            '</a><p>',
            '<p class="thoughts">',
            json.feed.entry[i].gsx$whyisitimportanttoyouthatsecretsantahelpsoutthisyear.$t,
            '<p>',
            '</div>'
        ].join('');  
    }

    document.getElementById('wish_list_container').innerHTML = wish_list_html

}

$(function(){
  $('#random_ten').masonry({
    itemSelector : '.gift-box',
    columnWidth : 240
  });
});

/*
 * Displays ten random lists
 * in a specified block (div)
 * 
 * @param json <obj>
 * @returns nothing
 *
 * Brian Tomlinson <darthlukan@gmail.com>
 */
function displayTen(json) {

  var feed = json.feed.entry;
  var collection = new Array();
  var ten = new Array();
  
  for (var i = 0; i < feed.length; i++) {
    // set a random number between 0 (first index) and the length of our feed.
    // This ensures that we never end up with an invalid index.
    var randint = Math.floor(Math.random(0, feed.length));
    
    if (collection.length < 11) {
      // This "locks in" which element to get as randint may change when parsed on each call.
      
      var element = randint;
      // Set array ten items with our JSON data
      // Same setup as displayContent(), but in a different div with less items.
      ten += [
              '<div class="gift-box">',
              '<p class="gift-box-header">',
              '<i class="icon-gift icon-white ss"></i> ',
              '<a target="_blank" class="" title="Wish List" href="',
              feed[element].gsx$amazonwishlist.$t,
              '">',
              'View Wishlist</a><p>',
              '<p><a class="user" target="_blank" title="',
              feed[element].gsx$name.$t,
              '"href="',
              feed[element].googleplusprofilelink.$t,
              '">"',
              feed[element].gsx$name.$t,
              '</a><p>',
              '<p class="thoughts">',
              feed[element].gsx$whyisitimportanttoyouthatsecretsantahelpsoutthisyear.$t,
              '<p>',
              '</div>'
             ].join('');
      
      // Add array ten into collection array.
      collection += ten;
    }    
  }
  // Sets the html inside of 'random_ten' div to our collection.
  $('#random_ten').html(collection);  
}