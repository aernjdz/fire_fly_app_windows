import React, { Component } from "react";
// import axios from 'axios';

// Helper function to format digits
const formatDigit = (digit) => (digit < 10 ? `0${digit}` : digit);

// Function component for AnimatedCard
const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// Function component for StaticCard
const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// Function component for FlipUnitContainer
const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  let currentDigit = digit;
  let previousDigit = digit - 1;

  // Handling roll-over for hours, minutes, and seconds
  if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  // Format digits with leading zeros
  currentDigit = formatDigit(currentDigit);
  previousDigit = formatDigit(previousDigit);

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';

  return (
    <div className={'flipUnitContainer'}>
      <StaticCard position={'upperCard'} digit={currentDigit} />
      <StaticCard position={'lowerCard'} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

// Class component for FlipClock
class FlipClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      hoursShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true,
      date: "", // Add state to store the date
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
    this.fetchTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Fetch time from API
  async fetchTime() {
    try {
      // const response = await axios.get('https://timeapi.io/api/Time/current/zone', {
      //   params: {
      //     timezone: 'Europe/Kiev', // Kyiv timezone
      //   }
      // });
      const time = new Date(); // Fallback to system time
      this.updateTimeFromAPI(time);
     // const time = new Date(response.data.dateTime);
     // this.updateTimeFromAPI(time);
    } catch (error) {
      console.error('Error fetching time:', error);
      const time = new Date(); // Fallback to system time
      this.updateTimeFromAPI(time);
    }
  }

  // Update time and shuffle animation state
  updateTimeFromAPI(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

   
    const options = {
        weekday: 'short', // Повний день тижня
        year: 'numeric', // Рік
        month: 'short',   // Повний місяць
        day: 'numeric',  // День
    };
    
    const date = time.toLocaleDateString('uk-UA', options); // Формат українською
    console.log(date); // Виведе: "субота, 7 грудня 2024 р."
    
    // Update hours, minutes, seconds, and date
    if (hours !== this.state.hours) {
      this.setState({ hours, hoursShuffle: !this.state.hoursShuffle });
    }
    if (minutes !== this.state.minutes) {
      this.setState({ minutes, minutesShuffle: !this.state.minutesShuffle });
    }
    if (seconds !== this.state.seconds) {
      this.setState({ seconds, secondsShuffle: !this.state.secondsShuffle });
    }
    if (date !== this.state.date) {
      this.setState({ date });
    }
  }

  // Update time every second
  updateTime() {
    this.fetchTime(); // Fetch time from API every second
  }

  render() {
    const {
      hours,
      minutes,
      seconds,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle,
      date,
    } = this.state;

    return (
      <div className="flex">
      <div className={'flipClock'}>
       
        <FlipUnitContainer unit={'hours'} digit={hours} shuffle={hoursShuffle} />
        <div className="separator">:</div>
        <FlipUnitContainer unit={'minutes'} digit={minutes} shuffle={minutesShuffle} />
        <div className="separator">:</div>
        <FlipUnitContainer unit={'seconds'} digit={seconds} shuffle={secondsShuffle} />
      </div>
      <div className="dateDisplay">{date}</div> {/* Display the date with day name in Ukrainian */}
      </div>
    );
  }
}

export { FlipClock };
