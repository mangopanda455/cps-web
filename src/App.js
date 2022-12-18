import './App.css';
import React, {useEffect, useRef, useState} from 'react'
import flamethrower from 'flamethrower-router';
const router = flamethrower({ prefetch: 'visible', log: false, pageTransitions: false });

function App() {
  let thingy = 0;
  if (thingy === 0) {
    console.log("thingy is 0");
  }
  else if (thingy > 0) {

  }
  const [count, setCount] = useState(0)
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');


  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }


  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
        = getTimeRemaining(e);
    if (total >= 0) {

      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
          (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }


  const clearTimer = (e) => {

    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00:00:10');
    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);

    return deadline;
  }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  }
  const incrementCounter=()=> {
    setCount(count + 1);
  }

  function start() {
    document.getElementById("startid").style.display = "none";
    document.getElementById("clickMeId").style.display = "inline-block";
    onClickReset();
  }

  function reset() {
    document.getElementById("startid").style.display = "inline-block";
    document.getElementById("clickMeId").style.display = "none";
    document.getElementById("cpstextid").style.display = "none";
    document.getElementById("resetid").style.display = "none";
    setCount(0);
  }

  function onClickFunc() {
    thingy++;
    if (count === 0) {
      incrementCounter();
    }
    if (count > 0 && timer !== '00:00:00') {
      incrementCounter();
    }
  }
  if (count > 0 && timer === '00:00:00') {
    document.getElementById('cpstextid').style.display = 'block';
    document.getElementById("resetid").style.display = "inline-block";
  }
  const cps = count / 10;
  return (
      <div className="App">
        <div className={"wrapper"}>
          <button className={"start"} id={"startid"} onClick={start}>
            Start
          </button>
          <button className={"clickMe"} id={"clickMeId"} onClick={onClickFunc}>
            {timer}, {count}
          </button>
          <h1 className={"cpstext"} id={"cpstextid"}>
            Your CPS is: {cps}
          </h1>
          <button className={"reset"} id={"resetid"} onClick={reset}>
            Reset
          </button>
        </div>
      </div>
  );
}

export default App;
