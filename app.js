// Ensure MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log("MetaMask is installed");
} else {
    alert("MetaMask is not installed. Please install it to continue.");
}

const connectMetaMaskButton = document.getElementById('connectMetaMask');
const connectWalletConnectButton = document.getElementById('connectWalletConnect');

// Connect to MetaMask
connectMetaMaskButton.addEventListener('click', async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected to MetaMask:", accounts);
        alert('Connected to MetaMask');
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert('Failed to connect to MetaMask');
    }
});

// Connect to WalletConnect (example setup)
connectWalletConnectButton.addEventListener('click', () => {
    // Example: You would need WalletConnect integration here
    alert('WalletConnect not implemented yet');
});

// Fetch market data (Bitcoin, Ethereum, etc.)
async function fetchMarketData() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,ripple,solana,cardano'
        }
    });

    const data = await response.json();
    displayMarketData(data);
}

// Display market data
function displayMarketData(data) {
    const cryptoList = document.getElementById('cryptoList');
    cryptoList.innerHTML = ''; // Clear existing data
    data.forEach(coin => {
        const listItem = document.createElement('li');
        listItem.textContent = `${coin.name}: $${coin.current_price}`;
        cryptoList.appendChild(listItem);
    });
}

// Call fetchMarketData on page load
fetchMarketData();
