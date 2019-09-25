import {EveToken, DeveryRegistry, DeveryERC721} from "@devery/devery";

const registryAddress = '0x0364a98148b7031451e79b93449b20090d79702a';
const erc721Address = '0xe587090839ddabeada37d07d34c2b3ff5e1ee2b620b2fbfed49bf433ba8d09a3';

const checkAndUpdateAllowanceOfContract = contractAddress => async (account, minAllowance = 40, total = 100) => {
    try {
        const eveTokenClient = new EveToken();
        const {provider} = eveTokenClient.getProvider();
        const currentAllowance = await eveTokenClient.allowance(account, contractAddress);
        if (parseFloat(currentAllowance.toString()) / 10e17 >= minAllowance) return;

        const {hash} = await eveTokenClient.approve(contractAddress, `${total}000000000000000000`);
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
