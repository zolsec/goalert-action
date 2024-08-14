const core = require('@actions/core');
const sendAlert = require('./goalert');

async function run() {
  try {
    const baseUrl = core.getInput('base_url');
    const token = core.getInput('token');
    const summary = core.getInput('summary');
    const details = core.getInput('details');
    const action = core.getInput('action');
    const dedup = core.getInput('dedup');

    const result = await sendAlert({ baseUrl, token, summary, details, action, dedup });
    console.log('Alert sent successfully:', result);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
