const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const { TransactionResponse } = require("ethers")
describe("SimpleStorage", function () {
    let simpleStorageFactory
    let simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
        //expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const trasactionResponse = await simpleStorage.store(expectedValue)
        await trasactionResponse.wait()
        const currentVal = await simpleStorage.retrieve()
        assert.equal(currentVal.toString(), expectedValue)
    })
    it("Adding Person", async function () {
        const expectedFavorite = "3"
        const trasactionResponse = await simpleStorage.addPerson("Mani", "3")
        await trasactionResponse.wait()
        const favoriteNumber = await simpleStorage.nameToFavoriteNumber["Mani"]
        assert.equal(favoriteNumber.toString(), expectedFavorite)
    })
})
