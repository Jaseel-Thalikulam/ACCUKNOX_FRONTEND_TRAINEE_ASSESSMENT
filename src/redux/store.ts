import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedDashboardReducer = persistReducer(persistConfig,dashboardReducer);

export const store = configureStore({
  reducer: {
    dashboard: persistedDashboardReducer,
  },
});

export const persistor = persistStore(store);

export type rootState = ReturnType<typeof store.getState>;
