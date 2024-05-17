import ReactFlow from "reactflow";

function FlowSpace(props) {
  return (
    <div className="reactflow-wrapper">
      <ReactFlow {...props} fitView></ReactFlow>
    </div>
  );
}

export default FlowSpace;
