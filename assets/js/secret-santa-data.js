$(function(){

  var $container = $('#wish_list_container');

  $container.imagesLoaded(function(){
    $container.isotope({
      masonry: {
        itemSelector : '.gift-box',
        columnWidth : 240
        },
      //animation fails to show with 1000+ entries
      animationOptions: {
           duration: 750,
           easing: 'linear',
           queue: false
         },
      sortBy: 'random',
        getSortData : {
          number : function( $elem ) {
            return parseInt( $elem.find('.number').text(), 10 );
          },
          name : function ( $elem ) {
            return $elem.find('.name').text();
          }
        }
    });
  });

  var $optionSets = $('#options .option-set'),
      $optionLinks = $optionSets.find('a');

  $optionLinks.click(function(){
    var $this = $(this);
    // don't proceed if already selected
    if ( $this.hasClass('selected') ) {
      return false;
    }
    var $optionSet = $this.parents('.option-set');
    $optionSet.find('.selected').removeClass('selected');
    $this.addClass('selected');

    // make option object dynamically, i.e. { filter: '.my-filter-class' }
    var options = {},
        key = $optionSet.attr('data-option-key'),
        value = $this.attr('data-option-value');
    // parse 'false' as false boolean
    value = value === 'false' ? false : value;
    options[ key ] = value;
    if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
      // changes in layout modes need extra logic
      changeLayoutMode( $this, options )
    } else {
      // otherwise, apply new options
      $container.isotope( options );
    }

    return false;
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
      '<i class="icon-gift icon-white"><span class="number">',profileId,'</span></i> ',
      '<a target="_blank" class="" title="Wish List" href="',
      json.feed.entry[i].gsx$amazonwishlist.$t,
      '">',
      'View Wishlist</a><p>',
      '<img class="profilepic" src="https://plus.google.com/s2/photos/profile/',profileId,'?sz=50"></img></li>',
      '<a class="user name" target="_blank" title="',
      json.feed.entry[i].gsx$name.$t,
      '" href="',
      json.feed.entry[i].gsx$googleplusprofilelink.$t,
      '">',
      json.feed.entry[i].gsx$name.$t,
      '</a>',
      '<p class="thoughts">',
      json.feed.entry[i].gsx$whyisitimportanttoyouthatsecretsantahelpsoutthisyear.$t,
      '<p>',
      '</div>'
      ].join('');
    }

    document.getElementById('wish_list_container').innerHTML = wish_list_html

}
