//https://docs.metamask.io/guide/
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    //connection script
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected!";
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install metamask!";
  }
}
