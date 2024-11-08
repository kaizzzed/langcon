//the index is calling from app and displaying it by sending html to user client
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux";
import "./index.scss"
import { store } from "./store/store"

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
export {}



