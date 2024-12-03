import { Element, useEditor, useNode } from "@craftjs/core";


export const ProductContainerContent = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      {...props}
      ref={connect}
      className={`p-4 border-1 border-solid flex flex-wrap justify-center items-center w-full pl-[15px] pr-[15px] mb-[30px] lg:mb-[0px] lg:order-1 lg:w-[50%] ${
        enabled && "py-8 outline-1 outline-dashed outline-cyan-600"
      }`}
    >
      {children ? (
        children
      ) : (
        <p>Empty product container. Drop some product components</p>
      )}{" "}
    </div>
  );
};

export const ProductContainer = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
        {children ?? (
          <Element
            is={ProductContainerContent}
            id="product-container-placeholder"
            canvas
          />
        )}
    </div>
  );
};
