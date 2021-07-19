
describe("Clone Factory", function() {
    it("deployment", async function() {
        const MetaCoinInstance = await ethers.getContractFactory("MetaCoin");
        const metaCoin = await MetaCoinInstance.deploy();
        console.log("metaCoin address is: " + metaCoin.address);
    });
})