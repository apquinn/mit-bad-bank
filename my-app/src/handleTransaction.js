function validate(field, label, setStatus) {
  if (!field) {
    setStatus("Error: " + label);
    setTimeout(() => setStatus(""), 3000);
    return false;
  }
  return true;
}

export default function handleTransaction(
  amount,
  setAmount,
  ctx,
  balance,
  setBalance,
  setStatus,
  type
) {
  if (!validate(amount, "amount")) return;

  if (type === "withdrawl") amount = 0 - Number(amount);

  ctx.users.map((user) => {
    let localBalance = Number(user.balance) + Number(amount);
    if (type === "withdrawl" && localBalance < 0) {
      setStatus(
        "Your balance will not cover the amount you are trying to withdraw. Please try a smaller amount."
      );
      setTimeout(() => setStatus(""), 3000);
      setAmount(0);
      return false;
    }
    user.balance = Number(user.balance) + Number(amount);
    setBalance(Number(balance) + Number(amount));
    setAmount(0);
  });
}
