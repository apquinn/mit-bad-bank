export default function DisplayAmountForm({
  balance,
  setAmount,
  amount,
  handleOnclick,
  type,
}) {
  return (
    <>
      <div
        style={{
          display: "inline-block",
          width: "150px",
          paddingBottom: "20px",
        }}
      >
        {" "}
        Balance
      </div>
      <div style={{ display: "inline-block" }}>{balance}</div>
      <br />
      {type} Amount
      <br />
      <input
        type="input"
        className="form-control"
        id="deposit"
        placeholder={type.toLowerCase() + " amount"}
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handleOnclick}>
        Deposit
      </button>
    </>
  );
}
