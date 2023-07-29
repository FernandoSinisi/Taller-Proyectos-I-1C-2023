# PetQuest

## Bootstrapping the mobile app

- Clone this repository. Go to the root of the repository.

- Install `nvm` if you don't have it installed.

- Run the following commands in order to install the dependencies:

```bash
   nvm i
   nvm use
   npm i
   npm install -g json-server
   npm run prepare
```

- Install ngrok on your computer, create account in https://ngrok.com/ and then run once

```
ngrok authtoken <token> (the token is in: gettin started - your authtoken)
```

- Run json server for the database

```
npx json-server --host localhost --port 3001 ./db/db.json --watch
```

or

```
json-server --host localhost --port 3001 ./db/db.json --watch
```

- Run ngrok for connect expo with json-server.

```
ngrok http 3001
```

- Run the mobile app using:

```
USER_ID=1 npm start
```

- Either install Android emulator [following these steps](https://docs.expo.dev/workflow/android-studio-emulator/) in your OS or install Expo App and scan the `QR`.

- Enjoy ;)
