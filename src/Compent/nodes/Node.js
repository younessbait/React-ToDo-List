import React from "react";

export default function Node(props) {
  const { keymap, title, clickedfun, active } = props;
  return (
    <li key={keymap} className={active ? "active" : ""} onClick={clickedfun}>
      {title}
    </li>
  );
}
