// בודק אם MetaMask מותקן
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask!');
}

// כפתור להתחברות ל-MetaMask
const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

// התחברות ל-MetaMask
connectButton.addEventListener('click', async () => {
    try {
        // בקשה למידע מהארנק
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        // הצגת כתובת הארנק
        accountInfo.innerHTML = `<p>Connected Account: ${account}</p>`;
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Connection failed');
    }
});
