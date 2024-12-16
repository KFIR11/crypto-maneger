// חיבור ל-MetaMask
document.getElementById('connect-metamask').addEventListener('click', async () => {
    const walletStatus = document.getElementById('wallet-status');
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask detected.');

        try {
            // בקשת הרשאה להתחבר לארנק
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log('Connected to MetaMask account:', account);
            walletStatus.textContent = `Connected to MetaMask: ${account}`;
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);

            // טיפול בשגיאות
            if (error.code === 4001) {
                walletStatus.textContent = 'User rejected the connection request.';
            } else {
                walletStatus.textContent = 'Failed to connect to MetaMask. Please try again.';
            }
        }
    } else {
        console.error('MetaMask not installed.');
        walletStatus.textContent = 'MetaMask is not installed. Please install it and try again.';
    }
});

// שליפת נתוני שוק
document.getElementById('fetch-market-data').addEventListener('click', async () => {
    const marketDataList = document.getElementById('market-data');
    marketDataList.innerHTML = 'Loading market data...';

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana,cardano&vs_currencies=usd');
        const data = await response.json();

        marketDataList.innerHTML = ''; // איפוס הרשימה
        for (const [coin, details] of Object.entries(data)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${coin.toUpperCase()}: $${details.usd}`;
            marketDataList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching market data:', error);
        marketDataList.textContent = 'Failed to load market data.';
    }
});
