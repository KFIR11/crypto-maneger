// בדיקת קיום MetaMask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask to use this app!');
}

// כפתור להתחברות
const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

// להתחבר ל-MetaMask
connectButton.addEventListener('click', async () => {
    try {
        console.log('Trying to connect to MetaMask...');
        
        // בקשת התחברות ל-MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // כתובת הארנק הראשון
        
        // הצגת כתובת הארנק
        accountInfo.innerHTML = `<p>Connected Account: ${account}</p>`;
        console.log(`Connected to MetaMask: ${account}`);
    } catch (error) {
        // טיפול בשגיאה
        console.error('Error connecting to MetaMask:', error);

        // הצגת הודעה ברורה
        if (error.code === 4001) {
            alert('Connection request was rejected by the user.');
        } else if (error.code === -32002) {
            alert('A connection request is already pending. Please check your MetaMask.');
        } else {
            alert('An unexpected error occurred. Please try again later.');
        }
    }
});
