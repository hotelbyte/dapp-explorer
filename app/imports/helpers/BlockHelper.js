import BigNumber from 'bignumber.js'


export function CalculateRewards(_this, block){
    let blockReward = new BigNumber(9);
    if (block.uncles.length > 0) {
        let uncleReward = blockReward.div(new BigNumber(32));
        blockReward = blockReward.plus(uncleReward.multipliedBy(new BigNumber(block.uncles.length)));
    }
    return blockReward.plus(CalculateFees(_this,block.gasUsed));
}

export function CalculateFees(_this, gasUsed) {
    let totalGasUsed = new BigNumber(gasUsed).plus(_this.state.txGas);
    let gasPrice = new BigNumber(_this.state.gasPrice);
    let fees = gasPrice.multipliedBy(new BigNumber(totalGasUsed));
    return web3.utils.fromWei(web3.utils.toBN(fees), 'ether');
}