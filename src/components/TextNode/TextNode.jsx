import "./TextNode.css"
import { Handle } from 'reactflow';

const TextNode = ({ data }) => {
  return (
    <div className="text-node">
      <div className="text-node-header">Send Message</div>
      <div className="text-node-content">{data.label}</div>
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

export default TextNode;
