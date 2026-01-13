import { useEffect, useMemo, useRef, useState } from "react";
import "./DropDown.css";

export const DropDown = ({
  list = [],
  placeholder = "Select Item",
  onSelect = () => {},
  defaultValue = null,
  windowHeight = 300,
  itemHeight = 30,
}) => {
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    Math.floor(windowHeight / itemHeight)
  );

  const poppupRef = useRef(null);

  const handleOpen = () => setOpen(!open);

  const handleSelect = (event) => {
    const targetElement = event.target.tagName;
    if (targetElement !== "LI") return;

    const selectedValue = event.target.getAttribute("data-value");
    const selectedLabel = event.target.getAttribute("data-label");
    const selectedId = event.target.getAttribute("data-id");
    if (!selectedId || !selectedLabel || !selectedValue) return;

    const selectedData = {
      id: selectedId,
      value: selectedValue,
      label: selectedLabel,
    };

    setSelected(selectedData);
    setOpen(false);

    onSelect(selectedData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSelect(e);
    }
  };

  const handleScroll = (event) => {
    const { scrollTop } = event.target;

    const newStartIndex = Math.floor(scrollTop / itemHeight);

    const newEndIndex = newStartIndex + Math.floor(windowHeight / itemHeight);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  useEffect(() => {
    const handlePoppup = (e) => {
      if (poppupRef.current && !poppupRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("click", handlePoppup);

    return () => document.removeEventListener("click", handlePoppup);
  }, []);

  useEffect(() => {
    if (!defaultValue) return;
    const exists = list.find(({ id }) => defaultValue.id === id);

    setSelected(exists);
  }, [defaultValue, list]);

  const memoList = useMemo(
    () => list.slice(startIndex, endIndex),
    [startIndex, endIndex]
  );

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-header"
        onClick={handleOpen}
        ref={poppupRef}
      >
        {selected?.label || placeholder}
      </button>
      {list.length > 0 && (
        <ul
          className={`dropdown-list ${open && "extended"}`}
          onClick={handleSelect}
          onKeyDown={handleKeyDown}
          style={{ height: windowHeight - 20, overflowY: "scroll" }}
          onScroll={handleScroll}
        >
          <div
            style={{ height: itemHeight * list.length, position: "relative" }}
          >
            {memoList.map(({ value, id, label }, index) => (
              <li
                key={id}
                tabIndex={0}
                className="list-item"
                data-value={value}
                data-id={id}
                data-label={label}
                style={{ top: (startIndex + index) * itemHeight }}
              >
                {label}
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};
