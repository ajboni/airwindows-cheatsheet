import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { useState } from "react";

import db from "./database.json";
import { Filter } from "./components/filter";
import PluginList from "./components/pluginList";
import Footer from "./components/footer";

export function App() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  return (
    <main className="bg-gray-800 w-screen h-screen text-gray-200 overflow-auto">
      <div className="p-8 flex flex-col gap-8">
        <div className="text-center flex flex-col gap-4 items-center justify-center mt-4">
          <h1 className="text-3xl font-bold md:text-5xl max-w-xl">Airwindows Cheatsheet</h1>
          <p className="text-gray-400 max-w-xl">
            Cheatsheet for the <strong className="text-white bg-green-700 saturate-50 px-1 ">{db.plugins.length}</strong>{" "}
            <a className="text-gray-300 font-bold hover:text-white" href="https://www.airwindows.com">
              Airwindows
            </a>{" "}
            plugins. This project aims to build an automated frontend for the{" "}
            <a href="https://www.airwindows.com/wp-content/uploads/Airwindopedia.txt">airwindowpedia</a> documentation file.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Filter db={db} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch}></Filter>
        </div>
        <PluginList db={db} filter={filter} search={search}></PluginList>
      </div>
      <Footer></Footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
