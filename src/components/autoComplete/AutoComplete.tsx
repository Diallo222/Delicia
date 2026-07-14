import { useState } from "react";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { motion, AnimatePresence } from "motion/react";

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
  buttonLabel = "Find",
  openOnFocus = true,
}: AutoCompleteProps<T>) {
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  return (
    <div className="relative z-20 w-full max-w-3xl">
      <Autocomplete.Root
        items={options}
        itemToStringValue={accessOptions}
        openOnInputClick={openOnFocus}
        onItemHighlighted={(item) => {
          if (item !== undefined) setSelectedOption(item);
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="min-w-0 flex-1">
            <Autocomplete.Input
              className="w-full border-0 border-b-2 border-ink/15 bg-transparent px-0 py-4 type-title md:text-4xl text-ink placeholder:text-muted/60 focus:border-amber focus:ring-0 outline-none transition-colors uppercase"
              placeholder={placeholder}
            />
          </div>
          <AnimatePresence>
            {selectedOption && (
              <motion.button
                type="button"
                data-cursor-hover
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                onClick={() => onfindPress?.(selectedOption)}
                disabled={loading}
                className="shrink-0 bg-amber px-8 py-4 type-cta text-ink hover:bg-amber-hot disabled:opacity-50 transition-colors"
              >
                {loading ? "Searching…" : buttonLabel}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <Autocomplete.Portal>
          <Autocomplete.Positioner className="z-30 outline-none" sideOffset={8}>
            <Autocomplete.Popup className="max-h-72 w-[var(--anchor-width)] overflow-auto border border-ink/10 bg-night shadow-2xl">
              <Autocomplete.List>
                {(option: T) => (
                  <Autocomplete.Item
                    key={accessOptions(option)}
                    value={option}
                    className="cursor-pointer border-b border-foam/5 px-4 py-3 type-body text-foam outline-none transition-colors data-[highlighted]:bg-amber data-[highlighted]:text-ink"
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
    </div>
  );
}

export default AutoComplete;
