// בדיקה אם MetaMask מותקן
function checkMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log("MetaMask is installed.");
        return true;
    } else {
        console.error("MetaMask is not installed.");
        alert("MetaMask is not installed. Please install MetaMask to continue.");
        return false;
    }
}

// פונקציה להתחבר ל-MetaMask
async function connectMetaMask() {
    if (!checkMetaMask()) return;

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected account:", accounts[0]);
        document.getElementById('metaMaskStatus').innerText = `Connected to MetaMask: ${accounts[0]}`;
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask. Check the console for more details.");
    }
}

// פונקציה לבדוק אם WalletConnect זמין
function checkWalletConnect() {
    if (typeof window.walletConnectProvider !== 'undefined') {
        console.log("WalletConnect is available.");
        return true;
    } else {
        console.error("WalletConnect is not available.");
        alert("WalletConnect is not available in this browser.");
        return false;
    }
}

// פונקציה להתחבר ל-WalletConnect
async function connectWalletConnect() {
    if (!checkWalletConnect()) return;

    try {
        await window.walletConnectProvider.enable();
        console.log("WalletConnect connected.");
        document.getElementById('walletConnectStatus').innerText = "Connected to WalletConnect.";
    } catch (error) {
        console.error("Error connecting to WalletConnect:", error);
        alert("Failed to connect to WalletConnect. Check the console for more details.");
    }
}

// מאזינים לכפתורים
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectMetaMask').addEventListener('click', connectMetaMask);
    document.getElementById('connectWalletConnect').addEventListener('click', connectWalletConnect);
});
