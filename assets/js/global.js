$(document).ready(function() {
    // Selects href from images without alt text
  function altTextChecker() {

    $('img').each(function() {

      $(this).after('<p>Output: ' + $(this).attr('alt') + '</p>');

      if($(this).attr('alt') == "" || $(this).attr('alt') === undefined) {
        console.log($(this).attr('src'));
      }
    });
  };

  altTextChecker();
});
