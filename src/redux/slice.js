import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const trackerSlice = createSlice({
  name: 'tracker',
  initialState: {
    timers: [],
  },
  reducers: {
    addTimer(state, action) {
      state.timers.unshift({
        id: nanoid(),
        timerName: action.payload,
        timerActive: false,
        time: {
          hours: '00',
          mins: '00',
          secs: '00',
          },
        intervalId: null,
      });
    },
    deleteTimer(state, action) {
      state.timers = state.timers.filter(
        timer => timer.id !== action.payload.id
      );
    },
    changeTimer(state, action) {
      state.timers.map(timer =>
        timer.id === action.payload
          ? (timer.timerActive = !timer.timerActive)
          : timer
      );
    },
    startTimer(state, action) {
      state.timers.map(timer => {
          if (timer.id === action.payload.id) {
          return (
            (timer.time.hours = action.payload.hours),
            (timer.time.mins = action.payload.mins),
              (timer.time.secs = action.payload.secs),
              (timer.intervalId = action.payload.intervalId)
          );
        } else {
          return timer;
        }
      });
      },
      stopTimer(state, action) {
       state.timers.map(timer =>
        timer.id === action.payload
          ? (timer.intervalId = null)
          : timer
      );       
    }
  },
});

export const { addTimer, deleteTimer, changeTimer, startTimer, stopTimer } =
  trackerSlice.actions;
export default trackerSlice;
