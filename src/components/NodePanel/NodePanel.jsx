import "./NodePanel.css";

const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="node-panel">
      <div
        className="node-message"
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
      >
        Message
      </div>
    </aside>
  );
};

export default NodePanel;
