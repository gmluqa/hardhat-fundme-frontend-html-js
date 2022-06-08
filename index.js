// raw JS uses import instead of require
import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"
const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
// .onclick is all lowercase, no ()
connectButton.onclick = connect
fundButton.onclick = fund
console.log(ethers)

//https://docs.metamask.io/guide/
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        //connection script
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected!"
    } else {
        connectButton.innerHTML.innerHTML = "Please install metamask!"
    }
}

async function fund() {
    const ethAmount = "77"
    console.log("Funding with " + ethAmount + "...")

    if (typeof window.ethereum !== "undefined") {
        //need api/provider to blockchain
        const provider = new ethers.providers.Web3Provider(window.ethereum) //extrapolates api http and instantiates new object instance
        //need signer/wallet
        const signer = provider.getSigner() //returns signer addr
        console.log(signer)
        //need contract to interact with
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.fund({
            value: ethers.utils.parseEther(ethAmount),
        })
        //need ABI + interface
    }
}

// withdraw function
