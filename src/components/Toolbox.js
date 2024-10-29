import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button as MaterialButton,
} from "@material-ui/core";
import { Element, useEditor, useNode } from "@craftjs/core";
import { Button } from "./user/Button";
import { Text } from "./user/Text";
import { Container } from "./user/Container";
import { Card } from "./user/Card";
import { Image } from "./user/Image";
import SimpleSlider from "./user/Carousel";
import { ResizableContainer } from "./user/ResizableContainer";

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Box px={2} py={2}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
            variant="contained"
          >
            Button
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(ref, <Image text="Click me" size="small" />)
            }
            variant="contained"
          >
            Image
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(ref, <SimpleSlider  />)
            }
            variant="contained"
          >
            Slider
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
            variant="contained"
          >
            Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <Element is={Container} padding={20} canvas />
              )
            }
            variant="contained"
          >
            Container
          </MaterialButton>
        </Grid>
        {/* <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <ResizableContainer canvas />
              )
            }
            variant="contained"
          >
            Resizable Container
          </MaterialButton>
        </Grid> */}
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Card />)}
            variant="contained"
          >
            Card
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};

// src/components/Toolbox.js
// import React from 'react';
// import { Element, useEditor } from '@craftjs/core';
// import { Container } from './Container';
// import { Text } from './user/Text';

// export const Toolbox = () => {
//   const { connectors } = useEditor();

//   return (
//     <div style={{ padding: '10px', border: '1px solid black' }}>
//       <h3>Toolbox</h3>
//       <div
//         ref={(ref) => connectors.create(ref, <Text text="New Text" />)}
//         style={{ marginBottom: '10px' }}
//       >
//         Add Text
//       </div>
//       <div
//         ref={(ref) => connectors.create(ref, <Element is={Container} canvas />)}
//       >
//         Add Container
//       </div>
//     </div>
//   );
// };
