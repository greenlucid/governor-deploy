## Governor Deploy

- `nvm install 14`

- `yarn install`

go to `scripts/deploy.ts` and change the variables. in particular, you need to change the arbitrator, extraData, and the baseDeposit

`cp .env.example .env`

write the required variables on the env. you'll prob need to change the verification part.

- `yarn deploy`

