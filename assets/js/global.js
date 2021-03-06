
  $(document).ready(function() {

  var api_key = 'AIzaSyDLIGqwf3JKvLURq3nzwrV3IkDwZmoegP8';

  var brokenImages = [];

  // Converts image to dataUri
  function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        //callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
  };

  // Selects href from images without alt text
  function altTextChecker() {

    $('img').each(function() {

      var imgSrc = $(this).attr('src'),
          that   =  $(this),
          keywordList = "";

//      if($(this).attr('alt') == "") {
//        $(this).after('<p>Alt attribute exists but is not defined</p>');
//      } else if ($(this).attr('alt') === undefined) {
//        $(this).after('<p>Alt attribute is undefined</p>');
//      } else {
//        $(this).after('<p>Alt: ' + $(this).attr('alt') + '</p>');
//      }

      if($(this).attr('alt') == "" || $(this).attr('alt') === undefined) {

        getDataUri(imgSrc, function(dataUri) {

        var json = '{' +
          ' "requests": [' +
          '	{ ' +
          '	  "image": {' +
          '	    "content":"' + dataUri + '"' +
          '	  },' +
          '	  "features": [' +
          '	      {' +
          '	      	"type": "LABEL_DETECTION",' +
          '			"maxResults": 10' +
          '	      }' +
          '	  ]' +
          '	}' +
          ']' +
          '}';

        $.ajax({
          type: 'POST',
          url: "https://vision.googleapis.com/v1/images:annotate?key=" + api_key,
          dataType: 'json',
          data: json,
          //Include headers, otherwise you get an odd 400 error.
          headers: {
            "Content-Type": "application/json",
          },

          success: function(data, textStatus, jqXHR) {

            console.log('Keywords: ');

            $.each(data.responses[0].labelAnnotations, function(i, val) {

              console.log(' ' + val['description']);

              if (val['score'] >= 0.5) {
                keywordList = keywordList + val['description'] + ', ';
              }
            });

            keywordList = keywordList.slice(0, -2);

            that.attr('alt', 'This image may contain ' + keywordList);

            that.after('<p class="new">New Alt: ' + that.attr('alt') + '</p>');
          }

        });

        });

      }

    });
  }

    var startButton = $('<button id="button">Click here for some alt text!</button>');
    $('body').prepend(startButton);

    $('#button').on('click', function() {
      altTextChecker();
      $(this).remove();
    });
});
