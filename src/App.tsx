import Stopwatch from "./components/Stopwatch";
import "./App.css";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";

function App() {
  // const [events, setEvents] = useState(Array.from({ length: 20 }, () => ""));
  // const [memos, setMemos] = useState(Array.from({ length: 20 }, () => ""));
  // const [times, setTimes] = useState(Array.from({ length: 20 }, () => 0));
  // const [timeStrings, setTimeStrings] = useState(
  //   Array.from({ length: 20 }, () => "00:00:00")
  // );

  const stopwatches = Array.from({ length: 10 }, (_, index) => (
    <Grid item xs={12} key={index}>
      <Stopwatch id={index} />
    </Grid>
  ));
  const [state, setState] = useState(true);

  const handleClear = () => {
    setState(!state);
    localStorage.clear();
  };

  return (
    <>
      <h1>Multi Timer</h1>
      {state ? (
        <>
          <Button onClick={handleClear} variant="contained" color="error">
            Clear All
          </Button>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Grid container spacing={2}>
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                {stopwatches}
              </Box>
            </Grid>
          </Box>
        </>
      ) : (
        <Button onClick={handleClear} variant="contained" color="primary">
          Ready?
        </Button>
      )}
    </>
  );
}

export default App;
