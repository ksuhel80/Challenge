import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./index.css";

const Select = ({ dataa, nodes, setSector }) => {
  const data = dataa;
  const [sectors, setSectors] = useState([]);

  console.log(data);

  useEffect(() => {
    var node = nodes;
    console.log(node);
    // setSector(node);
  }, [nodes]);

  const onChange = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode);
    console.log(selectedNodes);

    nodes = [];
    selectedNodes.map((item) => {
      const filter = nodes.filter((el) => el === item.label);
      if (filter.length === 0) {
        nodes.push(item.label);
      }
    });
    console.log(nodes);
  };
  const onAction = (node, action) => {
    console.log("onAction::", action, node);
  };
  const onNodeToggle = (currentNode) => {
    console.log("onNodeToggle::", currentNode);
  };

  return (
    <>
      {console.log(data)}
      <DropdownTreeSelect
        data={data}
        onChange={onChange}
        onAction={onAction}
        onNodeToggle={onNodeToggle}
        className="mdl-demo"
      />
      <text></text>
    </>
  );
};

export default Select;
