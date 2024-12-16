// פונקציה להתחבר ל-MetaMask
async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            console.log("MetaMask detected. Attempting to connect...");
            // מבקש את כתובת הארנק ממטאמסק
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("MetaMask connected:", accounts[0]);
            document.getElementById('account').innerText = "Connected Account: " + accounts[0];
        } catch (error) {
            console.error("Error connecting MetaMask:", error);
            // טיפול בשגיאות נפוצות
            if (error.code === 4001) {
                alert("Connection request denied by the user.");
            } else if (error.code === -32002) {
                alert("A MetaMask connection request is already pending. Please check your MetaMask.");
            } else {
                alert("An unexpected error occurred. Check the console for details.");
            }
        }
    } else {
        console.error("MetaMask not detected.");
        alert("MetaMask is not installed. Please install it to connect.");
    }
}

// מאזין לכפתור
document.getElementById('connectMetaMask').addEventListener('click', connectMetaMask);
