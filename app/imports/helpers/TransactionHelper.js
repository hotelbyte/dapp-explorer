import {GetWeb3Proxy} from "./Web3Helper";
import BigNumber from "bignumber.js/bignumber";
import {StatePromise} from "./ComponentHelper";


export async function GetTxFees(_this, txns) {
    let txGas = new BigNumber(0);
    for (let i = 0; i<txns.length; i++) {
        let tx = await GetWeb3Proxy().eth.getTransaction(txns[i]);
        txGas = txGas.plus(new BigNumber(tx.gas));
    }
    await StatePromise(_this, {txGas: txGas})
}