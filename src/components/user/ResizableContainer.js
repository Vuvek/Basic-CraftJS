import React, { useRef } from "react";
import { useNode } from "@craftjs/core";
import { Rnd } from "react-rnd";

export const ResizableContainer = ({ children, background }) => {
  const rndRef = useRef(null);

  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div ref={connect}> {/* Connect the outer div for drag handling */}
      <Rnd
        ref={rndRef}
        bounds="parent"
        enableResizing={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        style={{
          border: selected ? "2px solid blue" : "1px solid #ddd",
          padding: "10px",
          background: background || "#fff",
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setProp((props) => {
            const parentWidth = ref.parentElement.offsetWidth;
            const parentHeight = ref.parentElement.offsetHeight;

            // Calculate width and height as percentages relative to parent
            props.width = `${(ref.offsetWidth / parentWidth) * 100}%`;
            props.height = `${(ref.offsetHeight / parentHeight) * 100}%`;
          });
        }}
        default={{
          width: "100%",
          height: "200px",
        }}
      >
        {children}
      </Rnd>
    </div>
  );
};
