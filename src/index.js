import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Contexts
import { ProductsProvider } from "./contexts/productsContext/ProductsContext";
import { AuthProvider } from "./contexts/authContext/AuthContext";
import { BasketProvider } from "./contexts/basketContext/BasketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <ProductsProvider>
        <BasketProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BasketProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
