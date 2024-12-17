const faucetForm = document.querySelector(".faucet-form");
const fundButton = faucetForm.querySelector(".fund-button");

const validateAddress = (address) => {
  return address.match(/0[xX][a-fA-F0-9]{64}/);
};

fundButton.addEventListener("click", async () => {
  const network = faucetForm.querySelector(
    'input[name="network"]:checked'
  ).value;
  const address = faucetForm.querySelector(".address").value;

  if (validateAddress(address) === null) {
    alert("Invalid address");
    return;
  }

  const faucetUrl = `https://faucet.${network}.sui.io/v1/gas`;

  let response;
  try {
    response = await fetch(faucetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FixedAmountRequest: {
          recipient: address,
        },
      }),
    });
  } catch (e) {
    // The faucet responds inconsistently if the limit is reached.
    // It just causes a CORS error, so we have to work around it.
    alert(
      `Failed to fund. Probably too many requests from this client have been sent to the faucet. Please try again later`
    );
    console.error(e);
    return;
  }

  if (response.status === 429) {
    alert(
      `Too many requests from this client have been sent to the faucet. Please try again later`
    );
    return;
  }

  try {
    const parsed = await response.json();
    if (parsed.error) {
      alert(`Faucet returns error: ${parsed.error}`);
      console.error(parsed.error);
      return;
    }
  } catch (e) {
    alert(
      `Encountered error when parsing response from faucet, error: ${e}, status ${response.status}, response ${response}`
    );
    console.error(e);
    return;
  }

  alert("Funded successfully");
  return;
});
