// Track user transactions
function trackTransaction(hash, fromToken, toToken, fromAmount, toAmount) {
    const transactions = JSON.parse(localStorage.getItem('zenTxTransactions') || '[]');
    transactions.unshift({
        hash,
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('zenTxTransactions', JSON.stringify(transactions));
    updateTransactionHistoryUI();
}