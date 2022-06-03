import Konva from "konva";
import React from "react";
import ReactDOM from "react-dom";

type Component = React.ReactNode
interface AppProps {
  onUpdate: (prop: unknown) => void;
  children: Component;
}

const render = async (component: Component) => {
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
    rerender: async (component: Component) => {
      await new Promise((resolve) => {
        ReactDOM.render(<App onUpdate={resolve}>{component}</App>, root);
      });
    },
  };
};

export default render;
