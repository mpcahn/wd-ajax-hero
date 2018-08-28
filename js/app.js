(function () {
  'use strict';

  const movies = [];

  // This mess of code is unprofessional and unacceptable
  const renderMovies = function () {
    $('#listings').empty();
    
    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.Plot}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  // API KEY: http://www.omdbapi.com/?i=tt3896198&apikey=d2ac6e72

  //   - Listen for submissions on the search form. Remember to prevent the default action.
  $(document).ready(function () {
    $(".search").submit(function (e) {
      e.preventDefault();
      // - Validate the user input is not blank.
      if ($("#search").val() === '') {
        alert('THOU SHALT NOT ENTER A BLANK SEARCH!!!!!')
      } else {
        // - Clear the previous search results.
        // ?t=Frozen
        var str = $("#search").val()
        $("#search").val('')

        var str = str.split(' ').join('+');
        var url = `http://www.omdbapi.com/?i=tt3896198&apikey=d2ac6e72&t=${str}`

        // - Send an HTTP request to the [OMDB API](http://omdbapi.com/) search endpoint.
        //   - The API requires a key so you will need to send requests to this url instead:
        //     - https://omdb-api.now.sh/
        //     - Example: https://omdb-api.now.sh/?s=star%20wars
        // - Handle the HTTP response by pushing a new, well-formed `movie` object into the global `movies` array.
        fetch(url)
        .then((response) => response.json())
        .then((data)=> movies.push(data))

        // - Render the `movies` array to the page by calling the `renderMovies()` function with no arguments.
        renderMovies()
      }
    });
  });  
})();