// components/user/Container.js
import React from "react";
import { FormControl, FormLabel, Paper, Slider } from "@material-ui/core";
import { useNode } from "@craftjs/core";
import ColorPicker from "material-ui-color-picker";


export const ContainerDefaultProps = {
  background : "#ffffff",
  padding: 10
};

export const Container = ({background, padding = 10,margin = 10, children}) => {
    const { connectors: {connect, drag} } = useNode();
  return (
    <Paper className="" ref={ ref => connect(drag(ref))} style={{margin: `${margin}px 10px`, background, padding: `${padding}px`}}>
      {children}
    </Paper>
  )
}

export const ContainerSettings = () => {
  const { background, padding, actions: {setProp} } = useNode(node => ({
    background: node.data.props.background,
    padding: node.data.props.padding
  }));
  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <ColorPicker defaultValue={background || '#000'} onChange={color => {
          setProp(props => props.background = color)
        }} />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider defaultValue={padding} onChange={(_, value) => setProp(props => props.padding = value)} />
      </FormControl>
    </div>
  )
}

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings
  },
  canvas: true,
  rules: {
    canDrag: () => true,
    canDrop: () => true
  }
}