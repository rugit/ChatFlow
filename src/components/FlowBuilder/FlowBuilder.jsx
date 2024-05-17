import { useState, useCallback } from "react";
import "reactflow/dist/style.css";
import {
  addEdge,
  ReactFlowProvider,
  useNodesState,
  MarkerType,
  useEdgesState,
} from "reactflow";
import TextNode from "../TextNode/TextNode";
import "./FlowBuilder.css";
import FlowSpace from "../FlowSpace/FlowSpace";
import SidePanel from "../SidePanel/SidePanel";
import toast from "react-hot-toast";


const initialElements = [];

const nodeTypes = {
  textNode: TextNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowBuilder = () => {
  const [elements, setElements, onElementsChange] =
    useNodesState(initialElements);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onElementClick = (event, element) => {
    setElements((nds) =>
      nds.map((node) => {
        if (node.id === element?.id) {
          node.style= {border: "1px solid #0965ee", borderRadius: "5px"};
          console.log(node)
        }
        else{
          node.style = null;
        }
        return node;
      })
    );
    if (element?.data) {
      setSelectedNode(element);
    }
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `test message ${id}` },
      };

      setElements((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const resetSelection = () => {
    setSelectedNode(null);
    onElementClick(null, null);
  }

  const saveFlow = () => {
    const nodes = elements.filter((el) => el.id && el.data && el.data.label);
    const emptyTargetNodes = nodes.filter((node) => {
      return !edges.some((el) => el.target === node.id);
    });

    if (nodes.length > 1 && emptyTargetNodes.length > 1) {
      toast.error("Error: More than one node has empty target handles.");
    } else {
      toast.success("Flow saved successfully!");
    }
    resetSelection()
    
  };

  const onConnect = (params) => {
    const existingEdges = edges.filter((edge) => edge.source === params.source);

    if (existingEdges.length < 1) {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    } else {
      alert("This node can only have one outgoing edge.");
    }
  };

  return (
    <div className="flow-builder">
      <div className="flow-builder-header">
        <button className="save-button" onClick={saveFlow}>
          Save Changes
        </button>
      </div>
      <div className="flow-builder-body">
        <div className="flow-builder-canvas">
          <ReactFlowProvider>
            <FlowSpace
              nodes={elements}
              edges={edges}
              onNodesChange={onElementsChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              onNodeClick={onElementClick}
            />
          </ReactFlowProvider>
        </div>
        <SidePanel selectedNode={selectedNode} setElements={setElements} resetSelection={resetSelection} />
      </div>
    </div>
  );
};

export default FlowBuilder;
