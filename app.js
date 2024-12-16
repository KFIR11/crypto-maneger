async function connectMetaMask() {
  const walletInfo = document.getElementById('walletInfo');

  // בדוק אם MetaMask מותקן
  if (typeof window.ethereum === 'undefined') {
    walletInfo.textContent = "MetaMask is not installed. Please install MetaMask and try again.";
    console.error("MetaMask is not detected in the browser.");
    return;
  }

  try {
    // בקשת הרשאות לארנק
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // הצגת כתובת הארנק הראשון
    const account = accounts[0];
    walletInfo.textContent = `Connected wallet: ${account}`;
    console.log(`Connected to MetaMask wallet: ${account}`);
  } catch (error) {
    // טיפול בשגיאות ספציפיות
    console.error("Error connecting to MetaMask:", error);

    if (error.code === 4001) {
      walletInfo.textContent = "Connection to MetaMask was rejected.";
    } else {
      walletInfo.textContent = "Failed to connect to MetaMask. Check the console for more details.";
    }
  }
}
