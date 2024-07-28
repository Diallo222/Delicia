import React, { useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import Suggestions from "./Suggestions";

interface AutoCompleteProps {
  options: string[];
  accessOptions?: (option:string) => string;
}
const AutoComplete: React.FC<AutoCompleteProps> = ({ options , accessOptions }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options,
    getOptionLabel: (accessOptions ? accessOptions : (option) => option),
    inputValue,
    onInputChange: (event, newInputValue) => {
      setInputValue(newInputValue);
    },
    onChange: (event, newValue) => {
      setSelectedOption(newValue);
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {groupedOptions.length > 0 && (
        <Suggestions {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              {option}
            </li>
          ))}
        </Suggestions>
      )}
    </div>
  );
};

export default AutoComplete;
