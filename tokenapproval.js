// Token approval function
async function approveToken(tokenAddress, spenderAddress, amount) {
    const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    try {
        const result = await tokenContract.methods.approve(
            spenderAddress, 
            amount
        ).send({ from: account });
        
        return result;
    } catch (error) {
        console.error('Approval failed:', error);
        throw error;
    }
}

// Check allowance and approve if needed
async function checkAllowanceAndSwap() {
    const tokenContract = new web3.eth.Contract(ERC20_ABI, fromToken.address);
    const allowance = await tokenContract.methods.allowance(account, ROUTER_ADDRESS).call();
    const amountIn = web3.utils.toWei(fromAmountInput.value, 'ether');
    
    if (allowance < amountIn) {
        transactionStatus.textContent = 'Approving token...';
        await approveToken(fromToken.address, ROUTER_ADDRESS, amountIn);
    }
    
    await executeRealSwap();
}