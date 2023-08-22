import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const Filter = ({ db, filter, setFilter }) => {
  const categories = Object.keys(db.categories);
  categories.unshift("All");
  return (
    <>
      <ul role="list" className={`hidden sm:grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10`}>
        {categories.map((category) => {
          return (
            <li
              key={category}
              className={`${
                category === filter ? "bg-gray-500" : "bg-gray-700"
              } col-span-1 flex rounded-md shadow-sm  px-3 py-2 cursor-pointer hover:bg-gray-600`}
              onClick={() => setFilter(category)}
            >
              <div>{category}</div>
            </li>
          );
        })}
      </ul>

      <div className="sm:hidden">
        <Listbox value={filter} onChange={setFilter}>
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-700 py-1.5 pl-3 pr-10 text-left text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
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
