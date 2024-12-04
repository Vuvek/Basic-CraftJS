// import React from "react";
// import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton } from "@material-ui/core";
// import { useEditor } from "@craftjs/core";

// export const Topbar = () => {
//   const { actions, query, enabled } = useEditor((state) => ({
//     enabled: state.options.enabled
//   }));

//   return (
//     <Box px={1} py={1} mt={3} mb={1} style={{background : '#cbd0d4', padding: '10px'}} >
//       <Grid container alignItems="center">
//         <Grid item xs>
//           <FormControlLabel
//             control={<Switch checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}
//             label="Enable"
//           />
//         </Grid>
//         <Grid item>
//           <MaterialButton
//             size="small"
//             variant="outlined"
//             color="secondary"
//             onClick={() => {
//               console.log(query.serialize())
//             }}
//           >
//               Serialize JSON to console
//           </MaterialButton>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// };

// import React, { useState } from "react";
// import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from "@material-ui/core";
// import { useEditor } from "@craftjs/core";
// import lz from "lzutf8";
// import copy from 'copy-to-clipboard';

// export const Topbar = () => {
//   const { actions, query, enabled } = useEditor((state) => ({
//     enabled: state.options.enabled
//   }));

// const [snackbarMessage, setSnackbarMessage] = useState();
//   return (
//     <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
//       <Grid container alignItems="center">
//         <Grid item xs>
//           <FormControlLabel
//             className="enable-disable-toggle"
//             control={<Switch checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}
//             label="Enable"
//           />
//         </Grid>
//         <Grid item>
//           <MaterialButton
//             className="copy-state-btn"
//             size="small"
//             variant="outlined"
//             color="secondary"
//             onClick={() => {
//               const json = query.serialize();
//               copy(lz.encodeBase64(lz.compress(json)));
//               setSnackbarMessage("State copied to clipboard")
//             }}
//           >
//               Copy current state
//           </MaterialButton>
//           <Snackbar
//             autoHideDuration={1000}
//             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             open={!!snackbarMessage}
//             onClose={() => setSnackbarMessage(null)}
//             message={<span>{snackbarMessage}</span>}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   )
// };

import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Switch,
  Grid,
  Button as MaterialButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [stateToLoad, setStateToLoad] = useState(null);

  return (
    <Box className="px-4 py-4 mt-3 mb-3 bg-gray-300">
      <Grid container alignItems="center">
        <Grid item>
          <DialogActions className="m-2">
            <MaterialButton
              className="copy-state-btn"
              size="medium"
              variant="outlined"
              color="primary"
              onClick={() => {
                const json = query.serialize();
                localStorage.setItem("pageData", json);
                copy(lz.encodeBase64(lz.compress(json)));
                setSnackbarMessage("State copied to clipboard");
              }}
            >
              Copy current state
            </MaterialButton>
            <MaterialButton
              variant="outlined"
              color="primary"
              onClick={() => {
                const json = query.serialize();
                localStorage.setItem("pageData", json);
                copy(lz.encodeBase64(lz.compress(json)));
                navigate("/render");
              }}
            >
              Preview
            </MaterialButton>
            <MaterialButton
              variant="outlined"
              color="primary"
              onClick={() => {
                localStorage.removeItem("pageData");
                navigate(0)
              }}
            >
              Create New Page
            </MaterialButton>
          </DialogActions>
         
        </Grid>
      </Grid>
    </Box>
  );
};
