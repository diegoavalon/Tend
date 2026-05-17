import { Select } from "@base-ui/react";
import { Icon } from "../app/Icons";

type SelectOption = {
  value: string;
  label: string;
};

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder?: string;
  name?: string;
  className?: string;
}

export function SelectField({
  value,
  onValueChange,
  options,
  placeholder,
  name,
  className,
}: Props) {
  return (
    <Select.Root
      items={options}
      name={name}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue !== null) {
          onValueChange(String(nextValue));
        }
      }}
    >
      <Select.Trigger className={["input-flat", "select-field__trigger", className].filter(Boolean).join(" ")}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="select-field__icon">
          <Icon name="chevrons-up-down" size={14} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner className="select-field__positioner" sideOffset={8}>
          <Select.Popup className="select-field__popup">
            <Select.List className="select-field__list">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  className="select-field__item"
                  value={option.value}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="select-field__item-indicator">
                    <Icon name="check" size={14} strokeWidth={2.4} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
