// בדיקת MetaMask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('MetaMask is not installed. Please install it to continue.');
    throw new Error('MetaMask is not installed');
}

// התחברות ל-MetaMask
const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

connectButton.addEventListener('click', async () => {
    try {
        console.log('Attempting to connect to MetaMask...');
        
        // בקשת חשבונות מ-MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            throw new Error('No accounts found');
        }
        
        const account = accounts[0];
        console.log('Connected account:', account);

        // הצגת הכתובת המחוברת
        accountInfo.innerHTML = `<p>Connected Account: ${account}</p>`;
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert(`Failed to connect to MetaMask: ${error.message}`);
    }
});

// האזנה לשינויים בכתובת הארנק
window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
        console.log('Account changed:', accounts[0]);
        accountInfo.innerHTML = `<p>Connected Account: ${accounts[0]}</p>`;
    } else {
        console.log('No accounts connected');
        accountInfo.innerHTML = '<p>No accounts connected</p>';
    }
});
