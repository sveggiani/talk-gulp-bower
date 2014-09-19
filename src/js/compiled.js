$(function() {

  'use strict';

  /* Events
  ----------------------------------------------------------------------------- */
  $('h1').on('click', function() {
    alert('Ey! Qué fue ese click? Soy un título principal!');
  });

  $('img').on('click', function() {
    alert('Sacá esa manito!');
  });

});


// Avoid `console` errors in browsers that lack a console.
(function() {

    'use strict';

    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
