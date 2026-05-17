import type { ReactNode } from "react";
import { Switch } from "@base-ui/react";

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export function SwitchField({ checked, onCheckedChange, children, className }: Props) {
  return (
    <div className={["switch-field", className].filter(Boolean).join(" ")}>
      <Switch.Root
        checked={checked}
        className="switch-field__root"
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb className="switch-field__thumb" />
      </Switch.Root>
      {children ? <span className="switch-field__label">{children}</span> : null}
    </div>
  );
}
