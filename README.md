# GoAlert GitHub Action

`goalert-action` is a GitHub Action that sends alerts to the [GoAlert](https://goalert.me) API.

## Usage

Use of the action is easy, see examples below.

### Multiline Alert

Sending an alert with details containing newlines.

```yaml
- name: Send Alert to GoAlert
uses: zolsec/goalert-action@master
with:
  base_url: 'https://goalert.instance'
  token: ${{ secrets.GOALERT_INTEGRATION_TOKEN }}
  summary: 'Alert Summary'
  details: |
    Multiline
    Alert
    Details
  action: 'close'
  dedup: 'alert-dedup'
```

### Alert with retry

Sending an alert reliably courtesy of [Wandalen/wretry.action](https://github.com/Wandalen/wretry.action), useful for simpler deployments of GoAlert which aren't highly available.

```yaml
- name: Send Alert to GoAlert
  uses: Wandalen/wretry.action@master
  with:
    action: zolsec/goalert-action@master
    attempt_limit: 3
    attempt_delay: 10000
    with: |
      base_url: 'https://goalert.instance'
      token: ${{ secrets.GOALERT_INTEGRATION_TOKEN }}
      summary: 'Alert Summary'
      details: |
        Multiline
        Alert
        Details
      dedup: 'alert-dedup'
```