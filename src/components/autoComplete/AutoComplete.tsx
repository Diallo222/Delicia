import React, { useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import Suggestions from "./Suggestions";

interface AutoCompleteProps<T> {
  options: T[];
  accessOptions?: (option: T) => string;
}

const AutoComplete = <T extends {}>({
  options,
  accessOptions,
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
      <input {...getInputProps()} />
      {groupedOptions.length > 0 && (
        <ul {...getListboxProps()} className=' bg-zinc-700'>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={index}
                {...optionProps}
                style={{
                  // backgroundColor: isHighlighted ? "green" : "black",
                  padding: "8px",
                  cursor: "pointer",
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
