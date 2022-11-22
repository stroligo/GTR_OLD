import axios from "axios";
import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const keys = ["_id", "matricula", "nome"];
function reduceKeys(list) {
  let result = [];

  for (let i = 0; i < list.length; i++) {
    let obj = {};

    for (let key of keys) {
      obj[key] = list[i][key];
    }

    result.push(obj);
  }

  return result;
}

export default function MembersCheckbox({ update, selected: list = [] }) {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await axios("https://ironrest.cyclic.app/gtr_user");
      let data = reduceKeys(response.data);

      if (list.length) {
        // contém matrículas
        console.log(list);

        let sel = [];
        for (let member of data) {
          list.includes("" + member.matricula) && sel.push(member);
        }
        setSelected(sel);
      }

      setMembers(data);
    })();
  }, [list]);

  function handleChange(member) {
    let result;

    if (~selected.indexOf(member))
      result = selected.filter((item) => item !== member);
    else result = [...selected, member];

    setSelected(result);
    update(result.map((item) => "" + item.matricula));
  }

  return (
    <Dropdown autoClose="outside" style={{ display: "inline-block" }}>
      <Dropdown.Toggle>Membros</Dropdown.Toggle>
      <Dropdown.Menu>
        {members.map((member) => (
          <Dropdown.Item key={member._id} onClick={() => handleChange(member)}>
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
