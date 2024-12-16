document.getElementById("connectMetaMask").addEventListener("click", connectMetaMask);

let web3;

function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    // זה מאמת ש-MetaMask מותקן
    web3 = new Web3(window.ethereum);
    ethereum.request({ method: 'eth_requestAccounts' })  // זה יבקש גישה לחשבונות ה-ETH
      .then(accounts => {
        console.log('Connected to MetaMask with account:', accounts[0]);
        // לאחר החיבור נבצע פצ'ינג של נתוני שוק
        getMarketData();
      })
      .catch(error => {
        console.error('Error connecting to MetaMask:', error);
        alert('Please install MetaMask!');
      });
  } else {
    alert('MetaMask is not installed!');
  }
}

function getMarketData() {
  // כאן אנחנו שולחים בקשה ל-API של CoinGecko כדי לקבל את מחירי המטבעות
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const bitcoinPrice = data.bitcoin.usd;
      const ethereumPrice = data.ethereum.usd;
      document.getElementById('marketData').innerHTML = `
        <p>Bitcoin: $${bitcoinPrice}</p>
        <p>Ethereum: $${ethereumPrice}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching market data:', error);
    });
}
