import {EveToken, DeveryRegistry, Utils} from "@devery/devery";

export default new DeveryRegistry();

export async function checkAndUpdateAllowance(account, address, minAllowance = 40, total = 100) {
    try {
        const eveTokenClient = new EveToken();
        const {provider} = eveTokenClient.getProvider();
        const currentAllowance = await eveTokenClient.allowance(account, address);
        if (parseFloat(currentAllowance.toString()) / 10e17 < minAllowance) {
            const {hash} = await eveTokenClient.approve(address, total + '000000000000000000');
            await provider.waitForTransaction(hash)
        }
    } catch (e) {
        console.error(e)
    }
}
