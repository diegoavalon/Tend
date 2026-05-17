import { Radio, RadioGroup } from "@base-ui/react";

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

interface Props<T extends string> {
  ariaLabel: string;
  value: T;
  onValueChange: (value: T) => void;
  options: readonly SegmentedOption<T>[];
  className?: string;
}

export function SegmentedControl<T extends string>({
  ariaLabel,
  value,
  onValueChange,
  options,
  className,
}: Props<T>) {
  return (
    <RadioGroup
      aria-label={ariaLabel}
      className={["segmented-control", className].filter(Boolean).join(" ")}
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as T)}
    >
      {options.map((option) => (
        <Radio.Root
          key={option.value}
          className="segmented-control__option"
          value={option.value}
        >
          {option.label}
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
