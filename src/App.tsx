import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const [timeLeft, setTimeLeft] = useState(0.1*60);
  const [isRunning, setIsRunning] = useState(false);

  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState('');

  const isBreakRef = useRef(isBreak);

  useEffect(() => {
    isBreakRef.current = isBreak;
  }, [isBreak])

  const cheerMessages = [
    "You Can Do It!",
    "I believe in you!",
    "You're amazing!",
    "Keep going!",
    "Stay focused!"
  ];

  const breakMessages = [
    "Stay hydrated!",
    "Snacks, maybe?",
    "Text me!",
    "Just rest zzz",
    "Stretch your legs!"
  ]

  useEffect(() => {
    let messageInterval: ReturnType<typeof setTimeout>;
    if( isRunning ) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000);
    } else {
      setEncouragement('');
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if( isRunning ) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            const newIsBreak = !isBreakRef.current;
            setIsBreak(newIsBreak);
            return newIsBreak ? 5*60 : 25*60;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    return() => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode? 5*60 : 25*60);
  }

  const handleClick = () => {
    if( !isRunning ) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }

  return (
    <>
      <div style={{position: 'relative'}}>
        <div className='header-actions'>
          <button className='close-button'>
            Close
          </button>
        </div>
        <div className='home-content'>
          <div className='home-controls'>
            <button className='image-button' onClick={ () => switchMode(false) }>
              Work
            </button>
            <button className='image-button' onClick={ () => switchMode(true) }>
              Break
            </button>
          </div>

          <p className={`encouragement-text ${!isRunning ? 'hidden' : ''}`}>
            { encouragement }
          </p>

          <h1 className='home-timer'>{ formatTime(timeLeft) }</h1>

          <button className='home-button' onClick={handleClick}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
