import React from "react";
import { RiSaveFill } from "react-icons/ri";
export default function Noteform(props) {
  const { formtitle,titles,content ,textchange, titlechange , btns ,btnsName } = props;
  return (
    <div className="flex">
      <div className="view-edit">
        <h1>{formtitle}</h1>
        <input
          maxLength="20"
          value={titles}
          onChange={titlechange}
          type="text"
          placeholder="Title"
          className="h-edit"
        />
        <textarea
          value={content}
          onChange={textchange}
          placeholder="Text"
          className="t-edit"
        />
      </div>
      <button onClick={btns} className="savebtn">
        {btnsName}
        <RiSaveFill className="save" />
      </button>
    </div>
  );
}
