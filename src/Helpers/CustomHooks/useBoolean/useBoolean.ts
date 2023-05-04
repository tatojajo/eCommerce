import { useState } from "react";

const useBoolean = (initialValue: boolean) => {
  const [open, setOpen] = useState(initialValue);

  const opened = setOpen(true);
  const closed = setOpen(false);
  const toggle = setOpen((prev) => !prev);

  return { open, opened, closed, toggle, setOpen };
};

export default useBoolean;
