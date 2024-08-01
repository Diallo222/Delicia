import React, { useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";

interface AutoCompleteProps<T> {
  options: T[];
  placeholder: string;
  accessOptions?: (option: T) => string;
  onfindPress?: (option: T) => void;
  loading ?: boolean,
  buttonLabel?: string,
  clearOnEscape?: boolean;
  openOnFocus?: boolean;
  filterOptions?: (options: T[], state: any) => T[];
}

const AutoComplete = <T extends {}>({
  options,
  accessOptions,
  placeholder,
  onfindPress,
  loading,
  buttonLabel,
  clearOnEscape = false,
  openOnFocus = false,
  filterOptions
}: AutoCompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,

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
    clearOnEscape,
    openOnFocus,
    filterOptions,
  });

  const handleClick = () => {
    if (selectedOption && onfindPress) {
      onfindPress(selectedOption);
    }
  };

  return (
    <div {...getRootProps()} className="mt-4">
      <input
        className="bg-zinc-900 h-11 w-56  rounded-md text-amber-100 outline-none focus:outline-none focus:border-amber-400 focus:border-2 caret-amber-100"
        placeholder={placeholder}
        {...getInputProps()}
      />
      {selectedOption && buttonLabel && (
        <button
          onClick={handleClick}
          disabled={loading}
          className="text-zinc-900 bg-amber-400 h-11 hover:bg-zinc-900 hover:text-amber-100 mt-2 md:mx-2 md:mt-0 rounded-md"
        >
          {buttonLabel}
        </button>
      )}
      {groupedOptions.length > 0 && (
        <ul
          {...getListboxProps()}
          className="absolute bg-zinc-900 p-2 rounded-md mt-1 w-56 max-h-60 overflow-auto z-10"
        >
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            
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
