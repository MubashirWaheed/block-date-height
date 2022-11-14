const fetch = require("node-fetch");

const handler = async function (event, context) {
  const seconds = event.queryStringParameters.seconds;
  console.log("seconds: ", typeof seconds);
  const targetUrl = `https://blockchain.info/blocks/${seconds}000?format=json`;
  // const targetUrl = `https://blockchain.info/blocks/1668153022000?format=json`;
  try {
    // 'https://icanhazdadjoke.com'
    const response = await fetch(targetUrl, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      // body: JSON.stringify({ msg: data.joke }),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
