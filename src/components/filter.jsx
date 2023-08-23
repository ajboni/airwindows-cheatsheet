import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const Filter = ({ db, filter, setFilter, search, setSearch }) => {
  const categories = Object.keys(db.categories);
  categories.unshift("Favorites");
  categories.unshift("All");
  return (
    <>
      {/* Filter Buttons */}
      <ul role="list" className={`hidden md:grid grid-cols-2 gap-2  md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12`}>
        {categories.map((category) => {
          return (
            <li
              key={category}
              className={`${
                category === filter ? "bg-gray-500" : "bg-gray-700"
              } col-span-1 flex rounded-md shadow-sm  px-2 py-1 cursor-pointer hover:bg-gray-600`}
              onClick={() => setFilter(category)}
            >
              <div>{category}</div>
            </li>
          );
        })}
      </ul>

      {/* Search */}
      <div className="relative rounded-md shadow-sm flex gap-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-11/12 bg-gray-700 py-1.5 pl-10 text-gray-200 px-3 rounded-md border-0 focus:outline-none"
          placeholder="Search by name or description..."
        ></input>
        <button className="w-1/12 cursor-pointer bg-gray-700 rounded-md hover:bg-gray-600" onClick={() => setSearch("")}>
          Clear
        </button>
      </div>

      {/* Mobile ListBox */}
      <div className="md:hidden">
        <Listbox value={filter} onChange={setFilter}>
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-700 py-1.5 pl-3 pr-10 text-left text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 md:text-sm md:leading-6 ">
            <span className="block truncate">{filter}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className={"bg-gray-700 p-4 rounded max-h-64 overflow-auto"}>
            {categories.map((category) => (
              <Listbox.Option
                key={category}
                value={category}
                className="text-gray-300 font-bold hover:text-white  hover:bg-gray-600 cursor-pointer"
              >
                {category}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </>
  );
};
