#Features

-   This is a MySQL module, adapted to be consumed by Geosolve.

-   Its use is to send the stored procedure through the MySQL package, to receive your most fluid data.

#Includes MySQL package
![](https://pngimg.com/uploads/mysql/mysql_PNG5.png)

#Install
Installation is done using the npm install command:

`$ npm install geosolve-db`

#Usage

```javascript
const database = require('geosolve-db'); //Our connection to the package

//Params of connection
const config = {
    host: 'MyHost', //Ejample -> localhost
    user: 'MyRoot', //Ejample -> root, admin, etc
    password: '', //Password from Database
    database: '', //Database connection
};

const connect = database.connect(config, 'Type of connection'); //Normal or Pool

connect
    .testConnection(config, 'Type of connection')
    .then(res => {
        console.log('SUCCESS CONNECTION'); //Result data correct, connection ok
    })
    .catch(err => {
        console.log('err: ', err); //Return error, const <err> details information about type error
    });

connect
    .querySP('call StoreProcedure (?,?)', ['Param1', 'Param2'])
    .then(({ data, sp }) => {
        console.log(data); //Here return the data from stored procedure
        console.log(sp); //Here return the information about the data
    })
    .catch(err => {
        console.log(err); //Here return information about an error
    });
```

##Type of Connection
When establishing a connection, you can set the following options:

-   Normal -> Support for simple connection
-   Pool -> This option supports multiple connections at the same time.

##Params
Here, there may or may not be any parameters.
