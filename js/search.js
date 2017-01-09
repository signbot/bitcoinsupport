(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = ''

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];


        appendString += '<article class="post-item"> <p><strong><a class="post-link" href="'
        appendString += item.url
        appendString += '">'
        appendString += item.title
        appendString += '</a></strong> — <span>'
        appendString += item.description
        appendString += '</span> <a class="post-link readmore" href="'
        appendString +=  item.url
        appendString +=  '">Read more</a></p> </article>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  searchBox = document.getElementById('search-box')

  var searchTerm = searchBox.value || getQueryVariable('query');


  // if(element) {
    //   element.setAttribute("value", searchTerm);
  // }

  // element.value()

  if (searchTerm) {


    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('description');
      this.field('tags', { boost: 10 });
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content,
        'tags': window.store[key].tags
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();
