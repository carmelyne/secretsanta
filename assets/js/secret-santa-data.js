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

        var link = json.feed.entry[i].gsx$googleplusprofilelink.$t;
        var profileId = null;
       if (link) {
           var result = /(\d{4,})/.exec(link);
          if (result) {
 	         profileId = result[0]
            }
      } else {
	profileId="113269791493257695508";
}

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
            '</a> <img class="profilepic" src="https://plus.google.com/s2/photos/profile/',profileId,'?sz=50"></img><p>',
            '<p class="thoughts">',
            json.feed.entry[i].gsx$whyisitimportanttoyouthatsecretsantahelpsoutthisyear.$t,
            '<p>',
            '</div>'
        ].join('');  
    }

    document.getElementById('wish_list_container').innerHTML = wish_list_html

}   
