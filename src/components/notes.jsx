import { useState, useEffect, useCallback } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { getNotes, setNotes } from "../utils/pluginStorage";
import debounce from "lodash/debounce";

const NotesEditor = ({ onBack, visible, selectedPlugin }) => {
  const [notes, setLocalNotes] = useState("");

  useEffect(() => {
    if (selectedPlugin) {
      setLocalNotes(getNotes(selectedPlugin.name));
    }
  }, [selectedPlugin]);

  const debouncedSave = useCallback((plugin, value) => {
    const saveNotes = debounce((p, v) => {
      setNotes(p, v);
    }, 500);
    saveNotes(plugin.name, value);
  }, []);

  const handleNotesChange = (e) => {
    const newValue = e.target.value;
    setLocalNotes(newValue);
    if (selectedPlugin) {
      debouncedSave(selectedPlugin, newValue);
    }
  };

  if (!visible) return null;
  console.log("Open");

  return (
    <div className="p-8 w-screen h-screen  absolute top-0 bottom-0 left-0 right-0 z-50 bg-gray-800 flex flex-col gap-6 pt-12 pb-20 overflow-hidden">
      <div className="prose leading-7 mx-auto text-gray-100 font-bold text-3xl underline underline-offset-4 break-words text-center">
        {selectedPlugin.name || "Airwindopedia"} Notes
      </div>

      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Enter your notes here..."
        className="leading-7 prose flex-grow bg-inherit text-gray-100 resize-none outline-none w-screen mx-auto"
      />

      <div className="fixed  right-0 left-0 bottom-0 bg-gray-900 saturate-50 cursor-pointer flex divide-x divide-gray-600 w-full">
        <div onClick={onBack} className="flex items-center gap-2 border-r border-gray-600 w-1/2 hover:bg-gray-800 px-3 py-2">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </div>
      </div>
    </div>
  );
};

export default NotesEditor;
