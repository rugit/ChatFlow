import { useState } from "react";
import "./SettingsPanel.css";
import leftArrow from "../../assets/left-arrow.svg";

const SettingsPanel = (props) => {
  const [text, setText] = useState(props.selectedNode.data.label);

  const onChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    props.setElements((els) =>
      els.map((el) =>
        el.id === props.selectedNode.id
          ? { ...el, data: { ...el.data, label: newText } }
          : el
      )
    );
  };

  return (
    <aside className="settings-panel">
      <div className="settings-topbar">
        <div>
          <img
            src={leftArrow}
            alt="Left Arrow"
            className="settings-topbar-backarrow"
            onClick={props.resetSelection}
          />
        </div>
        <div className="settings-topbar-header">Message</div>
      </div>
      <div className="settings">
        <label className="settings-label">Text</label>
        <textarea
          type="text"
          value={text}
          onChange={onChange}
          className="settings-textarea"
        />
      </div>
    </aside>
  );
};

export default SettingsPanel;
