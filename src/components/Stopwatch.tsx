import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function Stopwatch({ id }: { id: number }) {
  const [event, setEvent] = useState("");
  const [memo, setMemo] = useState("");
  const [time, setTime] = useState(0);
  const [timeString, setTimeString] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(0);

  const handleStart = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((time) => {
        const newTime = time + 1;
        localStorage.setItem(`time-${id}`, newTime.toString());
        setTimeString(new Date(newTime * 1000).toISOString().substr(11, 8));
        return newTime;
      });
    }, 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    console.log("Stop the timer");
    localStorage.setItem(`time-${id}`, time.toString());
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setTimeString("00:00:00");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTimeString(inputValue);

    const timeParts = inputValue.split(":").map(Number);
    const [hours, minutes, seconds] = timeParts;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    console.log("totalSeconds", totalSeconds);
    setTime(totalSeconds);
  };

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(`event-${id}`, e.target.value);
    setEvent(e.target.value);
  };

  const handleMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(`memo-${id}`, e.target.value);
    setMemo(e.target.value);
  };

  useEffect(() => {
    const storedTime = localStorage.getItem(`time-${id}`);
    const storedEvent = localStorage.getItem(`event-${id}`);
    const storedMemo = localStorage.getItem(`memo-${id}`);
    if (storedTime) {
      setTime(Number(storedTime));
      setTimeString(
        new Date(Number(storedTime) * 1000).toISOString().substr(11, 8)
      );
    }
    if (storedEvent) {
      setEvent(storedEvent);
    }
    if (storedMemo) {
      setMemo(storedMemo);
    }
  }, []);

  return (
    <>
      <TextField
        value={event}
        id={`event-${id}`}
        label="event"
        variant="standard"
        sx={{ width: "50%" }}
        onChange={handleEvent}
      />
      <TextField
        value={memo}
        id={`memo-${id}`}
        label="memo"
        variant="standard"
        sx={{ width: "50%" }}
        onChange={handleMemo}
      />
      {isRunning ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStop}
          sx={{ margin: "10px 10px" }}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          sx={{ margin: "10px 10px" }}
        >
          Start
        </Button>
      )}
      <Button
        variant="contained"
        color="warning"
        onClick={handleReset}
        sx={{ margin: "10px 10px" }}
      >
        Reset
      </Button>
      <TextField value={timeString} onChange={handleChange} id={`time-${id}`} />
    </>
  );
}

export default Stopwatch;
