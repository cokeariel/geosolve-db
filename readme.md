# Control "Store Procedure"

This package seeks to resolve problem when you call "store procedure" in original package mysql, in this package always return array of two elements, the results and "store procedure" info. geosolve-db always return the results of "store procedure".
  

### Extension of mysql package
This package is an extension of mysql original package

![](https://pngimg.com/uploads/mysql/mysql_PNG5.png)

  

## Install
You can install this package using npm

`$ npm install geosolve-db --save`

## How to use

  

```javascript

/* remember that this package have all properties mysql original package */
const  mysql  =  require('geosolve-db');
/* 
	You must encapsulate connection in patchFeature function for connection have the new method querySP		  
*/

/* example with pool connection */ 
const  pool  =  mysql.patchFeatures(mysql.createPool({
connectionLimit :  10,
host :  'host',
user :  'root',
password :  'password',
database :  'database'
}));

/*
	Now, if you wannt , you can export pool variable for import it in 	other files and use query function querySP
	
	CommonJS -> module.exports = pool
	Es6 Modules -> export default pool
*/ 

/* 
	but, if you need use it in this file 
	¡IMPORTANT! function querySP return a promise
*/

pool.querySP('call sp_test(?)', ['hola'])
	.then(data  =>  console.log('DATA => ', data))
	.catch(err  =>  console.log(err))


```

  