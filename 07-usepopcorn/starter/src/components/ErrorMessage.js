export function ErrorMessage({ children }) {
  return (
    <div className="error">
      <span> 🚫 </span>
      {children}
    </div>
  );
}
