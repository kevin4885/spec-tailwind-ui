import React from "react";
import "./TreeView.css";

const head = {
  id: 1,
  name: "Giant Planets",
  nodes: [
    {
      id: 2,
      name: "Gas Giants",
      nodes: [
        { id: 4, name: "Jupiter" },
        { id: 5, name: "Saturn" },
      ],
    },
    {
      id: 3,
      name: "Ice Giants",
      nodes: [
        { id: 6, name: "Uranus" },
        { id: 7, name: "Neptune" },
      ],
    },
  ],
};
//https://iamkate.com/code/tree-views/

const TreeView = ({ node = head, getItemFn }) => {
  const createNodes = node => {
    const item = getItemFn ? getItemFn(node) : <div>{node.name}</div>;
    return (
      <li key={node.id}>
        {node.nodes?.length > 0 && (
          <details className="flex items-center" open>
            <summary className="flex items-center">{item}</summary>
            <ul>{node.nodes.map(n => createNodes(n))}</ul>
          </details>
        )}
        {(!node?.nodes || node.nodes.length < 1) && item}
      </li>
    );
  };

  return (
    <React.Fragment>
      <ul className="tree">{node && createNodes(node)}</ul>
    </React.Fragment>
  );
};

export default TreeView;
