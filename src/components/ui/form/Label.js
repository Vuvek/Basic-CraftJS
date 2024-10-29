export const Label = ({ label, children,className }) => (
    <label className={`${className ? className : "block mb-2 text-sm font-medium text-gray-900"}`}>
      {label}
      {children}
    </label>
  );
  