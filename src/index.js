import React from "react";
import ReactDOM from "react-dom";
import Chat from "./components/container/Chat";

const wrapper = document.getElementById("create-article-form");

if (wrapper) {
  ReactDOM.render(<Chat />, wrapper);
}
