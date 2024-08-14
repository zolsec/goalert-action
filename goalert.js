const axios = require('axios');

// maximum lengths as per GoAlert source code
// https://github.com/target/goalert/blob/b5c2039dfa6f1602a21cc780c0ab2a14571f3ede/alert/alert.go#L12
const MaxSummaryLength = 1024;     // 1KiB
const MaxDetailsLength = 6 * 1024; // 6KiB

function validateInputLength(input, maxLength, inputName) {
  if (input && input.length > maxLength) {
    throw new Error(`${inputName} exceeds maximum length of ${maxLength} characters.`);
  }
}

async function sendAlert({ baseUrl, token, summary, details, action, dedup }) {
  validateInputLength(summary, MaxSummaryLength, 'Summary');
  validateInputLength(details, MaxDetailsLength, 'Details');

  const url = `${baseUrl}/api/v2/generic/incoming?token=${token}`;

  const payload = {
    summary,
    details,
    action,
    dedup
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error sending alert: ${error}`);
    throw error;
  }
}

module.exports = sendAlert;
