$(document).ready(function() {

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
          callback(canvas.toDataURL('image/png'));
      };

      image.src = url;
  }

  // Selects href from images without alt text
  function altTextChecker() {

    $('img').each(function() {

      if($(this).attr('alt') == "") {
        $(this).after('<p>Alt attribute exists but is not defined</p>');
      } else if ($(this).attr('alt') === undefined) {
        $(this).after('<p>Alt attribute is undefined</p>');
      } else {
        $(this).after('<p>Alt: ' + $(this).attr('alt') + '</p>');
      }

      if($(this).attr('alt') == "" || $(this).attr('alt') === undefined) {
        var imgSrc = $(this).attr('src');

        getDataUri(imgSrc, function(dataUri) {
          // Do whatever you'd like with the Data URI!
          console.log(dataUri)
        });
      }
    });
  };

  altTextChecker();
});
