const faucetForm = document.querySelector(".faucet-form");
const fundButton = faucetForm.querySelector(".fund-button");

const validateAddress = (address) => {
  return address.match(/0[xX][a-fA-F0-9]{64}/);
};

fundButton.addEventListener("click", async () => {
  const selectedNetwork = faucetForm.querySelector(
    'input[name="network"]:checked'
  ).value;
  const address = faucetForm.querySelector(".address").value;

  if (validateAddress(address) === null) {
    alert("Invalid address");
    return;
  }

  const response = await fetch(
    `https://faucet.${selectedNetwork}.sui.io/v1/gas`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FixedAmountRequest: {
          recipient: address,
        },
      }),
    }
  );

  if (response.ok) {
    alert("Funded successfully");
    return;
  }

  alert(`Failed to fund: ${response.statusText}`);
});
