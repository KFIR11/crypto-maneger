document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const walletAddress = document.getElementById('walletAddress');

    // בודק האם MetaMask מותקן
    if (typeof window.ethereum === 'undefined') {
        walletAddress.textContent = 'MetaMask is not installed. Please install MetaMask and try again.';
        return;
    }

    // פונקציה לחיבור לארנק MetaMask
    async function connectMetaMask() {
        try {
            // מבקש גישה לחשבון
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            walletAddress.textContent = `Connected: ${account}`;
            console.log('Connected account:', account);
        } catch (error) {
            walletAddress.textContent = 'Failed to connect to MetaMask.';
            console.error('Error connecting to MetaMask:', error);
        }
    }

    // מאזין ללחיצה על הכפתור
    connectButton.addEventListener('click', connectMetaMask);
});
