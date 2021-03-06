// raw JS uses import instead of require
import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"
const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")

// .onclick is all lowercase, no ()
connectButton.onclick = connect
fundButton.onclick = fund
// console.log(ethers)
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw
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

async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        // All these native functions are explained in ethers docs
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value //grabs whatever is inputted form with ethamount
    console.log("Funding with " + ethAmount + "...")

    if (typeof window.ethereum !== "undefined") {
        //need api/provider to blockchain
        const provider = new ethers.providers.Web3Provider(window.ethereum) //extrapolates api http and instantiates new object instance
        //need signer/wallet
        const signer = provider.getSigner() //returns signer addr
        console.log(signer)
        //need contract to interact with
        const contract = new ethers.Contract(contractAddress, abi, signer)
        //Catching errorcodes and logging them is GOOD practice
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            //await strinctly means, WAIT for this function to fully finish, can find explanation below
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!!!")
        } catch (error) {
            console.log(error)
        }
    }
}

// listener for transaction being mined, await is called when whole function is called above so that it proceeds line by line
function listenForTransactionMine(transactionResponse, provider) {
    console.log("Mining " + transactionResponse.hash + "...")
    //docs.ethers.io/v5/api/providers/provider/#Provider-once
    // provider.once is an ethers function, read docs to get more clarification or look at the module, its all there
    // events, promises to order functions better, will have to research how they work more in depth
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                "completed with " +
                    transactionReceipt.confirmations +
                    " confirmations"
            )
            resolve()
        })
    })
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner() //returns signer addr
        //need contract to interact with
        const contract = new ethers.Contract(contractAddress, abi, signer)
        console.log("Withdrawing all funds...")
        //Catching errorcodes and logging them is GOOD practice
        try {
            const transactionResponse = await contract.withdraw()
            //await strinctly means, WAIT for this function to fully finish, can find explanation below
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}
