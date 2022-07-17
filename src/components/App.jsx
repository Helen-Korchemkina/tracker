import TrackerForm from "./TrackerForm/TrackerForm";
import TimersList from "./TimersList/TimersList";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { changeTimer, startTimer, stopTimer } from 'redux/slice';
import { getTimers } from 'redux/selectors';
import { useEffect } from "react";

export const App = () => {

  const dispatch = useDispatch();
    const timers = useSelector(getTimers);

  
const start = ({ id, intervalId, time }) => {
    const localTime = Number(time.secs) * 1000 + Number(time.mins) * 60 * 1000 + Number(time.hours) * 60 * 60 * 1000;
    const startTime = Date.now();
    dispatch(changeTimer(id));

    intervalId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = currentTime - startTime + localTime;
      const { hours, mins, secs } = getTimeComponents(deltaTime);

      dispatch(startTimer({ id,hours, mins, secs, intervalId }));
    }, 1000);
      };
  
  const stop = ({ id, intervalId }) => {
    clearInterval(intervalId);
    dispatch(stopTimer(id));
    dispatch(changeTimer(id));
  };

  const pad = value => {
    return String(value).padStart(2, '0');
  };

      const getTimeComponents = time => {
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 99)) / (1000 * 60 * 60))
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
      };

  return (
    <div
      style={{
        height: '100vh',
        width: '560px',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >   
      <h1>tracker</h1>
      <TrackerForm />
      <TimersList stop={stop} start={start} />
    </div>    
  );
};

