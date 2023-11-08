export default function DisplayAccountField({ type, id, value, handleChange }) {
  return (
    <>
      <br />
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={"Enter " + id}
        value={value}
        onChange={handleChange}
      />
      <br />
    </>
  );
}
