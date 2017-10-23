Set the following environmental variables
* CLOCKWORK_RECIPIENT = the number to send your alert
* CLOCKWORK_KEY = your Clockwork SMS API key


Pack with 
```sh
npm pack
```

Install globally with 

```sh
npm install -g "packed fild path"
```

Run Mocha tests and specify reporter 

```sh
mocha --reporter textreporter
```