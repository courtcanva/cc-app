import Konva from "konva";
import React from "react";
import ReactDOM from "react-dom";

const render = async (component: React.ReactChild) => {
  const node = document.createElement("div");
  const root = document.body.appendChild(node);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const App = ({ onUpdate, children }: any) => {
    React.useEffect(() => {
      onUpdate(null);
    });
    return children;
  };

  await new Promise((resolve) => {
    ReactDOM.render(<App onUpdate={resolve}>{component}</App>, root);
  });

  return {
    stage: Konva.stages[Konva.stages.length - 1],
    rerender: async (component: React.ReactNode) => {
      await new Promise((resolve) => {
        ReactDOM.render(<App onUpdate={resolve}>{component}</App>, root);
      });
    },
  };
};

export default render;
