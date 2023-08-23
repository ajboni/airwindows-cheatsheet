import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function PluginList({ db, filter, search }) {
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const introText = `The following is the airwindopedia introduction written by Chris Johnson in his blog (http://airwindows.com).\n\n${db.introText}`;
  const [debouncedSearch] = useDebounce(search, 200);

  /* Set/Unset Favorite from localstorage */
  useEffect(() => {
    if (selectedPlugin && localStorage.getItem(selectedPlugin.name)) {
      setIsFavorite(true);
      return;
    }
    setIsFavorite(false);
  }, [selectedPlugin]);

  /* Filter By Categories */
  let filteredPlugins = db.plugins.filter((x) => x.category === filter);

  if (filter === "All") filteredPlugins = db.plugins;
  if (filter === "Favorites") filteredPlugins = db.plugins.filter((x) => localStorage.getItem(x.name) !== null);

  /* Finally filter with the text/description filter (if any)  */
  filteredPlugins = filteredPlugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      plugin.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const toggleFavorite = (plugin) => {
    if (localStorage.getItem(plugin.name)) {
      localStorage.removeItem(plugin.name);
      setIsFavorite(false);
    } else {
      localStorage.setItem(plugin.name, "true");
      setIsFavorite(true);
    }
  };

  const highlightSearch = (text) => {
    if (!debouncedSearch || debouncedSearch == "") return text;
    const regex = new RegExp(`(${debouncedSearch.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gmi");
    const matches = text.match(regex);
    let x = text;
    if (matches) {
      matches.forEach((match) => {
        x = text.replaceAll(match, `<span class="bg-green-600 saturate-50 px-0.1 py-0">${match}</span>`);
      });
    }

    return <div dangerouslySetInnerHTML={{ __html: x }}></div>;
  };

  return (
    <div className="flex border rounded border-gray-600 divide-">
      <div className="flex w-full md:w-7/12 border-r border-gray-600 flex-shrink-0">
        <div className="flex flex-col w-full">
          {filteredPlugins.map((plugin, index) => {
            const selectedBg = selectedPlugin?.name === plugin.name ? "!bg-blue-800 saturate-50" : "";
            const zebraBg = index % 2 === 0 ? "bg-gray-700" : "";
            return (
              <div
                key={index}
                className={`px-4 md:px-2 py-4 md:py-1 flex-col flex md:flex-row gap-2 md:gap-8 ${selectedBg} ${zebraBg} cursor-pointer hover:opacity-90`}
                onClick={() => setSelectedPlugin(plugin)}
              >
                <div className={`min-w-[20ch] font-bold text-gray-50  text-sm`}>{highlightSearch(plugin.name)}</div>
                <div className="text-sm flex-grow leading-6">{highlightSearch(plugin.shortDescription)}</div>
                {filter === "All" && <div className="text-xs flex-shrink-0 text-right italic">{plugin.category}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Description Area */}
      <div className="hidden h-full overflow-auto pt-12 pb-24 md:pb-8 md:w-5/12 md:relative  bg-gray-800 md:flex text-gray-200 p-8 whitespace-pre-wrap flex-col gap-6">
        <div className="prose mx-auto text-gray-100 font-bold text-3xl underline underline-offset-4 break-words ">
          {selectedPlugin?.name || "Airwindopedia"}
        </div>
        <div className="leading-7 prose text-gray-100 mx-auto">{selectedPlugin?.description || introText}</div>

        {/* Desktop Favorite */}
        <div
          className="absolute left-4 top-4 cursor-pointer hover:opacity-90"
          title="Add/Remove from/to favorites"
          onClick={() => toggleFavorite(selectedPlugin)}
        >
          {selectedPlugin && (
            <>{isFavorite ? <StarSolid className="h-6 w-6"></StarSolid> : <StarOutline className="h-6 w-6"></StarOutline>}</>
          )}
        </div>
      </div>

      {/* Mobile */}
      {selectedPlugin && (
        <div className="w-screen h-screen md:hidden absolute top-0 bottom-0 left-0 right-0 z-40  bg-gray-800  whitespace-pre-wrap flex flex-col gap-6 pt-12 pb-24 overflow-auto">
          <div className="prose mx-auto text-gray-100 font-bold text-3xl underline underline-offset-4 break-words ">
            {selectedPlugin?.name || "Airwindopedia"}
          </div>
          <div className="leading-7 prose text-gray-100 mx-auto">{selectedPlugin?.description || introText}</div>

          {/* Mobile Action Bar */}
          <div className="fixed md:hidden right-0 left-0 bottom-0  bg-gray-900 saturate-50   cursor-pointer flex divide-x divide-gray-600 w-full">
            <div
              className="flex items-center gap-2 border-r border-gray-600 w-1/2 hover:bg-gray-800 px-3 py-2"
              onClick={() => toggleFavorite(selectedPlugin)}
            >
              {selectedPlugin && (
                <>
                  {isFavorite ? (
                    <div className="flex gap-2 justify-center items-center">
                      <StarSolid className="h-4 w-4"></StarSolid> <span>Remove from favorites</span>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center items-center">
                      <StarOutline className="h-4 w-4"></StarOutline> <span>Add to favorites</span>
                    </div>
                  )}
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
        </div>
      )}
    </div>
  );
}

export default PluginList;
