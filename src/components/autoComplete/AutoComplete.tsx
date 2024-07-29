import React, { useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import Suggestions from "./Suggestions";

interface AutoCompleteProps<T> {
  options: T[];
  label: string;
  accessOptions?: (option: T) => string;
}

const AutoComplete = <T extends {}>({
  options,
  accessOptions,
  label,
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

  return (
    <div {...getRootProps()}>
      <p className="text-black">{label}</p>
      <input className="bg-zinc-900 h-9 rounded-md" {...getInputProps()} />
      {groupedOptions.length > 0 && (
        <ul {...getListboxProps()} className=" bg-zinc-900 p-2 rounded-b-md">
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={index}
                {...optionProps}
                className="hover:bg-zinc-600 text-amber-100 px-2 py-1"
                style={{
                  // backgroundColor: isHighlighted ? "green" : "black",
                }}
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
