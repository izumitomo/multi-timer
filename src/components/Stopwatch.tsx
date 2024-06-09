import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

function Stopwatch({ id }: { id: number }) {
  const [category, setCategory] = useState("");
  const [event, setEvent] = useState("");
  const [memo, setMemo] = useState("");
  const [time, setTime] = useState(0);
  const [timeString, setTimeString] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(0);
  const workerRef = useRef(
    new Worker(new URL("../worker/timer.ts", import.meta.url))
  );

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

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(`event-${id}`, e.target.value);
    setEvent(e.target.value);
  };

  const handleMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(`memo-${id}`, e.target.value);
    setMemo(e.target.value);
  };

  const handleCategory = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string);
    localStorage.setItem(`category-${id}`, e.target.value as string);
  };

  useEffect(() => {
    const storedCategory = localStorage.getItem(`category-${id}`);
    const storedTime = localStorage.getItem(`time-${id}`);
    const storedEvent = localStorage.getItem(`event-${id}`);
    const storedMemo = localStorage.getItem(`memo-${id}`);
    if (storedCategory) {
      setCategory(storedCategory);
    }
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>category</InputLabel>
        <Select
          id={`category-${id}`}
          label="category"
          value={category}
          onChange={handleCategory}
        >
          <MenuItem value={"インターンレビュー"}>インターンレビュー</MenuItem>
          <MenuItem value={"担当エピックタスク"}>担当エピックタスク</MenuItem>
          <MenuItem value={"担当外エピックタスク"}>
            担当外エピックタスク
          </MenuItem>
          <MenuItem value={"アラート系突発タスク"}>
            アラート系突発タスク
          </MenuItem>
          <MenuItem value={"定期mtg"}>定期mtg</MenuItem>
          <MenuItem value={"不定期mtg"}>不定期mtg</MenuItem>
          <MenuItem value={"スクラム系イベント"}>スクラム系イベント</MenuItem>
          <MenuItem value={"運用関連作業"}>運用関連作業</MenuItem>
          <MenuItem value={"その他雑務"}>その他雑務</MenuItem>
        </Select>
      </FormControl>
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
