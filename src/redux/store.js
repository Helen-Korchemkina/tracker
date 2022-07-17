import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import trackerSlice from "./slice";

const persistConfig = {
  key: 'timers',
  storage,
};

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        tracker: persistReducer(persistConfig, trackerSlice.reducer),
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };