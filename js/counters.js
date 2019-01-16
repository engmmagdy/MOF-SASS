
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(clock, endtime) {
 // var clock = document.getElementById(id);
  var daysSpan = clock.find('.days').first();
  var hoursSpan = clock.find('.hours');
  var minutesSpan = clock.find('.minutes');
  var secondsSpan = clock.find('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
       daysSpan.text (t.days);
    hoursSpan.text  ( ('0' + t.hours).slice(-2));
    minutesSpan.text  (('0' + t.minutes).slice(-2));
    secondsSpan.text  ( ('0' + t.seconds).slice(-2));
    if (t.total <= 0) {
      //clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}


