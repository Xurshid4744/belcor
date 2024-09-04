import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import { store, persister } from "./store/store.ts";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
);
