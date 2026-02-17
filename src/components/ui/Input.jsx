export const Input = ({ label, error, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
    )}
    <input
      className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${error ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);
