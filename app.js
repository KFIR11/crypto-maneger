async function getWalletInfo() {
    const walletAddress = document.getElementById('walletAddress').value;
    const ethApiKey = document.getElementById('ethApiKey').value;
    const bscApiKey = document.getElementById('bscApiKey').value;
    const cronosApiKey = document.getElementById('cronosApiKey').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = 'Loading...';

    if (!walletAddress || !ethApiKey || !bscApiKey || !cronosApiKey) {
        outputDiv.innerHTML = 'Please fill in all fields!';
        return;
    }

    try {
        // Fetch data from each blockchain
        const ethData = await fetchWalletData(walletAddress, ethApiKey, 'ethereum');
        const bscData = await fetchWalletData(walletAddress, bscApiKey, 'bsc');
        const cronosData = await fetchWalletData(walletAddress, cronosApiKey, 'cronos');

        // Display the summary of wallet balances
        outputDiv.innerHTML = `
            <h2>Wallet Info for Address: ${walletAddress}</h2>
            <div class="network-info">
                <div class="network-title">Ethereum (ETH):</div>
                <p>Balance: ${ethData.balance} ETH</p>
            </div>
            <div class="network-info">
                <div class="network-title">Binance Smart Chain (BNB):</div>
                <p>Balance: ${bscData.balance} BNB</p>
            </div>
            <div class="network-info">
                <div class="network-title">Cronos (CRO):</div>
                <p>Balance: ${cronosData.balance} CRO</p>
            </div>
            <h3>Total Balances for Wallet:</h3>
            <p><strong>Ethereum (ETH):</strong> ${ethData.balance} ETH</p>
            <p><strong>Binance Smart Chain (BNB):</strong> ${bscData.balance} BNB</p>
            <p><strong>Cronos (CRO):</strong> ${cronosData.balance} CRO</p>
        `;
    } catch (error) {
        outputDiv.innerHTML = 'Error fetching wallet info. Please check the API keys and address.';
    }
}

async function fetchWalletData(walletAddress, apiKey, network) {
    let url;
    if (network === 'ethereum') {
        url = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKey}`;
    } else if (network === 'bsc') {
        url = `https://api.bscscan.com/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKey}`;
    } else if (network === 'cronos') {
        url = `https://api.cronos.org/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "1") {
        throw new Error("Failed to fetch data");
    }

    return {
        balance: (data.result / 1e18).toFixed(6), // Convert from wei to eth/bnb/cro
    };
}
