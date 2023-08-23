import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { ArrowLongLeftIcon, StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import plugin from "@tailwindcss/typography";

import React, { useEffect, useState } from "react";

function PluginList({ db, filter }) {
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedPlugin && localStorage.getItem(selectedPlugin.name)) {
      setIsFavorite(true);
      return;
    }

    setIsFavorite(false);
  }, [selectedPlugin]);

  let filteredPlugins = db.plugins.filter((x) => x.category === filter);

  if (filter === "All") filteredPlugins = db.plugins;
  if (filter === "Favorites") filteredPlugins = db.plugins.filter((x) => localStorage.getItem(x.name) !== null);

  const toggleFavorite = (plugin) => {
    if (localStorage.getItem(plugin.name)) {
      localStorage.removeItem(plugin.name);
      setIsFavorite(false);
    } else {
      localStorage.setItem(plugin.name, "true");
      setIsFavorite(true);
    }
  };

  let mobileDescriptionClass = selectedPlugin
    ? "w-screen h-screen md:h-full absolute top-0 bottom-0 left-0 right-0  z-40 overflow-auto"
    : "hidden";
  return (
    <div className="flex border rounded border-gray-600 divide-">
      <div className="flex w-full md:w-7/12 border-r border-gray-600 flex-shrink-0">
        <div className="flex flex-col w-full">
          {filteredPlugins.map((plugin, index) => {
            const selectedBg = selectedPlugin?.name === plugin.name ? "bg-blue-800 saturate-50" : "";
            const zebraBg = index % 2 === 0 ? "bg-gray-700" : "";
            return (
              <div
                key={index}
                className={`px-4 md:px-2 py-4 md:py-1 flex-col flex md:flex-row gap-2 md:gap-8 ${selectedBg} ${zebraBg} cursor-pointer hover:opacity-90`}
                onClick={() => setSelectedPlugin(plugin)}
              >
                <div className={`min-w-[20ch] font-bold text-gray-50  text-sm`}>{plugin.name}</div>
                <div className="text-sm flex-grow leading-6">{plugin.shortDescription}</div>
                {filter === "All" && <div className="text-xs flex-shrink-0 text-right italic">{plugin.category}</div>}
              </div>
            );
          })}
        </div>
      </div>
      {/* Description Area */}
      <div
        className={`${mobileDescriptionClass} pt-12 pb-24 md:pb-8 md:w-6/12 md:relative  bg-gray-800 flex text-gray-200 p-8 whitespace-pre-wrap flex-col gap-6`}
      >
        {selectedPlugin && (
          <>
            <div className="prose mx-auto text-gray-100 font-bold text-3xl underline underline-offset-4 break-words ">
              {selectedPlugin?.name}
            </div>
            <div className="leading-7 prose text-gray-100 mx-auto">{selectedPlugin?.description}</div>

            {/* Desktop Favorite */}
            <div
              className="absolute left-4 top-4 cursor-pointer hover:opacity-90"
              title="Add/Remove from/to favorites"
              onClick={() => toggleFavorite(selectedPlugin)}
            >
              {isFavorite ? <StarSolid className="h-6 w-6"></StarSolid> : <StarOutline className="h-6 w-6"></StarOutline>}
            </div>

            {/* Mobile Action Bar */}
            <div className="fixed md:hidden right-0 left-0 bottom-0  bg-gray-900 saturate-50   cursor-pointer flex divide-x divide-gray-600 w-full">
              <div
                className="flex items-center gap-2 border-r border-gray-600 w-1/2 hover:bg-gray-800 px-3 py-2"
                onClick={() => toggleFavorite(selectedPlugin)}
              >
                {isFavorite ? (
                  <>
                    <StarSolid className="h-4 w-4"></StarSolid> <span>Remove from favorites</span>
                  </>
                ) : (
                  <>
                    <StarOutline className="h-4 w-4"></StarOutline> <span>Add to favorites</span>
                  </>
                )}
              </div>
              <div
                className="flex gap-2 justify-end items-center w-1/2 text-right hover:bg-gray-800 px-3 py-2"
                onClick={() => setSelectedPlugin(null)}
              >
                <ArrowUturnLeftIcon className="h-4 w-4" />
                Close
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PluginList;
