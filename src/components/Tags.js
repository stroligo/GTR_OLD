import React, { useState } from "react";
import { Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";

export default function Tags({ update, selected = [] }) {
  if (typeof selected === "string") selected = [selected];
  const [tags, setTags] = useState(selected);
  const [value, setValue] = useState("");

  function handleChange({ target }) {
    setValue(target.value);
  }

  function handleKeyDown({ key }) {
    if (key === "Enter") {
      let res = [...tags, value];
      setTags(res);
      update(res);
      setValue("");
    }
  }

  function deleteTag(tag) {
    let res = tags.filter((item) => item !== tag);
    setTags(res);
    update(res);
  }

  return (
    <InputGroup className="mb-3">
      {tags.map((tag) => (
        <DropdownButton
          variant="outline-secondary"
          title={tag}
          key={crypto.randomUUID()}>
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
