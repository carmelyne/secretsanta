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