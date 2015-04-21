var textarea = $('textarea');
var tweetCounter = $('.tweet-counter');
var submitButton = $('input');
var tweetList = $('.tweets');
var firstTweet = $('.tweet').first();

var calculateRemaining = function () {
  var remaining = 140 - textarea.val().length;

  tweetCounter.text(remaining);

  tweetCounter.toggleClass('warning', remaining < 16 && remaining > -1);

  tweetCounter.toggleClass('error', remaining < 0);

  /* if (remaining < 16) {
    tweetCounter.addClass('warning');
  } else {
    tweetCounter.removeClass('warning');
  } */

  submitButton.prop('disabled', remaining < 0 || remaining === 140);
};

calculateRemaining();

textarea.on('keyup', calculateRemaining);

$('form').on('submit', function (event) {
  event.preventDefault();

  var newTweet = firstTweet.clone();

  newTweet.find('.tweet-content').text(textarea.val());

  newTweet.removeClass('favorited retweeted');

  tweetList.prepend(newTweet);
  // newTweet.prependTo(tweetList);

  textarea.val('');

  calculateRemaining();
});

$('.tweets').on('click', 'button', function () {
  var $this = $(this);
  var classToAdd;
  if ($this.hasClass('favorite')) {
    classToAdd = 'favorited';
  } else if ($this.hasClass('retweet')) {
    classToAdd = 'retweeted';
  }
  $this.closest('.tweet').toggleClass(classToAdd);
});