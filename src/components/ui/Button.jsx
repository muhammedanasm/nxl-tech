export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
