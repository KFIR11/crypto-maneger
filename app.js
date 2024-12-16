// MetaMask integration
const metamaskConnectBtn = document.getElementById('metamask-connect');
const walletConnectBtn = document.getElementById('walletconnect-connect');
const marketDataDiv = document.getElementById('market-data');

// WalletConnect integration
let walletConnectProvider;
let walletConnectSession;

// Connect to MetaMask
metamaskConnectBtn.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            alert('Connected to MetaMask: ' + accounts[0]);
            fetchMarketData();
        } catch (error) {
            console.error(error);
            alert('Failed to connect to MetaMask');
        }
    } else {
        alert('MetaMask is not installed');
    }
});

// Connect to WalletConnect
walletConnectBtn.addEventListener('click', () => {
    const walletConnect = new WalletConnectClient({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModalOptions: {
            mobileLinks: ["metamask", "trust", "coinbase"]
        }
    });

    // Check if already connected
    if (!walletConnect.connected) {
        walletConnect.createSession().then(() => {
            const uri = walletConnect.uri;
            document.getElementById('walletconnect-qr').src = `https://api.walletconnect.org/v1/qr/${uri}`;
            document.getElementById('walletconnect-modal').style.display = 'block';
        });
    }

    walletConnect.on('connect', async (error, payload) => {
        if (error) {
            console.error(error);
            return;
        }
        const { accounts } = payload.params[0];
        alert('Connected to WalletConnect: ' + accounts[0]);
        fetchMarketData();
        document.getElementById('walletconnect-modal').style.display = 'none';
    });
});

// Fetch market data (using a placeholder API)
async function fetchMarketData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana,cardano&vs_currencies=usd');
        const data = await response.json();
        const { bitcoin, ethereum, ripple, solana, cardano } = data;
        
        marketDataDiv.innerHTML = `
            <p>Bitcoin: $${bitcoin.usd}</p>
            <p>Ethereum: $${ethereum.usd}</p>
            <p>Ripple: $${ripple.usd}</p>
            <p>Solana: $${solana.usd}</p>
            <p>Cardano: $${cardano.usd}</p>
        `;
    } catch (error) {
        console.error(error);
        marketDataDiv.innerHTML = 'Error fetching market data';
    }
}
