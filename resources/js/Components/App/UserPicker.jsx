import { Fragment, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function UserPicker({ value, options, onSelect }) {
    const [selected, setSelected] = useState(value);
    const [query, setQuery] = useState("");

    const filteredPeople =
        query === ""
            ? options
            : options.filter((person) => 
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
                );

    const onSelected = (persons) => {
        setSelected(persons);
        onSelect(persons);
    };

    return (
        <>
            <Combobox value={selected} onChange={onSelected} multiple>
                    <div className="relative mt-1">
                        <div className="relative w-full overflow-hidden text-left rounded-lg cursor-default shadow-wd focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <ComboboxInput
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-950 dark-text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                displayValue={(persons) => 
                                    persons.lenght
                                        ? `${persons.lenght} users selected`
                                        : ""
                                }
                                placeholder="Выберите пользователя..."
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon 
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </ComboboxButton>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <ComboboxOptions className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-900 rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {filteredPeople.lenght === 0 && query !== "" ? (
                                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                                        Ничего не найдено.
                                    </div>
                                ) : (
                                    filteredPeople.map((person) => (
                                        <ComboboxOption
                                            key={person.id}
                                            className={({ active }) => 
                                            `relative cursor-default select-none py-2 pl-10 pr-4
                                            ${
                                                active
                                                    ? "bg-teal-600 text-white"
                                                    : "bg-gray-900 text-gray-100"
                                            }`
                                        }
                                            value={person}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected
                                                                ? "font-medium"
                                                                : "font-normal"
                                                        }`}
                                                    >
                                                        {person.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 text-white`}
                                                        >
                                                            <CheckIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />  
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </ComboboxOption>
                                    ))
                                )}
                            </ComboboxOptions>
                        </Transition>
                    </div>
            </Combobox>
            {selected && (
                <div className="flex gap-2 mt-3">
                    {selected.map((person) => (
                        <div
                            key={person.id}
                            className="gap-2 badge badge-primary"
                        >
                            {person.name}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}