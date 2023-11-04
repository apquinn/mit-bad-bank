export default function findCurrentAttribute(attribute, ctx) {
  let selectedItem = "";
  ctx.users.forEach((user) => {
    if (user.loggedin === true) {
      if (attribute === "name") selectedItem = user.name;
      else if (attribute === "balance") selectedItem = user.balance;
    }
  });
  if (selectedItem !== "") return selectedItem;
  else return null;
}
