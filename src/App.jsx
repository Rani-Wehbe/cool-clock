import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // update once per second
    return () => clearInterval(interval);
  }, []);

  const pad = (num) => String(num).padStart(2, "0");

  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());

  return (
    <div className="clock">
      <AnimatedDigit value={hours} />
      <span className="colon">:</span>
      <AnimatedDigit value={minutes} />
      <span className="colon">:</span>
      <AnimatedDigit value={seconds} />
    </div>
  );
}

function AnimatedDigit({ value }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 450); // smooth single flip
      return () => clearTimeout(timeout);
    }
  }, [value, prev]);

  return (
    <div className={`digit ${flipping ? "flip" : ""}`}>
      <div className="front">{prev}</div>
      <div className="back">{value}</div>
    </div>
  );
}

export default App;