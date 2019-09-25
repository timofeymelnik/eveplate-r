import {EveToken, DeveryRegistry, DeveryERC721} from "@devery/devery";

const registryAddress = '0x0364a98148b7031451e79b93449b20090d79702a';
const erc721Address = '0x032ef0359eb068d3dddd6e91021c02f397afce5a';

const checkAndUpdateAllowanceOfContract = contractAddress => async (account, minAllowance = 40, total = 100) => {
    try {
        const eveTokenClient = new EveToken();
        const currentAllowance = await eveTokenClient.allowance(account, contractAddress);
        if (parseFloat(currentAllowance.toString()) / 10e17 >= minAllowance) return;

        const {hash} = await eveTokenClient.approve(contractAddress, `${total}000000000000000000`);
        const {provider} = eveTokenClient.getProvider();
        await provider.waitForTransaction(hash)
    } catch (e) {
        console.error(e)
    }
};

const allowanceForERC = checkAndUpdateAllowanceOfContract(erc721Address);
const allowanceForRegistry = checkAndUpdateAllowanceOfContract(registryAddress);

export const deveryRegistryClient = new DeveryRegistry();
export const deveryERC721Client = new DeveryERC721();

export {Utils} from "@devery/devery"

export async function checkAndUpdateAllowance(account, minAllowance = 40, total = 100) {
    await allowanceForERC(account, minAllowance, total);
    await allowanceForRegistry(account, minAllowance, total);
}
