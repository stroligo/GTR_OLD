import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function CheckboxList({ updateParent, options }) {
  const [selectedList, setSelectedList] = useState([]);

  function handleChange({ target: { name, value } }) {
    if (options.type === "radio") {
      setSelectedList(value);
      updateParent(name, value);
      return;
    }

    let result;
    if (selectedList.includes(value)) {
      result = selectedList.filter((item) => item !== value);
    } else {
      result = [...selectedList, value];
    }
    setSelectedList(result);
    updateParent(name, selectedList);
  }

  return (
    <>
      {options.list.map(({ label, value }) => (
        <Form.Check
          inline
          type={options.type}
          name={options.name}
          label={label || value}
          onChange={handleChange}
          checked={
            options.type === "radio"
              ? selectedList === value
              : selectedList.includes(value)
          }
          value={value}
          key={value}
        />
      ))}
    </>
  );
}
