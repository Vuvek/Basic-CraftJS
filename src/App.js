import React, { useEffect } from "react";
import { Typography, Paper, Grid } from "@material-ui/core";

import { Toolbox } from "./components/Toolbox";
import { SettingsPanel } from "./components/SettingsPanel";
import { Container } from "./components/user/Container";
import { Button } from "./components/user/Button";
import { Card, CardBottom, CardTop } from "./components/user/Card";
import { Text } from "./components/user/Text";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Topbar } from "./components/Topbar";
import { Image } from "./components/user/Image";
import SimpleSlider from "./components/user/Carousel";
import { ResizableContainer } from "./components/user/ResizableContainer";
import ScrollingLogo from "./components/user/ScrollingLogo";
import { Row, Rows } from "./components/user/Rows";
import { Column, Columns } from "./components/user/Columns";
import {
  ProductContainer,
  ProductContainerContent,
} from "./components/user/ProductContainer";
import LoadOldData from "./components/LoadOldData";

export default function App() {
  const initialData = localStorage.getItem("pageData"); // Fetch saved JSON from storage

  return (
    <div className="p-2">
      <Typography variant="h5" align="center" className="my-5">
        Page Editor
      </Typography>
      <Editor
        resolver={{
          LoadOldData,
          Row,
          Column,
          Rows,
          Columns,
          Card,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          Image,
          SimpleSlider,
          ScrollingLogo,
          ResizableContainer,
          ProductContainer,
          ProductContainerContent,
        }}
      >
        <Topbar />

        <Grid container spacing={3}>
          {/* Left Side - Toolbox */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} className="p-4">
              <Toolbox />
            </Paper>
          </Grid>

          {/* Middle - Canvas */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="p-4">
              <Frame>
                {initialData ? <LoadOldData /> : (
                  <Element is={Container} padding={5} background="" canvas>
                    {/* <Card /> */}
                    <SimpleSlider />
                    <ScrollingLogo />
                    {/* <Button size="small" variant="outlined">
                    Click
                  </Button>
                  <Text size="small" text="Hi!" />
                  <Element is={Container} padding={2} background="#999" canvas>
                    <Text size="small" text="Hello" />
                  </Element> */}
                  </Element>
                )}
              </Frame>
            </Paper>
          </Grid>

          {/* Right Side - Settings Panel */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} className="p-4">
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
}
