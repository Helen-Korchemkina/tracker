import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getTimers } from 'redux/selectors';
import { deleteTimer } from 'redux/slice';
import {
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai';
import { IconContext } from 'react-icons';
import s from './TimersList.module.css';

const TimersList = ({ start, stop }) => {
  const dispatch = useDispatch();
  const timers = useSelector(getTimers);

  return (
    <ul className={s.list}>
      {timers.map(({ id, timerName, timerActive, time, intervalId }) => (
        <li className={timerActive ? s.activeTimer : s.timer} key={id}>
          <p>{timerName}</p>
          <div className={s.div}>
            <p className={s.time}>
              {time.hours}:{time.mins}:{time.secs}
            </p>
            <button
              className={s.btn}
              type="button"
              onClick={() => {
                timerActive
                  ? stop({ id, intervalId })
                  : start({ id, intervalId, time });
              }}
            >
              {timerActive ? (
                <IconContext.Provider value={{ color: 'black', size: '34px' }}>
                  <div>
                    <AiOutlinePauseCircle className={s.icon} />
                  </div>
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ color: 'black', size: '34px' }}>
                  <div>
                    <AiOutlinePlayCircle className={s.icon} />
                  </div>
                </IconContext.Provider>
              )}
            </button>
            <button
              className={s.btn}
              type="button"
              onClick={() => dispatch(deleteTimer({ id }))}
            >
              <IconContext.Provider value={{ color: 'red', size: '34px' }}>
                <div>
                  <AiOutlineMinusCircle className={s.icon} />
                </div>
              </IconContext.Provider>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TimersList;
