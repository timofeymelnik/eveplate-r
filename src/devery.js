import {EveToken, DeveryRegistry, DeveryERC721} from "@devery/devery";

const registryAddress = '0x0364a98148b7031451e79b93449b20090d79702a';

export const deveryRegistryClient = new DeveryRegistry();
export const deveryERC721Client = new DeveryERC721();

export {Utils} from "@devery/devery"

export async function checkAndUpdateAllowance(account, minAllowance = 40, total = 100) {
    try {
        const eveTokenClient = new EveToken();
        const {provider} = eveTokenClient.getProvider();
        const currentAllowance = await eveTokenClient.allowance(account, registryAddress);
        if (parseFloat(currentAllowance.toString()) / 10e17 < minAllowance) {
            const {hash} = await eveTokenClient.approve(registryAddress, total + '000000000000000000');
            await provider.waitForTransaction(hash)
        }
    } catch (e) {
        console.error(e)
    }
}
