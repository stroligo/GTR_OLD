import React, { useState } from "react";
import { Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";

export default function Tags({ update }) {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");

  function handleChange({ target }) {
    setValue(target.value);
  }

  function handleKeyDown({ key }) {
    if (key === "Enter") {
      setTags([...tags, value]);
      setValue("");
    }
  }

  function deleteTag(tag) {
    setTags(tags.filter((item) => item !== tag));
  }

  return (
    <InputGroup className="mb-3">
      {tags.map((tag) => (
        <DropdownButton variant="outline-secondary" title={tag}>
          <Dropdown.Item onClick={() => deleteTag(tag)}>Remover</Dropdown.Item>
        </DropdownButton>
      ))}
      <Form.Control
        type="text"
        id="tags"
        name="tags"
        placeholder="Digite algumas tags"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
}
