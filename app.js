// בדיקת זמינות MetaMask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask detected');
} else {
    alert('MetaMask is not installed. Please install it to continue.');
    throw new Error('MetaMask is not installed');
}

// כפתור התחברות ל-MetaMask
const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

connectButton.addEventListener('click', async () => {
    try {
        console.log('Trying to connect to MetaMask...');
        
        // בקשת חשבונות מ-MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts && accounts.length > 0) {
            const account = accounts[0];
            console.log('Connected to account:', account);
            
            // הצגת חשבון מחובר
            accountInfo.innerHTML = `<p>Connected Account: ${account}</p>`;
        } else {
            throw new Error('No accounts returned from MetaMask.');
        }
    } catch (error) {
        console.error('Failed to connect to MetaMask:', error);
        alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
    }
});

// מאזין לשינויים בחשבונות MetaMask
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            console.log('Account changed to:', accounts[0]);
            accountInfo.innerHTML = `<p>Connected Account: ${accounts[0]}</p>`;
        } else {
            console.log('No accounts connected');
            accountInfo.innerHTML = '<p>No accounts connected</p>';
        }
    });
}
