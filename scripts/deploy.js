//imports
const { ethers, run, network } = require("hardhat")
require("dotenv").config()
//async main
async function main() {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    let contractAddress = await simpleStorage.getAddress()
    console.log(`Deployed contract to:${contractAddress}`)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await verify(contractAddress, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is:${currentValue}`)
    //update current value
    const trasactionResponse = await simpleStorage.store(7)
    console.log(`Updated number is:${await simpleStorage.retrieve()}`)
}
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}
//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
