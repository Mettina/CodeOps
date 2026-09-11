export default function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  inputRef,
  children,
}) {
  const errorId = `${name}-error`;
  const showError = touched && error;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      {children ? (
        children
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          ref={inputRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={touched && !!error}
          aria-describedby={showError ? errorId : undefined}
        />
      )}
      {showError && (
        <p id={errorId} role="alert" className="hint hint-bad">
          {error}
        </p>
      )}
    </>
  );
}