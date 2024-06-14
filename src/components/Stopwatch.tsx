import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function Stopwatch({
  id,
  workerRef,
}: {
  id: number;
  workerRef: React.MutableRefObject<Worker>;
}) {
  const [time, setTime] = useState(0);
  const [timeString, setTimeString] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(0);

  const handleStart = () => {
    setIsRunning(true);
    workerRef.current.postMessage({ action: "start", time: time });
  };

  const handleStop = () => {
    setIsRunning(false);
    workerRef.current.postMessage({ action: "stop" });
    clearInterval(intervalRef.current);
    console.log("Stop the timer");
    localStorage.setItem(`time-${id}`, time.toString());
  };

  const handleReset = () => {
    setIsRunning(false);
    workerRef.current.postMessage({ action: "reset" });
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
  useEffect(() => {
    const storedTime = localStorage.getItem(`time-${id}`);
    if (storedTime) {
      setTime(Number(storedTime));
      setTimeString(
        new Date(Number(storedTime) * 1000).toISOString().substr(11, 8)
      );
    }
    workerRef.current.addEventListener("message", (e) => {
      console.log("Message received from worker", e.data);
      setTime((time) => {
        const newTime = time + 1;
        localStorage.setItem(`time-${id}`, newTime.toString());
        setTimeString(new Date(newTime * 1000).toISOString().substr(11, 8));
        return newTime;
      });
    });
  }, []);

  return (
    <>
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
