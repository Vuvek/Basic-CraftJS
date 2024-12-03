// import React, { useState, useEffect } from "react";

// import { Element, useNode, useEditor } from "@craftjs/core";
// import { Container } from "./Container";
// import { Label } from "../ui/form/Label";
// import { TextInput } from "../ui/form/TextInput";

// const EmptyColumn = () => {
//   return (
//     <div className="m-1 p-4 italic text-gray-600 bg-teal-100">Empty column</div>
//   );
// };

// export const Column = ({ children, className, ...props }) => {
//   const {
//     connectors: { connect },
//   } = useNode();

//   return (
//     <div {...props} ref={connect} className={`w-full ${className}`}>
//       {children ? <React.Fragment>{children}</React.Fragment> : <EmptyColumn />}
//     </div>
//   );
// };

// export const Columns = ({ numberOfCols, gap, children }) => {
//   const { enabled } = useEditor((state) => ({
//     enabled: state.options.enabled,
//   }));

//   const gridClasses = `grid gap-${gap}
//                       grid-cols-${numberOfCols}
//                       sm:grid-cols-${numberOfCols}
//                       md:grid-cols-${numberOfCols}
//                       lg:grid-cols-${numberOfCols}`;

//   const colClass =
//     numberOfCols === 1
//       ? "w-full"
//       : gridClasses;

//   return (
//     <Container
//       className={`outline-dashed outline-1 outline-teal-300 ${colClass} ${
//         enabled && "hover:border-t-8 border-t-sky-500"
//       } `}
//     >
//       {children ??
//         [...Array(numberOfCols).keys()].map((id) => (
//           <Element key={id} is={Column} id={`column-${id}`} canvas />
//         ))}
//     </Container>
//   );
// };

// const ColumnsSettings = () => {
//   const {
//     actions: { setProp },
//     numberOfCols,
//     gap,
//   } = useNode((node) => ({
//     numberOfCols: node.data.props.numberOfCols,
//     gap: node.data.props.gap,
//   }));
//   return (
//     <>
//       <Label label="Number of columns">
//         <TextInput
//           type="number"
//           defaultValue={numberOfCols}
//           step={1}
//           min={1}
//           max={10}
//           onChange={(e) => {
//             setProp(
//               (props) => (props.numberOfCols = parseInt(e.target.value, 10)),
//               1000
//             );
//           }}
//         />
//       </Label>
//       <Label label="Gap">
//         <TextInput
//           type="number"
//           defaultValue={gap}
//           step={1}
//           min={0}
//           max={10}
//           onChange={(e) => {
//             setProp(
//               (props) => (props.gap = parseInt(e.target.value, 10)),
//               1000
//             );
//           }}
//         />
//       </Label>
//     </>
//   );
// };

// export const ColumnsDefaultProps = {
//   numberOfCols: 2,
//   gap: 0,
// };

// Columns.craft = {
//   props: ColumnsDefaultProps,
//   related: {
//     settings: ColumnsSettings,
//   },
// };

import React from "react";
import { Element, useNode, useEditor } from "@craftjs/core";
import { Container } from "./Container";
import { Label } from "../ui/form/Label";
import { TextInput } from "../ui/form/TextInput";

const EmptyColumn = () => (
  <div className="m-1 p-4 italic text-gray-600 bg-teal-100">Empty column</div>
);

export const Column = ({ children, className, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div {...props} ref={connect} className={` ${className} border-2 border-solid p-4 mr-5 mb-8`}>
      {children ? children : <EmptyColumn />}
    </div>
  );
};

export const Columns = ({ numberOfCols, gap, children,wrap }) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const gridClasses = `
    grid gap-${gap}`;
  console.log(numberOfCols, "kasjdfkljsdlkfjsldajfslkfjslakdfjslkjfsk");

  return (
    <>
      
      <Container
        className={`grid gap-${gap} ${gridClasses} ${
          enabled &&
          "hover:border-t-8 border-t-sky-500 outline-dashed outline-1 outline-teal-300"
        }`}
        style={{
          gridTemplateColumns: `repeat(${wrap ? 'auto-fit': numberOfCols}, minmax(${wrap ? '380px' : 0}, 1fr))`,
        }}
      >
        {children ??
          [...Array(numberOfCols).keys()].map((id) => (
            <Element key={id} is={Column} id={`column-${id}`} canvas />
          ))}
      </Container>
    </>
  );
};

const ColumnsSettings = () => {
  const {
    actions: { setProp },
    numberOfCols,
    gap,
    wrap,
  } = useNode((node) => ({
    numberOfCols: node.data.props.numberOfCols,
    gap: node.data.props.gap,
    wrap: node.data.props.wrap,
  }));

  return (
    <>
      <Label label="Number of columns">
        <TextInput
          type="number"
          defaultValue={numberOfCols}
          step={1}
          min={1}
          max={10}
          onChange={(e) => {
            setProp(
              (props) => (props.numberOfCols = parseInt(e.target.value, 10)),
              1000
            );
          }}
        />
      </Label>
      <Label label="Gap">
        <TextInput
          type="number"
          defaultValue={gap}
          step={1}
          min={0}
          max={10}
          onChange={(e) => {
            setProp(
              (props) => (props.gap = parseInt(e.target.value, 10)),
              1000
            );
          }}
        />
      </Label>
      <Label
        label={"Show Arrows"}
        className="block mb-2 text-sm font-medium text-gray-900 ltr:mr-2 rtl:ml-2"
      >
        <TextInput
          checked={wrap}
          onChange={(e) =>
            setProp((props) => (props.wrap = e.target.checked))
          }
          type="checkbox"
          value=""
          className="peer sr-only"
        />
        <div className="after:start-[2px] mt-2 peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      </Label>
    </>
  );
};

export const ColumnsDefaultProps = {
  numberOfCols: 2,
  gap: 4,
  wrap: false,
};

Columns.craft = {
  props: ColumnsDefaultProps,
  related: {
    settings: ColumnsSettings,
  },
};
