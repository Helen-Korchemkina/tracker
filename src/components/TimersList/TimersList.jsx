import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getTimers } from 'redux/selectors';
import { deleteTimer} from 'redux/slice';

const TimersList = ({start, stop}) => {
  const dispatch = useDispatch();
  const timers = useSelector(getTimers);

  return (
    <ul>
      {timers.map(({ id, timerName, timerActive, time, intervalId }) => (
        <li
          key={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '20px',
            fontSize: '20px',
          }}
        >
          <p>{timerName}___</p>
          <p>
            {time.hours}:{time.mins}:{time.secs}__
          </p>
          <button
            type="button"
            onClick={() => {
              timerActive
                ? stop({ id, intervalId })
                : start({ id, intervalId, time });
            }}
          >
            {timerActive ? 'Stop' : 'Start'}
          </button>
          <button type="button" onClick={() => dispatch(deleteTimer({ id }))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TimersList;
