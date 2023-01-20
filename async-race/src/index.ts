import  React  from "react";
import * as ReactDOM from "react-dom/client";
import { App } from './app';
import './style.css';

const rootDiv = document.getElementById('root');
if (rootDiv === null || !(rootDiv instanceof HTMLElement)) {
  throw new Error("error");
}
const root = ReactDOM.createRoot(rootDiv);
root.render(React.createElement(App));
