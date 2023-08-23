export default function timer(dateEnd) {


  timerBlock(dateEnd, '#days', '#hours', '#minutes', '#seconds');

  function timerBlock(dateEnd, days, hours, minutes, seconds) {
    let dayIndicate = document.querySelector(days),
      hourIndicate = document.querySelector(hours),
      minutesIndicate = document.querySelector(minutes),
      secondsIndicate = document.querySelector(seconds),
      interval = setInterval(calculatingTime, 1000);
    calculatingTime();
    return;


    function calculatingTime() {
      let DateNow = new Date(),
        dayRemaining = 0,
        hourRemaining = 0,
        minutesRemaining = 0,
        secondRemaining = 0,
        timeBetween = Date.parse(dateEnd) - Date.parse(DateNow);

      if (timeBetween > 0) {
        dayRemaining = Math.floor(timeBetween / (1000 * 60 * 60 * 24)),
          hourRemaining = Math.floor((timeBetween / (1000 * 60 * 60)) % 24),
          minutesRemaining = Math.floor((timeBetween / (1000 * 60)) % 60),
          secondRemaining = Math.floor((timeBetween / 1000) % 60);
      }


      if (timeBetween <= 0) clearInterval(interval);

      if (dayRemaining < 10) dayRemaining = `0${dayRemaining}`;
      if (hourRemaining < 10) hourRemaining = `0${hourRemaining}`;
      if (minutesRemaining < 10) minutesRemaining = `0${minutesRemaining}`;
      if (secondRemaining < 10) secondRemaining = `0${secondRemaining}`;

      dayIndicate.textContent = dayRemaining;
      hourIndicate.textContent = hourRemaining;
      minutesIndicate.textContent = minutesRemaining
      secondsIndicate.textContent = secondRemaining;


    }
  }

}