// raw JS uses import instead of require
import { ethers } from "./ethers-5.6.esm.min.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
// .onclick is all lowercase, no ()
connectButton.onclick = connect
fundButton.onclick = fund

//https://docs.metamask.io/guide/
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        //connection script
        await window.ethereum.request({ method: "eth_requestAccounts" })
        document.getElementById("connectButton").innerHTML = "Connected!"
    } else {
        document.getElementById("connectButton").innerHTML =
            "Please install metamask!"
    }
}

async function fund(ethAmount) {
    console.log("Funding with " + ethAmount + "...")
    if (typeof window.ethereum !== "undefined") {
        //need api to blockchain
        //need signer/wallet
        //need contract to interact with
        //need ABI + interface
    }
}

// withdraw function
