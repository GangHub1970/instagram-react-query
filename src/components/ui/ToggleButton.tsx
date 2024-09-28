import React from "react";

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  title: string;
};

export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
  title,
}: Props) {
  return (
    <button onClick={() => onToggle(!toggled)} aria-label={title}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}
