const piPriceEl = document.getElementById('pi-price');
const form = document.getElementById('transfer-form');
const messageEl = document.getElementById('message');

// Replace this API URL with a real Pi price API if you find one
const piPriceAPI = 'https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd';

// Fetch current Pi price and update UI
async function fetchPiPrice() {
  try {
    const res = await fetch(piPriceAPI);
    const data = await res.json();
    if (data['pi-network'] && data['pi-network'].usd) {
      piPriceEl.textContent = `$${data['pi-network'].usd.toFixed(4)}`;
    } else {
      piPriceEl.textContent = 'Not available';
    }
  } catch (err) {
    piPriceEl.textContent = 'Error fetching price';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageEl.textContent = '';

  const formData = new FormData(form);
  
  try {
    const response = await fetch('/api/submit-transfer', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      messageEl.style.color = 'green';
      messageEl.textContent = 'Transfer submitted! Awaiting approval.';
      form.reset();
    } else {
      const err = await response.text();
      messageEl.style.color = 'red';
      messageEl.textContent = `Error: ${err}`;
    }
  } catch (error) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Submission failed. Try again later.';
  }
});

fetchPiPrice();
