import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { useState } from "react";

import db from "./database.json";
import { Filter } from "./components/filter";
import PluginList from "./components/pluginList";

export function App() {
  const [filter, setFilter] = useState("All");
  return (
    <main className="bg-gray-800 w-screen h-screen text-gray-200 overflow-auto">
      <div className="p-8 flex flex-col gap-8">
        <div className="text-center flex flex-col gap-4 items-center justify-center">
          <h1 className="text-3xl md:text-5xl max-w-xl">Airwindows Cheatsheet</h1>
          <p className="text-gray-400 max-w-xl">
            Cheatsheet for
            <a className="text-gray-300 font-bold hover:text-white" href="https://www.airwindows.com">
              Airwindows
            </a>{" "}
            plugins. This project aims to build an automated frontend for the{" "}
            <a href="https://www.airwindows.com/wp-content/uploads/Airwindopedia.txt">airwindowpedia</a> documentation file.
          </p>
        </div>

        <Filter db={db} filter={filter} setFilter={setFilter}></Filter>
        <PluginList db={db} filter={filter}></PluginList>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
