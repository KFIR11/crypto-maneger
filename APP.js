async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            document.getElementById("walletAddress").innerText = "Wallet Address: " + accounts[0];
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Error connecting to MetaMask. Check the console for details.");
        }
    } else {
        alert("MetaMask is not installed. Please install it to use this site.");
    }
}
