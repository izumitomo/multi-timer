let interval: number;
onmessage = (e) => {
  if (e.data.action === "start") {
    let seconds = e.data.time;
    interval = setInterval(() => {
      seconds++;
      self.postMessage({ seconds });
    }, 1000);
  } else if (e.data.action === "stop") {
    console.log("Stop the timer");
    clearInterval(interval);
  } else if (e.data.action === "reset") {
    console.log("Reset the timer");
    clearInterval(interval);
  }
};
