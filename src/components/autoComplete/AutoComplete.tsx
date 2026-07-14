import { useState } from "react";
import { Autocomplete } from "@base-ui/react/autocomplete";

interface AutoCompleteProps<T> {
  options: T[];
  placeholder: string;
  accessOptions?: (option: T) => string;
  onfindPress?: (option: T) => void;
  loading?: boolean;
  buttonLabel?: string;
  openOnFocus?: boolean;
}

function AutoComplete<T>({
  options,
  accessOptions = (option) => String(option),
  placeholder,
  onfindPress,
  loading,
  buttonLabel,
  openOnFocus = false,
}: AutoCompleteProps<T>) {
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const handleClick = () => {
    if (selectedOption && onfindPress) {
      onfindPress(selectedOption);
    }
  };

  return (
    <div className="mt-4 z-20 relative">
      <Autocomplete.Root
        items={options}
        itemToStringValue={accessOptions}
        openOnInputClick={openOnFocus}
        onItemHighlighted={(item) => {
          if (item !== undefined) {
            setSelectedOption(item);
          }
        }}
      >
        <Autocomplete.Input
          className="bg-zinc-900 h-11 w-56 rounded-md text-amber-100 outline-none focus:outline-none focus:border-amber-400 focus:border-2 caret-amber-100 px-3"
          placeholder={placeholder}
        />
        <Autocomplete.Portal>
          <Autocomplete.Positioner className="outline-none z-10" sideOffset={4}>
            <Autocomplete.Popup className="bg-zinc-900 p-2 rounded-md w-56 max-h-60 overflow-auto">
              <Autocomplete.List>
                {(option: T) => (
                  <Autocomplete.Item
                    key={accessOptions(option)}
                    value={option}
                    className="hover:bg-zinc-600 text-amber-100 p-1 cursor-pointer data-[highlighted]:bg-zinc-600 outline-none"
                    onClick={() => setSelectedOption(option)}
                  >
                    {accessOptions(option)}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
      {selectedOption && buttonLabel && (
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="text-zinc-900 bg-amber-400 h-11 hover:bg-zinc-900 hover:text-amber-100 mt-2 md:mx-2 md:mt-0 rounded-md"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

export default AutoComplete;
