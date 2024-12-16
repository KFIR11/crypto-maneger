// פונקציה להתחבר ל-MetaMask
async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // מבקש את כתובת הארנק ממטאמסק
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("MetaMask connected:", accounts[0]);
            document.getElementById('account').innerText = "Connected Account: " + accounts[0];
        } catch (error) {
            console.error("Error connecting MetaMask:", error);
            alert("An error occurred while connecting MetaMask.");
        }
    } else {
        alert("MetaMask is not installed. Please install it to connect.");
    }
}

// פונקציה להתחבר ל-WalletConnect
async function connectWalletConnect() {
    if (typeof window.walletConnectProvider !== 'undefined') {
        try {
            // התחברות ל-WalletConnect
            await window.walletConnectProvider.enable();
            console.log("WalletConnect connected");
            document.getElementById('walletConnectStatus').innerText = "WalletConnect is connected";
        } catch (error) {
            console.error("Error connecting WalletConnect:", error);
            alert("An error occurred while connecting WalletConnect.");
        }
    } else {
        alert("WalletConnect is not available.");
    }
}

// הוספת מאזין לאירועים של הכפתורים
document.getElementById('connectMetaMask').addEventListener('click', connectMetaMask);
document.getElementById('connectWalletConnect').addEventListener('click', connectWalletConnect);
