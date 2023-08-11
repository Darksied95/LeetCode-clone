import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Plaground from "./Playground/Playground";

type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <Plaground />
    </Split>
  );
};
export default Workspace;
