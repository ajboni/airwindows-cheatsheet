import {
  ArrowUturnLeftIcon,
  ClipboardIcon,
  DocumentIcon,
  DocumentTextIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import NotesEditor from "./notes"; // Import the NotesEditor component

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { isFavorite, toggleFavorite, getFavorites } from "../utils/pluginStorage";
import { getNotes } from "../utils/pluginStorage";

function PluginList({ db, filter, search, sortBy }) {
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  const introText = `This area contains the airwindopedia introduction written by Chris Johnson in his blog and the plugin description if selected.\n\n${db.introText}`;
  const [debouncedSearch] = useDebounce(search, 200);
  const [isNotesEditorVisible, setIsNotesEditorVisible] = useState(false);

  /* Set/Unset Favorite from storage */
  useEffect(() => {
    if (selectedPlugin) {
      setIsFavoriteState(isFavorite(selectedPlugin.name));
    }
  }, [selectedPlugin]);

  /* Filter By Categories */
  let filteredPlugins = db.plugins.filter((x) => x.category === filter);

  if (filter === "All") filteredPlugins = db.plugins;
  if (filter === "Favorites") filteredPlugins = db.plugins.filter((x) => getFavorites().includes(x.name));

  /* Filter with the text/description filter (if any)  */
  filteredPlugins = filteredPlugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      plugin.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  /* Filter sort by Chris' order of goodness if set  */
  if (sortBy === "Order of Goodness" && filter !== "Favorites") {
    if (filter === "All") {
      // Sort by category first
      filteredPlugins = filteredPlugins.sort((a, b) => a.category.localeCompare(b.category));

      // Then, within each category, sort by goodness
      filteredPlugins.sort((a, b) => (a.category === b.category ? a.goodness - b.goodness : 0));
    } else {
      // In a filtered view, just sort by goodness.
      filteredPlugins = filteredPlugins.sort((a, b) => a.goodness > b.goodness);
    }
  }

  const handleToggleFavorite = (plugin) => {
    const newIsFavorite = toggleFavorite(plugin.name);
    setIsFavoriteState(newIsFavorite);
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

  const handleOpenNotesEditor = () => {
    setIsNotesEditorVisible(true);
  };

  const handleCloseNotesEditor = () => {
    setIsNotesEditorVisible(false);
  };

  return (
    <div className="flex border rounded border-gray-600 h-full overflow-hidden">
      <div className="flex w-full lg:w-7/12 border-r border-gray-600 flex-shrink-0 overflow-auto">
        <div className="flex flex-col w-full">
          {filteredPlugins.map((plugin, index) => {
            const selectedBg = selectedPlugin?.name === plugin.name ? "!bg-blue-800 saturate-50" : "";
            const zebraBg = index % 2 === 0 ? "bg-gray-700" : "";
            return (
              <div
                key={index}
                className={`relative px-4 lg:px-2 py-2 lg:py-1 flex-col flex lg:flex-row gap-2 lg:gap-8 ${selectedBg} ${zebraBg} cursor-pointer hover:opacity-90`}
                onClick={() => setSelectedPlugin(plugin)}
              >
                <div className={`min-w-[20ch] font-bold text-gray-50  text-sm`}>{highlightSearch(plugin.name)}</div>
                <div className="text-sm flex-grow leading-6">{highlightSearch(plugin.shortDescription)}</div>
                {filter === "All" && (
                  <div className="text-xs flex-shrink-0 text-right italic lg:relative absolute right-2 top-2">
                    {plugin.category}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Description Area */}
      <div className="hidden h-full overflow-auto pt-12 pb-24 lg:pb-8 lg:w-5/12 lg:relative  bg-gray-800 lg:flex text-gray-200 p-8 whitespace-pre-wrap flex-col gap-6">
        <div className="prose mx-auto text-gray-100 font-bold text-3xl underline underline-offset-4 break-words ">
          {selectedPlugin?.name || "Airwindopedia"}
        </div>
        <div className="leading-7 prose text-gray-100 mx-auto">{selectedPlugin?.description || introText}</div>

        {/* Desktop Favorite */}
        <div
          className="absolute left-4 top-4 cursor-pointer hover:opacity-90"
          title={isFavoriteState ? "Remove from favorites" : "Add to favorites"}
          onClick={() => handleToggleFavorite(selectedPlugin)}
        >
          {selectedPlugin && (
            <>{isFavoriteState ? <StarSolid className="h-6 w-6"></StarSolid> : <StarOutline className="h-6 w-6"></StarOutline>}</>
          )}
        </div>
        {/* Add user notes for selected plugin */}
        {selectedPlugin && (
          <div
            className="absolute right-4 top-4 cursor-pointer hover:opacity-90"
            title={getNotes(selectedPlugin?.name) ? "Edit Notes" : "Add Notes"}
            onClick={handleOpenNotesEditor}
          >
            {getNotes(selectedPlugin?.name) ? <PencilSquareIcon className="h-6 w-6" /> : <DocumentTe className="h-6 w-6" />}
          </div>
        )}
      </div>

      {/* Mobile */}
      {selectedPlugin && (
        <div className="p-8 w-screen h-screen lg:hidden absolute top-0 bottom-0 left-0 right-0 z-40  bg-gray-800  whitespace-pre-wrap flex flex-col gap-6 pt-12 pb-24 overflow-auto">
          <div className="prose mx-auto text-gray-100 font-bold text-3xl underline underline-offset-4 break-words ">
            {selectedPlugin?.name || "Airwindopedia"}
          </div>
          <div className="leading-7 prose text-gray-100 mx-auto">{selectedPlugin?.description || introText}</div>

          {/* Mobile Action Bar */}
          <div className="fixed lg:hidden right-0 left-0 bottom-0  bg-gray-900 saturate-50   cursor-pointer flex divide-x divide-gray-600 w-full">
            <div
              className="flex items-center gap-2 border-r border-gray-600 w-1/2 hover:bg-gray-800 px-3 py-2"
              onClick={() => handleToggleFavorite(selectedPlugin)}
            >
              {selectedPlugin && (
                <>
                  {isFavoriteState ? (
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
              className="flex gap-2 justify-center items-center w-1/2 hover:bg-gray-800 px-3 py-2"
              onClick={handleOpenNotesEditor}
            >
              <PencilSquareIcon className="h-4 w-4" />
              <span>{getNotes(selectedPlugin?.name) ? "Edit Notes" : "Add Notes"}</span>
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

      {/* Notes Editor */}
      <NotesEditor onBack={handleCloseNotesEditor} visible={isNotesEditorVisible} selectedPlugin={selectedPlugin} />
    </div>
  );
}

export default PluginList;
