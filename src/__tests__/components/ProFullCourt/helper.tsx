import Konva from "konva";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface AppProps {
  onUpdate: (prop: unknown) => void;
  children: ReactNode;
}

const render = async (component: ReactNode) => {
  const node = document.createElement("div");
  const root = document.body.appendChild(node);

  const App = ({ onUpdate, children }: AppProps) => {
    React.useEffect(() => {
      onUpdate(null);
    });
    return children as JSX.Element;
  };

  await new Promise((resolve) => {
    ReactDOM.render(<App onUpdate={resolve}>{component}</App>, root);
  });

  return {
    stage: Konva.stages[Konva.stages.length - 1],
    rerender: async (component: ReactNode) => {
      await new Promise((resolve) => {
        ReactDOM.render(<App onUpdate={resolve}>{component}</App>, root);
      });
    },
  };
};

export default render;
