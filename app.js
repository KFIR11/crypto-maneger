async function getWalletInfo() {
    const address = document.getElementById("walletAddress").value;
    const apiKey = document.getElementById("apiKey").value;

    if (!address || !apiKey) {
        alert("Please enter a wallet address and your API Key.");
        return;
    }

    const etherscanURL = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

    try {
        const response = await fetch(etherscanURL);
        const data = await response.json();

        if (data.status === "1") {
            const balance = data.result / 1e18; // להפוך לאת'ר
            document.getElementById("walletInfo").textContent = `Balance: ${balance} ETH`;
        } else {
            document.getElementById("walletInfo").textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        document.getElementById("walletInfo").textContent = `Error: ${error.message}`;
    }
}
