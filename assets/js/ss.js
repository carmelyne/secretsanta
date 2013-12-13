$(function(){

// Just get some rough data
  var wishLists = $("#wish_list_container").children().length + 1;
    console.log("number of wish lists:" + wishLists);
  var receivedGifts = $(".recipient").length + 1;
    console.log("Received Gifts:" + receivedGifts);
  var sentGifts = $(".santa").length + 1;
    console.log("Sent Gifts:" + sentGifts);

  $('.carousel').carousel({
    interval: 8000,
    pause: "hover"
  });

  var $container = $('#wish_list_container');

  $container.imagesLoaded(function(){
    $container.isotope({
      masonry: {
        itemSelector : '.gift-box',
        //columnWidth: 240
        },
      //animation fails to show with 1000+ entries
      animationOptions: {
           duration: 750,
           easing: 'linear'
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

  // filter items when filter link is clicked
  $('#filters a').click(function(){
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    return false;
  });

});

// display wishlist
function displayContent(json) {

    var wish_list_html='';
    var len = json.feed.entry.length

    for (var i=0; i<len; i++) {

      var link = json.feed.entry[i].gsx$googleplusprofilelink.$t;

      // TODO: Carm find out how to resolve vanityURL to profileID
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
      '<div class="gift-box',
      getSanta(json.feed.entry[i]),
      getRecipient(json.feed.entry[i]),
      getBadAmazon(json.feed.entry[i]),
      getMissingAddress(json.feed.entry[i]),
      '">',
      '<p class="gift-box-header">',
      '<i class="icon-gift icon-white"><span class="number">',profileId,'</span></i> ',
      '<a target="_blank" class="" title="Wish List" href="',
      json.feed.entry[i].gsx$amazonwishlist.$t,
      '">',
      'View Wishlist</a>',
      badAmazon(json.feed.entry[i]),
      getGiftStatus(json.feed.entry[i]),
      '<p>',
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

function getGiftStatus(entry) {
    var iconString = '<span class="pull-right">';

    if ( entry.gsx$gaveagift.$t.length > 0 ) { // they were marked as having gave a gift in the spreadsheet
      iconString += '<img src="./assets/img/ss-ico.png" title="gave a gift!" /> ';
    }

    if ( entry.gsx$giftreceivedorgiftincoming.$t == "Received" ) { // they were marked as having received a gift
      iconString += '<img src="./assets/img/present.png" class="recipient" title="got a gift!" /> ';
    }

    if ( entry.gsx$giftreceivedorgiftincoming.$t == "Incoming" ) { // they were marked as having an incoming gift
      iconString += '<img src="./assets/img/present-incoming.png" class="recipient" title="incoming gift!" /> ';
    }

    return iconString + '</span>';
}

function badAmazon(entry) {
    var iconBadAmazon = ' <span class="no-address pull-right">';

    if ( entry.gsx$incorrectamazonpermalink.$t == "No Address" ) { // has an incorrect Amazon link
      iconBadAmazon += '<img src="./assets/img/ss-missing-shipping.png" title="Missing Shipping address!" /> ';
    }

    if ( entry.gsx$incorrectamazonpermalink.$t == "Bad Link" ) { // has an incorrect Amazon link
      iconBadAmazon += '<img src="./assets/img/ss-bad-amazon-link.png" title="Incorrect Amazon Link!" /> ';
    }

    return iconBadAmazon + '</span>';
}

function getRecipient(entry) {
    var addedRecipient;

    if ( entry.gsx$giftreceivedorgiftincoming.$t.length > 0 ) {
      addedRecipient = " recipient";
    }
    return addedRecipient;
}

function getSanta(entry) {
    var addedSanta;

    if ( entry.gsx$gaveagift.$t.length > 0 ) {
      addedSanta = " santa";
    }
    return addedSanta;
}

function getBadAmazon(entry) {
    var addedBadAmazon;

    if ( entry.gsx$incorrectamazonpermalink.$t == "Bad Link" ) {
      addedBadAmazon = " bad-link";
    }
    return addedBadAmazon;
}

function getMissingAddress(entry) {
    var addedMissingAddress;

    if ( entry.gsx$incorrectamazonpermalink.$t == "No Address" ) {
      addedMissingAddress = " no-address";
    }
    return addedMissingAddress;
}