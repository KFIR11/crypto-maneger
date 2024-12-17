// בדיקה האם MetaMask זמין בדפדפן
window.onload = () => {
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask Detected");
    } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
    }
};

// התחברות ל-MetaMask
const connectButton = document.getElementById("connectButton");
const walletAddressElement = document.getElementById("walletAddress");
const walletBalanceElement = document.getElementById("walletBalance");

connectButton.addEventListener("click", async () => {
    if (window.ethereum) {
        try {
            // בקשת גישה לארנק
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const userAddress = accounts[0];
            walletAddressElement.innerText = `Wallet Address: ${userAddress}`;

            // שליפת הבלנס
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [userAddress, "latest"]
            });
            
            const formattedBalance = parseFloat(window.web3.utils.fromWei(balance, "ether")).toFixed(4);
            walletBalanceElement.innerText = `Balance: ${formattedBalance} ETH`;

        } catch (err) {
            console.error("Error connecting to MetaMask", err);
            alert("Failed to connect to MetaMask. See console for details.");
        }
    } else {
        alert("MetaMask is not installed.");
    }
});
