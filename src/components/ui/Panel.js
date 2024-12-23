export const PanelSection = ({ title, children }) => {
    return (
      <div className="mb-2">
        <h2 className="text-gray-900 mb-2 text-md">{title}</h2>
        {children}
      </div>
    );
  };
  
  export const Panel = ({ className, children }) => {
    return (
      <div className={`p-4 bg-gray-100 shadow-md rounded ${className}`}>
        {children}
      </div>
    );
  };
  