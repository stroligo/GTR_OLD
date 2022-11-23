import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { filterByKeys } from "../const";

export default function MembersCheckbox({ update, selected, allMembers }) {
  const [search, setSearch] = useState("");
  function handleChange(member) {
    let result;

    if (~selected.indexOf(member))
      result = selected.filter((item) => item !== member);
    else result = [...selected, member];

    update(result);
  }

  return (
    <Dropdown autoClose="outside" style={{ display: "inline-block" }}>
      <Dropdown.Toggle>Membros</Dropdown.Toggle>
      <Dropdown.Menu>
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise por nome / habilidades"
          className="my-3">
          <Form.Control
            type="text"
            placeholder="pesquise"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </FloatingLabel>
        {allMembers
          .filter((member) =>
            filterByKeys(member, ["nome", "habilidades"], search)
          )
          .map((member) => (
            <Dropdown.Item
              key={member._id}
              onClick={() => handleChange(member)}>
              <Form.Check
                name="members"
                inline
                type="checkbox"
                value={member._id}
                onChange={() => {}}
                {...(() => {
                  let exists = ~selected.indexOf(member);
                  return { key: member._id + exists, checked: exists };
                })()}
              />
              <Form.Label>
                {member.nome} - {member.matricula}
              </Form.Label>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
