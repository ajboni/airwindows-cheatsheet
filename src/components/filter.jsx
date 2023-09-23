import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const Filter = ({ db, filter, setFilter, search, setSearch, sortBy, setSortBy }) => {
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
              } col-span-1 flex rounded-md shadow-sm  px-2 py-1 cursor-pointer hover:bg-gray-600 h-8 items-center`}
              onClick={() => setFilter(category)}
            >
              <div className="text-sm">{category}</div>
            </li>
          );
        })}
      </ul>

      {/* Search */}
      <div className="relative rounded-md shadow-sm flex gap-2 text-sm">
        <div className="w-5/6 lg:w-5/6 flex relative  ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" bg-gray-700  pr-6 pl-10 text-gray-200 px-3 ring-0  w-full rounded-md border-0 h-8 flex"
            placeholder="Search by name or description..."
          ></input>
          <button className="absolute cursor-pointer  right-1 top-0 bottom-0 " onClick={() => setSearch("")}>
            <XMarkIcon className="w-5 h-5  text-gray-400 hover:text-gray-200" />
          </button>
        </div>

        {/* Sort By */}
        <div className="text-sm relative w-2/6 xl:w-1/6">
          <Listbox value={sortBy} onChange={setSortBy}>
            <Listbox.Button className="h-8 border-none relative w-full cursor-default rounded-md bg-gray-700 py-1 pl-3 pr-10 text-left text-gray-200 shadow-sm md:text-sm md:leading-6 ">
              <span className="block truncate">{sortBy}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Listbox.Options className={"bg-gray-700 rounded max-h-64 overflow-auto absolute left-0 right-0 z-30 mt-2 shadow-xl"}>
              <Listbox.Option value="Alphabetical Order" className="listbox-item">
                Alphabetical Order
              </Listbox.Option>
              <Listbox.Option value="Order of Goodness" className="listbox-item">
                Order of Goodness
              </Listbox.Option>
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      {/* Mobile ListBox */}
      <div className="md:hidden text-sm relative">
        <Listbox value={filter} onChange={setFilter}>
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-700 py-1.5 pl-3 pr-10 text-left text-gray-200 shadow-sm  md:text-sm md:leading-6 ">
            <span className="block truncate">{filter}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options
            className={"bg-gray-700 rounded max-h-64 overflow-auto mt-4 z-30 left-0 right-0 shadow-xl border border-gray-600"}
          >
            {categories.map((category) => (
              <Listbox.Option key={category} value={category} className="listbox-item">
                {category}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </>
  );
};
