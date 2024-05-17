import "./SidePanel.css";
import RenderIf from "../RenderIf";
import NodePanel from "../NodePanel/NodePanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

function SidePanel(props) {
  return (
    <div className="side-panel">
      <RenderIf condition={props.selectedNode}>
        <SettingsPanel {...props} />
      </RenderIf>
      <RenderIf condition={!props.selectedNode}>
        <NodePanel />
      </RenderIf>
    </div>
  );
}

export default SidePanel;
