import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"textarea">;

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
  const { className, ...rest } = props;

  return (
    <textarea
      ref={ref}
      className={`p-4 w-full border border-neutral-200 outline-none ${className}`}
      {...rest}
    />
  );
});

export default Textarea;
