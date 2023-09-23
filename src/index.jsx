import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { useState } from "react";

import { Popover } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { Filter } from "./components/filter";
import PluginList from "./components/pluginList";
import db from "./database.json";

export function App() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Order of Goodness");
  return (
    <main className="bg-gray-800 w-screen h-screen text-gray-200 overflow-hidden ">
      <div className="p-4 lg:p-8 flex flex-col gap-8 h-full">
        <div className="text-center flex flex-col gap-4 items-center justify-center mt-4">
          <h1 className="text-3xl font-bold md:text-5xl max-w-xl">Airwindows Cheatsheet</h1>
          <Popover className="relative">
            <div className="text-gray-400 max-w-xl">
              Cheatsheet for the <strong className="text-white bg-green-700 saturate-50 px-1 ">{db.plugins.length}</strong>{" "}
              <a className="text-gray-300 font-bold hover:text-white" href="https://www.airwindows.com">
                Airwindows
              </a>{" "}
              plugins. This project aims to build an automated frontend for the{" "}
              <a href="https://www.airwindows.com/wp-content/uploads/Airwindopedia.txt">airwindowpedia</a> documentation file.
              <span className="ml-2">
                <Popover.Button>
                  <InformationCircleIcon className="h-4 w-4"></InformationCircleIcon>
                </Popover.Button>

                <Popover.Panel className="absolute z-10 bg-gray-900 rounded border-2 border-gray-600 shadow-2xl mt-4">
                  <div className="text-sm p-16 text-gray-300 italic text-center">
                    The content of airwindopedia (used in this page) is property of Chris Johnson © 2023{" "}
                    <a href="https://www.airwindows.com" target="_blank" rel="noreferrer">
                      Airwindows | handsewn bespoke digital audio.
                    </a>
                    <p>
                      This site is GPLv3, source code available at{" "}
                      <a href="https://github.com/ajboni/airwindows-cheatsheet" target="_blank" rel="noreferrer">
                        Github
                      </a>
                    </p>
                    <p>
                      <strong>Remember</strong>: {'"In a mix, no one can hear your screen."'}
                    </p>
                  </div>
                </Popover.Panel>
              </span>
            </div>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <Filter
            db={db}
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
          >
            {" "}
          </Filter>
        </div>
        <PluginList db={db} filter={filter} search={search} sortBy={sortBy}></PluginList>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
