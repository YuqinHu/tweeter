$(document).ready(function() {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $(".tweets-container").empty();
    for (obj of tweets) {
      const $tweetElement = createTweetElement(obj);
      $('.tweets-container').prepend($tweetElement);
    }
  }



  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class = "tweet">
    <header>
      <div>
        <img src="${escape(tweet.user.avatars)}">
        &nbsp&nbsp${escape(tweet.user.name)}
      </div>
      <div>
        <a>${escape(tweet.user.handle)}</a>
      </div>
    </header>
    <body>
      <p class="user-post">${escape(tweet.content.text)}</p>
    </body>
    <footer>
      <div>
      ${timeago.format(tweet.created_at)}
      </div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>

  </article>`

    return $tweet;
  };


  $('.form').submit(function(event) {
    event.preventDefault();
    const tweetData = $('#tweet-text').val();
    if (tweetData.length === 0) {
      $(".error").text("Please enter a message to tweet.");
    } else if (tweetData.length > 140) {
      $(".error").text("Your tweet is too long. Please shorten your message to 140 characters.");
    } else {
      const serializeTweet = $(this).serialize();
      $.post('http://localhost:8080/tweets', serializeTweet, (result) => {
        loadTweets();
      });
    }
  });

  const loadTweets = () => {
    $.get('http://localhost:8080/tweets', (data) => {
      console.log(data);
      renderTweets(data);
    });
  };

  loadTweets();
  });




