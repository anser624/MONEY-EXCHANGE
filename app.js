async function getExchangeRate() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const resultdiv = document.getElementById("result");
  
    if (!from || !to || isNaN(amount)) {
      alert("Please fill in all fields with valid values.");
      return;
    }
  
    const conversionRates = await exchangeRateApi(from);
    if (!conversionRates) {
      alert("Failed to fetch exchange rates. Please try again later.");
      return;
    }
  
    const exchangeRate = conversionRates[to];
    if (!exchangeRate) {
      alert("Invalid target currency. Please check your input.");
      return;
    }
  
    const total = (amount * exchangeRate).toFixed(2);
  
    resultdiv.innerHTML = `
      <p>Amount = ${amount}</p>
      <p>From = ${from}</p>
      <p>To = ${to}</p>
      <p>Total = ${total}</p>
      <p>Exchange Rate (1 ${from} = ${exchangeRate.toFixed(2)} ${to})</p>
    `;
  }
  
  async function exchangeRateApi(from) {
    try {
      const apiKey = "00e68ddf56a9f3f75dc8d45f"; // Replace with your API key
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.result === "success") {
        return data.conversion_rates;
      } else {
        throw new Error(`API Error: ${data["error-type"]}`);
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error.message);
      return null;
    }
  }