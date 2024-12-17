const address = document.getElementById("address");
const faucet = document.getElementById("faucet");

faucet.addEventListener("click", async () => {
  const address = document.getElementById("address").value;
  if (address.length !== 42) {
    alert("Invalid address");
    return;
  }
  const response = await fetch("https://faucet.devnet.sui.io/gas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FixedAmountRequest: {
        recipient: address,
        amount: 1000,
      },
    }),
  });
  if (response.ok) {
    alert("Faucet sent");
  } else {
    alert("Faucet failed");
  }
});
