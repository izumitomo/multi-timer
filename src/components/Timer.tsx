import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Stopwatch from "./Stopwatch";

function Timer({ id }: { id: number }) {
  const [category, setCategory] = useState("");
  const [event, setEvent] = useState("");
  const [memo, setMemo] = useState("");
  const workerRef = useRef(
    new Worker(new URL("../worker/stopwatch.ts", import.meta.url))
  );

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
    const storedEvent = localStorage.getItem(`event-${id}`);
    const storedMemo = localStorage.getItem(`memo-${id}`);
    if (storedCategory) {
      setCategory(storedCategory);
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
      <Stopwatch id={id} workerRef={workerRef} />
    </>
  );
}

export default Timer;
