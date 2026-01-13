import { useEffect, useRef, useState } from "react";
import "./CountDown.css";

const timeType = {
  hour: "hour",
  minute: "minute",
  second: "second",
};

const initialState = { hour: "", minute: "", second: "" };

export const CountDown = () => {
  const [time, setTime] = useState(initialState);

  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef(null);

  const handleInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    let newValue;
    if (type === timeType.second || type === timeType.minute) {
      if (value > 59) newValue = 59;
      else if (value < 0) newValue = 0;
      else newValue = value;
    }

    if (type === timeType.hour) {
      if (value > 24) newValue = 24;
      else if (value < 0) newValue = 0;
      else newValue = value;
    }

    const newTime = { ...time };
    newTime[type] = newValue;

    setTime(newTime);
  };

  const handleStart = () => {
    if (!isActive) setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      if (
        time.hour.length === 0 &&
        time.minute.length === 0 &&
        time.second.length === 0
      ) {
        setIsActive(false);
        setTime(initialState);
      }

      timerRef.current = setTimeout(() => {
        setTime((prevTime) => {
          let { hour, minute, second } = prevTime;

          second--;
          if (second < 0) {
            minute--;
            second = 59;
            if (minute < 0) {
              hour--;
              minute = 59;

              if (hour < 0) {
                clearTimeout(timerRef.current);
                setIsActive(false);
                return initialState;
              }
            }
          }

          return { hour, minute, second };
        });
      }, 1000);
    }

    return () => clearTimeout(timerRef.current);
  });

  const handleReset = () => {
    setIsActive(false);
    setTime(initialState);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  return (
    <div>
      <h2>CountDown</h2>
      <div>
        {isActive ? (
          <>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
          </>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
      </div>

      <div>
        <input
          value={time.hour}
          placeholder="00"
          disabled={isActive}
          onChange={(e) => handleInputChange(e, timeType.hour)}
        />
        :
        <input
          value={time.minute}
          placeholder="00"
          disabled={isActive}
          onChange={(e) => handleInputChange(e, timeType.minute)}
        />
        :
        <input
          value={time.second}
          placeholder="00"
          disabled={isActive}
          onChange={(e) => handleInputChange(e, timeType.second)}
        />
      </div>
    </div>
  );
};
