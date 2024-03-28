import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import UserProvider from "./context/UserProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
