import React from "react";
import {
  Chip,
  Grid,
  Typography,
  Button as MaterialButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"; // Import ExpandMoreIcon
import { useEditor } from "@craftjs/core";

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return (
    <>
      {selected ? (
        <div className="bg-gray-100 mt-2 px-4 py-4">
          <Grid container direction="column" spacing={0}>
            <Grid item>
              <div className="pb-4">
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography variant="subtitle1">Selected</Typography>
                  </Grid>
                  <Grid item>
                    <Chip size="small" color="primary" label={selected.name} />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            
            {/* Accordion for settings */}
            <Accordion style={{marginBottom : '20px'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column" spacing={1}>
                  {selected.settings && React.createElement(selected.settings)}
                </Grid>
              </AccordionDetails>
            </Accordion>

            {selected.isDeletable ? (
              <MaterialButton
                variant="contained"
                color="default"
                onClick={() => {
                  actions.delete(selected.id);
                }}
              >
                Delete Element
              </MaterialButton>
            ) : null}
          </Grid>
        </div>
      ) : null}
    </>
  );
};
