A simple webapp that pulls statistics from Docker Hub every night.

## Tech stack

- Next.js for the webapp/api
- Vercel for hosting the app and the PostgreSQL database

## How to deploy

1. Fork this repository.
2. Go to Vercel and click on 'Add new project' and import the repository from Git
3. Enter the ENV variables listed in the table below

### Variables
| Variable | Description | Required (y/n) |
| -------- | ----------- | -------------- |
| APP_NAME | Your app name | Yes            |
| DOCKER_ENDPOINT | Docker Hub API endpoint, eg. `https://hub.docker.com/v2/repositories/dickwolff/export-to-ghostfolio` | Yes |
| CRON_SECRET | Enter a secret of your own, used to safely run the CRON job | Yes |
| TELEGRAM_BOT_TOKEN | Telegram Bot token, if you want nighly updates in Telegram | No |
| TELEGRAM_BOT_CHAT_ID | Telegram chat id, if you want nighly updates in Telegram | No |
