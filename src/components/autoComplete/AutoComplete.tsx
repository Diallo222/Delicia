import { useState } from "react";
import {
  useAutocomplete,
} from "@mui/base/useAutocomplete";

interface AutoCompleteProps {
  options: string[];
  placeholder: string;
  accessOptions?: (option: string) => string;
  onfindPress?: (option: string) => void;
  loading?: boolean;
  buttonLabel?: string;
  clearOnEscape?: boolean;
  openOnFocus?: boolean;
}

const AutoComplete : React.FC<AutoCompleteProps> = ({
  options,
  accessOptions,
  placeholder,
  onfindPress,
  loading,
  buttonLabel,
  clearOnEscape = false,
  openOnFocus = false,
}) => {
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
      : (option: string) =>  option,
    inputValue,
    onInputChange: (_event, newInputValue) => {
      setInputValue(newInputValue);
    },
    onChange: (_event, newValue) => {
      setSelectedOption(newValue as T | null);
    },
    clearOnEscape,
    openOnFocus,
  });

  const handleClick = () => {
    if (selectedOption && onfindPress) {
      onfindPress(selectedOption);
    }
  };

  return (
    <div {...getRootProps()} className="mt-4">
      <input
        className="bg-zinc-900 h-11 w-56 rounded-md text-amber-100 outline-none focus:outline-none focus:border-amber-400 focus:border-2 caret-amber-100"
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
