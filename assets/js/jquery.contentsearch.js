/**
*  jQuery Content Search Plugin
*  
*  @required jQuery 1.3.x or above
*  @author Ravi Nath <github.com/RaviN>
*  
*
*/
(function($) {

  // hack to get contains expression to disregard letter casing	
  jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
    .indexOf(m[3].toUpperCase()) >= 0;
  };
  

  $.fn.contentsearch = function( options ) {
    
    var queryToken = '#query#';

    var settings = $.extend ( {
      'targetContainer'   : 'body',
      'searchExpression'  : ':contains(#query#)',
      'matchHighlight'    : 'yellow',
      'activeHighlight'   : 'orange'
    }, options);

    return this.each(function() {

      var $this = $(this);

      var priorQuery = '';
      var numMatches = 0;
      var currentMatch = 0;
      var matches;

      $this.keypress(function(event) {

        var query = $(this).val();

        if ( query.length > 2 ) { 

                    
          if ( priorQuery.length > 0 ) {

            matches.each(function() { 
              $(this).css('background-color', '');
            });

            if ( priorQuery != query) {
              findMatches(query);
            } else {
              
             currentMatch = ( currentMatch + 1 ) % numMatches;

            }

          }
          else {
              findMatches(query);
          }

        }

        if ( event.keyCode == 13 ) { //enter key hit

          matches.each(function() { $(this).css('background-color', settings.matchHighlight); });

          var match = $(matches[currentMatch]).css('background-color', settings.activeHighlight);

          $.scrollTo(match, { 'offset' : { 'left' : 0, 'top' : -110 } } ); 

        }

      });

      var findMatches = function(query) {
        
        matches = $(settings.targetContainer).find(settings.searchExpression.replace(queryToken,query));

        priorQuery = query;
        numMatches = matches.length;
        currentMatch = 0;
      }

    });

  };
    
})(jQuery);
