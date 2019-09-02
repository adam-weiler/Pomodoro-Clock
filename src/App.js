import React, { Component } from "react";
//import LengthComponent from './LengthComponent';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break_length: 5, //User's input for Break Length.
      session_length: 25, //User's input for Session length.
      timeInSeconds: 1500, //Current timer's length in seconds.
      tickingClock: false, //Tracks whether the clock is ticking (true) or not (false).
      timeoutMethod: "", //Stores the timeout method.
      seshOrBreak: "Session" //Stores the string for 'Session' or 'Break'.
    };
    //this.toggleStartStop = this.toggleStartStop.bind(this); //The Start Stop button function.
    this.aTickingClock = this.aTickingClock.bind(this); //The timeout function.
    //this.whatTimeIsIt = this.whatTimeIsIt.bind(this); //?
    //this.resetClick = this.resetClick.bind(this); //Resets all timers to default.
  }

  componentDidMount() {
    //When the webpage first loads.
    const fCCscript = document.createElement("script");
    fCCscript.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    fCCscript.async = true;
    document.body.appendChild(fCCscript); //Needed to for freeCodeCamp Test Suite.
  }

  handleUpdateCounter(counterId, operation, event) {
    //Handles all increment, decrement buttons.
    let ourLength = this.state[counterId]; //break_length or session_length
    let ourSeconds = this.state.timeInSeconds; //Hypothetical time in seconds.

    console.log("1 HandleUpdateCounter.");
    // console.log("counterId: ", counterId); //break_length or session_length
    // console.log("operation: ", operation); //decrement or increment
    // console.log("ourLength: ", ourLength); //25 or 5 at first
    // console.log("ourSeconds: ", ourSeconds); //1500 at first

    if (ourLength > 1 && operation === "decrement") {
      //User clicked on down arrow for Break or Session lengths.
      ourLength = ourLength - 1;
    }

    if (ourLength < 60 && operation === "increment") {
      //User clicked on up arrow for Break or Session lengths.
      ourLength = ourLength + 1;
    }

    if (counterId === "session_length") {
      //If user has changed session_length, ourSeconds variable is updated to reflect this.
      ourSeconds = ourLength * 60;
    }

    this.setState({
      [counterId]: ourLength, //break_length or session_length is increased or decreased by 1.
      timeInSeconds: ourSeconds //The current timer is increased or decreased by 60 seconds.
    });
  }

  toggleStartStop() {
    //Toggles the clock to start or stop.
    let startOrStop;

    console.log("2 toggleStartStop");
    // console.log("session_length: " + this.state.session_length); //by default, 25.
    // console.log("break_length: " + this.state.break_length); //by default, 5.
    // console.log("tickingClock: " + this.state.tickingClock); //true or false.
    // console.log("timeInSeconds: " + this.state.timeInSeconds); //The current timer's time remaining.

    if (this.state.tickingClock === false) {
      //The clock is not running.
      //console.log("2a The clock is not running. I will start.");
      startOrStop = true; //Updates the flag to indicate the clock is starting.
      this.aTickingClock(); //Starts the clock function.
    } else {
      //The clock is running.
      //console.log("2b The clock is running. I will stop.");
      startOrStop = false; //Updates the flag to indicate the clock is stopping.
      clearTimeout(this.state.timeoutMethod); //Stops the clock function.
    }

    this.setState({
      tickingClock: startOrStop, //The clock is either turned on (true) or off (false).
      timeInSeconds: this.state.timeInSeconds
    });
  }

  aTickingClock() {
    console.log("3 aTickingClock");
    // console.log("timeInSeconds: ", this.state.timeInSeconds);

    if (this.state.timeInSeconds !== 0) {
      this.setState({
        timeoutMethod: setTimeout(this.aTickingClock, 1000), //1000 //25
        timeInSeconds: this.state.timeInSeconds - 1
      });
    } else {
      let sessionOrBreak;
      let ourTimeInSeconds;
      let ourBeep = document.getElementById("beep");
      if (this.state.seshOrBreak === "Session") {
        // console.log("Session done!");
        ourBeep.play();
        sessionOrBreak = "Break";
        ourTimeInSeconds = (this.state.break_length + 1) * 60;
        // console.log("ourTimeInSeconds: " + ourTimeInSeconds);
        // console.log("this.state.sessionlength: " + this.state.break_length);
      } else if (this.state.seshOrBreak === "Break") {
        // console.log("Break done!");
        ourBeep.play();
        sessionOrBreak = "Session";
        ourTimeInSeconds = (this.state.session_length + 1) * 60;
        // console.log("ourTimeInSeconds: " + ourTimeInSeconds);
        // console.log("this.state.sessionlength: " + this.state.session_length);
      }

      clearTimeout(this.state.timeoutMethod);

      // console.log("sessionOrBreak: " + sessionOrBreak);
      // console.log("ourTimeInSeconds: " + ourTimeInSeconds);
      // console.log("this.state.break_length: " + this.state.break_length);
      // console.log("this.state.sessionlength: " + this.state.session_length);

      this.setState({
        //Start the break.
        seshOrBreak: sessionOrBreak,

        //session_length: 1, //25
        timeInSeconds: ourTimeInSeconds //1499
      });
      this.aTickingClock();
    }
  }

  whatTimeIsIt() {
    //Takes the current timer's time and returns a clock value. ie: 25:00.
    let minutes = Math.floor(this.state.timeInSeconds / 60);
    let seconds = Math.floor(this.state.timeInSeconds % 60);

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  resetClick() {
    //Resets the clock and all variables.
    console.log("4 I will reset the timer, and the settings.");
    clearTimeout(this.state.timeoutMethod);

    let ourBeep = document.getElementById("beep");
    ourBeep.pause();
    ourBeep.currentTime = 0;

    this.setState({
      break_length: 5,
      session_length: 25,
      tickingClock: false,
      timeInSeconds: 1500,
      timeoutMethod: "",
      seshOrBreak: "Session"
    });

    // console.log("break_length: " + this.state.break_length);
    // console.log("session_length: " + this.state.session_length);
    // console.log("tickingClock: " + this.state.tickingClock);
    // console.log("timeInSeconds: " + this.state.timeInSeconds);
  }

  render() {
    return (
      <div className="App" id="App">
        <h1>Pomodoro Clock in React:</h1>
        <div id="both-labels">
          <div id="leftComponent">
            <div id="break-label">Break Length</div>
            <div className="allButtons">
              <button
                id="break-decrement"
                onClick={this.handleUpdateCounter.bind(
                  this,
                  "break_length",
                  "decrement"
                )}
              >
                ▼
              </button>
              <div id="break-length">{this.state.break_length}</div>
              <button
                id="break-increment"
                onClick={this.handleUpdateCounter.bind(
                  this,
                  "break_length",
                  "increment"
                )}
              >
                ▲
              </button>
            </div>
          </div>

          {/*<LengthComponent clicker={this.handleUpdateCounter} thisLength={this.state.break_length}/>*/}

          <div id="rightComponent">
            <div id="session-label">Session Length</div>
            <div className="allButtons">
              <button
                id="session-decrement"
                onClick={this.handleUpdateCounter.bind(
                  this,
                  "session_length",
                  "decrement"
                )}
              >
                ▼
              </button>
              <div id="session-length">{this.state.session_length}</div>
              <button
                id="session-increment"
                onClick={this.handleUpdateCounter.bind(
                  this,
                  "session_length",
                  "increment"
                )}
              >
                ▲
              </button>
            </div>
          </div>
        </div>

        <div id="timer-label">
          {this.state.seshOrBreak}:
          <audio
            className="clip"
            id="beep"
            src="https://onlineclock.net/audio/options/default.mp3"
          />
          <div id="time-left">{this.whatTimeIsIt()}</div>
          <button id="start_stop" onClick={this.toggleStartStop.bind(this)}>
            Start Stop
          </button>
          <button id="reset" onClick={this.resetClick.bind(this)}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
