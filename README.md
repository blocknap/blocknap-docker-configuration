
# BlockNap Docker Configuration

 1.Clone or download this repository.
    
 2.Open a terminal a go to the folder "config", inside the repository "BlockNap Docker Configuration"

 3.Inside on folder "config" execute the command "npm install" to install all dependecies of nodejs files.

 4.Go back to the upper folder and execute the command "docker-compose up cockroach", to startup the data base.

 5.With a database tool as [Dbeaver](https://dbeaver.io/ "Dbeaver") connect to the database (cockroach) to create the tables that BlockNap will use.

6.The data to connect the database if you execute the docker-compose in your laptop:
    - host:localhost
    - port: 26257
    - database: postgres
    - user:root

7. When you are connect the database you must execute the sql that you can find in the file create_tables.sql. After that you must have three tables in the database: 
    - listen_address
    - oracle_address
    - listen_address

8. Shutdown the database with Control + C in the console where is running the database.

9. Go to the folder "config" and edit the file "blocknap_manager_server.json"

10.Replace the address wallet, the private key and project id of infura with the real values and seve the file.

```json
 {
  "account": "ADDRESS_WALLET",
  "port": 8887,
  "private": "PRIVATE_KEY_WALLET",
  "smart_contracts": [
    {
      "name":"BlockNap",
      "sol":"BlockNap.sol",
      "js":"BlockNap.js",
      "listener":"logTest",
      "oracle":"httpWeather"
    }
  ],
  "provider_config": "https://ropsten.infura.io/v3/PROJECT_ID_INFURA",
  "provider_web3":"https://ropsten.infura.io/v3/PROJECT_ID_INFURA",
  "provider":"json_rpc",
  "network":"ropsten",
  "gas": "0x3D0900",
  "gasPrice": "0xEE6B2800",
  "path_smart_contracts": "/app/blocknap_config/SmartContract/",
  "path_js": "/app/blocknap_config/SmartContract/",
  "db": "postgresql://root@localhost:26257/postgres?sslmode=disable",
  "oracle_manager":"http://localhost:8888/oracle/v1/add/",
  "oracle_enable":true,
  "listen_manager":"http://localhost:8889/listen/v1/add/",
  "listen_enable":true
}
```

11. Edit the file "blocknap_oracle_server.json"


12.Replace the address wallet, the private key and project id of infura with the real values and save the file.

```json
	{
	  "account": "ADDRESS_WALLET",
	  "port": 8888,
	  "private": "PRIVATE_KEY_WALLET",
	  "oracleFile": [
		{
		  "name": "httpWeather",
		  "file": "httpWeather.js",
		  "cron": "*/50 * * * *",
		  "api": "https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22",
		  "temp":200
		}
	  ],
	  "provider_config": "https://ropsten.infura.io/v3/PROJECT_ID_INFURA",
	  "provider":"json_rpc",
	  "network":"ropsten",
	  "gas": 21000,
	  "gasPrice": 1000000000,
	  "path_oracles":"/app/blocknap_config/SmartContract/",
	  "db": "postgresql://root@localhost:26257/postgres?sslmode=disable"
	}
```

13. Edit the file "blocknap_listener_server.json"


14.Replace the address wallet, the private key and project id of infura with the real values and save the file.

```json
{
  "account": "ADDRESS_WALLET",
  "port": 8889,
  "private": "PRIVATE_KEY_WALLET",
  "listenFiles": [
    {
      "name": "logTest",
      "file": "logTest.js"
    }
  ],

  "provider_config": "https://ropsten.infura.io/v3/PROJECT_ID_INFURA",
  "provider":"json_rpc",
  "network":"ropsten",  
  "wss":"wss://ropsten.infura.io/ws/v3/PROJECT_ID_INFURA",
  "gas": "0x1e8480",
  "gasPrice": "0x15",
  "path_listen": "/app/blocknap_config/SmartContract/",
  "db": "postgresql://root@localhost:26257/postgres?sslmode=disable"
}
```
15. Go back to the upper folder and execute the command "docker-compose up", to startup blocknap. You will the in the console that four services are running. Example of log:

```console

```

16. To test BlockNap you can execute this command in curl or import the the file "curso_blocknap.postman_collection.json" the [Postman](https://www.getpostman.com/ "Postman") software, and execute the resquest "create smart contract" inside the collection "curso_blocknap".  

```
curl -X POST \
  http://localhost:8887/manager/v1/insert/BlockNap \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: c9b9e475-fe64-4192-8293-39ac800903eb' \
  -H 'cache-control: no-cache' \
  -d '{
   "date":"my date",
    "issuer":"issuer",
    "receiver":"receiver",
    "subject":"subject"
}'
```

The result of the execution is the BlockNap Manager Server will create a smart contract in Ethereum, create and Oracle that call a service and a listener is create to listen all the events inside the smart contract. A example of log:

```console
ccc

```
