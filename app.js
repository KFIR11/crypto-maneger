document.getElementById('connectMetamask').addEventListener('click', connectMetaMask);
document.getElementById('fetchMarketData').addEventListener('click', fetchMarketData);

async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Try to connect to MetaMask
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]; // Take the first account
      document.getElementById('walletInfo').textContent = `Connected: ${account}`;
    } catch (error) {
      console.error("MetaMask connection error:", error);
      alert("Error connecting to MetaMask.");
    }
  } else {
    alert("MetaMask is not installed.");
  }
}

async function fetchMarketData() {
  const apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana,cardano&vs_currencies=usd";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const marketData = `
      Bitcoin: $${data.bitcoin.usd}
      Ethereum: $${data.ethereum.usd}
      Ripple: $${data.ripple.usd}
      Solana: $${data.solana.usd}
      Cardano: $${data.cardano.usd}
    `;
    document.getElementById('walletInfo').textContent = marketData;
  } catch (error) {
    console.error("Error fetching market data:", error);
  }
}
