// todo C:\Users\bayt\OneDrive\Bureau\full-stuck\Academy-hasoub\React\Project-react-NOTE
import React, { useEffect, useState } from "react";
import "./App.css";
import { FiEdit, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import Creating from "./Compent/Creating";
import Noteform from "./Compent/Noteform";
import Nodelist from "./Compent/nodes/Nodelist";
import Node from "./Compent/nodes/Node";
import { AiFillFolderAdd, AiTwotoneSave } from "react-icons/ai";
import { RiSaveFill } from "react-icons/ri";
function App() {
  const [notes, setnotes] = useState([]);
  const [creat, setcreat] = useState(false);
  const [editing, setediting] = useState(false);
  const [title, settitle] = useState("");
  const [database, setdatabase] = useState("");
  const [editAndsave, seteditsave] = useState();
  const [selectnode, setselect] = useState(null);
  useEffect(() => {
    if (window.localStorage.getItem("notes")) {
      setnotes(JSON.parse(window.localStorage.getItem("notes")));
    }
  }, []);
  const saveinlocalStorage = (key, value) => {
    window.localStorage.setItem("notes", JSON.stringify(value));
  };
  const savetask = () => {
    const note = {
      id: new Date(),
      title: title,
      database: database,
    };
    const arrayNots = [...notes, note];
    setnotes(arrayNots);
    saveinlocalStorage("notes", arrayNots);
    setcreat(false);
    setselect(note.id);
    settitle("");
    setdatabase("");
  };
  const addtasks = () => {
    setcreat(true);
    setediting(false);
    setdatabase("");
    settitle("");
  };
  const onchngeText = (event) => {
    setdatabase(event.target.value);
  };
  const onchngeTitle = (event) => {
    settitle(event.target.value);
  };
  const editfun = () => {
    const note = notes.find((note) => note.id === selectnode);
    setdatabase(note.database);
    setediting(true);
    settitle(note.title);
  };
  const edittask = () => {
    if (title == "" || database == "") {
      return;
      <Noteform
        formtitle="Edit Note"
        titles={title}
        content={database}
        titlechange={onchngeTitle}
        textchange={onchngeText}
        btns={edittask}
        btnsName=" Edit"
      />;
    }
    const updatasks = [...notes];
    const indextasks = updatasks.findIndex((note) => note.id === selectnode);
    updatasks[indextasks] = {
      id: selectnode,
      title: title,
      database: database,
    };
    setnotes(updatasks);
    saveinlocalStorage("notes", updatasks);
    setediting(false);
    setdatabase("");
    settitle("");
  };
  const deletfun = () => {
    const deletarr = [...notes];
    const idTasks = deletarr.findIndex((taske) => taske.id === selectnode);
    deletarr.splice(idTasks, 1);
    setnotes(deletarr);
    saveinlocalStorage("notes", deletarr);
    setselect(null);
  };
  const add = () => {
    return (
      <Noteform
        formtitle=" Add Note"
        titles={title}
        content={database}
        titlechange={onchngeTitle}
        textchange={onchngeText}
        btns={savetask}
        btnsName=" save"
      />
    );
  };
  const content = () => {
    if (notes.length === 0) {
      return (
        <div className="message">
          <FiAlertTriangle className="AlertTriangle" />
          <div>There are no Tasks</div>
        </div>
      );
    }
    if (selectnode == null) {
      return (
        <div className="message">
          <FiAlertTriangle className="AlertTriangle" />
          <div>Chose Tasks</div>
        </div>
      );
    }
    if (editing) {
      return (
        <Noteform
          formtitle="Edit Note"
          titles={title}
          content={database}
          titlechange={onchngeTitle}
          textchange={onchngeText}
          btns={edittask}
          btnsName=" Edit"
        />
      );
    }
    const note = notes.find((note) => {
      return note.id === selectnode;
    });
    if (note.title !== "" && note.database !== "" && !editing) {
      return (
        <div className="view-centent">
          <div className="text-title">
            <h2 className="t-con">{note.title}</h2>
            <p className="p-con">{note.database}</p>
          </div>
          <div className="just-icons">
            <a href="#" onClick={editfun}>
              <FiEdit className="edit" />
            </a>
            <a href="#" onClick={deletfun}>
              <FiTrash2 className="delet" />
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className="message">
        <FiAlertTriangle className="AlertTriangle" />
        <div>You cannot add empty tasks</div>
      </div>
    );
  };
  const funselect = (nodeid) => {
    setselect(nodeid);
  };
  return (
    <div className="All">
      <div className="All-tasks">
        <button onClick={addtasks} className="add">
          <AiFillFolderAdd />
        </button>
        <Nodelist>
          {notes.map((node) => {
            if (node.title !== "" && node.database !== "") {
              return (
                <Node
                  key={node.id}
                  title={node.title}
                  clickedfun={() => funselect(node.id)}
                  active={selectnode === node.id}
                />
              );
            }
          })}
        </Nodelist>
      </div>
      <Creating>{creat ? add() : content()}</Creating>
    </div>
  );
}

export default App;
