import React from "react";

const TooltipCell = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const checkOverflow = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [children]);

  return (
    <div
      ref={ref}
      className="table-cell-content"
      title={isTruncated ? String(children) : undefined}
    >
      {children}
    </div>
  );
};

export default TooltipCell;
