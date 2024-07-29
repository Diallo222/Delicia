import React, { useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";

interface AutoCompleteProps<T> {
  options: T[];
  label: string;
  accessOptions?: (option: T) => string;
  onfindPress?: (option: T) => void;
}

const AutoComplete = <T extends {}>({
  options,
  accessOptions,
  label,
  onfindPress,
}: AutoCompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    highlightedIndex,
  } = useAutocomplete({
    options,
    getOptionLabel: accessOptions
      ? accessOptions
      : (option: T) => option as unknown as string,
    inputValue,
    onInputChange: (event, newInputValue) => {
      setInputValue(newInputValue);
    },
    onChange: (event, newValue) => {
      setSelectedOption(newValue as T | null);
    },
  });

  const handleClick = () => {
    if (selectedOption && onfindPress) {
      onfindPress(selectedOption);
    }
  };

  return (
    <div {...getRootProps()}>
      <p className="text-black">{label}</p>
      <input
        className="bg-zinc-900 h-11 w-56  rounded-md text-amber-100 focus:outline-none focus:border-amber-400 focus:border-2 caret-amber-100"
        {...getInputProps()}
      />
      {selectedOption && (
        <button
          onClick={handleClick}
          className="text-zinc-900 bg-amber-400 h-11 hover:bg-zinc-900 hover:text-amber-100 mt-2 md:mx-2 md:mt-0 rounded-md"
        >
          Find
        </button>
      )}
      {groupedOptions.length > 0 && (
        <ul
          {...getListboxProps()}
          className="absolute bg-zinc-900 p-2 rounded-md mt-1 w-56 max-h-60 overflow-auto z-10"
        >
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                key={index}
                {...optionProps}
                className="hover:bg-zinc-600 text-amber-100 p-1"
              >
                {accessOptions
                  ? accessOptions(option)
                  : (option as unknown as string)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
