// import { useNode } from "@craftjs/core";
// import React from "react";

// export const Text = ({text, fontSize}) => {
//   const { connectors: {connect, drag} } = useNode();
//   return (
//       <div id="text" ref={ref => connect(drag(ref))}>
//          <p style={{fontSize}}>{text}</p>
//       </div>
//   )
// }

// Text.craft = {
//   rules: {
//     canDrag: (node) => node.data.props.text != "Drag"
//   }
// }

import { useEditor, useNode } from "@craftjs/core";
import { FormControl, FormLabel, Slider } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";

export const Text = ({ text, fontSize,textAlign }) => {
  const [editable, setEditable] = useState(false);

  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    console.log(hasSelectedNode, "hasSelectedNode");
    if (!hasSelectedNode) {
      setEditable(false);
    }
  }, [hasSelectedNode]);

  return (
    <div ref={(ref) => connect(drag(ref))} onClick={(e) => setEditable(true)}>
      <ContentEditable
        disabled={!enabled || !editable}
        html={text}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign: textAlign }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    textAlign,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    textAlign: node.data.props.textAligh,
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(_, value) => {
            setProp((props) => (props.fontSize = value));
          }}
        />

        <div className="mt-4 flex items-center">
          <label
            htmlFor="reciever-number"
            className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
          >
            Text Align
          </label>

          <select
            value={textAlign}
            onChange={(event) => {
              console.log(event.target.value,'kasdjflkasdfjlsdkjflsakd')
              setProp((props) => (props.textAlign = event.target.value))
            }
            }
            name="status"
            id="Status"
            className="form-input flex-1"
          >
            <option value={"left"}>Left</option>
            <option value={"center"}>Center</option>
            <option value={"right"}>Right</option>
          </select>
        </div>
      </FormControl>
    </>
  );
};

Text.craft = {
  props: {
    text: "Hi",
    textAlign: "left",
    fontSize: 20,
  },
  related: {
    settings: TextSettings,
  },
};
