const http = require('http');
const sql = require('mssql');
const static = require('node-static');
const file = new static.Server('./public');
let handlers = {};
const dbConfig = {
	server:'52.77.227.83',
	database:'scmdb',
	password:'password12$',
	user:'sa'
	// options: {
	// 	encrypt:true
	// }
};

function getSKU(searchkey) {
	var conn = new sql.ConnectionPool(dbConfig);
	var sqlrequest = new sql.Request(conn);

// accessing using the stored procedure
	conn.connect(dbConfig).then(function() {
		sqlrequest.input('txtsearch', sql.VarChar(100), searchkey);
		sqlrequest.execute('SearchSKU', (recordset, returnvalue) => {
			// console.dir(recordset);
			console.log(recordset);
			console.log(returnvalue);
		});
	});

// accessing the db using query
	// sql.connect(dbConfig, function (err) {
    //     if (err) console.log(err);
	// 	// query to the database and get the records
	// 	let sqlrequest = new sql.Request();
    //     sqlrequest.query('select * from dbo.wms_item_hdr where wms_itm_code like 20088413', function (err, recordset) {
    //         console.log(recordset);
    //     });
	// });
}

handlers["/"] = (req, res) => {
	file.serve(req, res);
	if (request.method == 'POST') {
		var body = '';
		request.on('data', function (data) {
			body += data;
			// Too much POST data, kill the connection!  Computation:  1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 1e6)
			request.connection.destroy();
		});
		request.on('end', function () {
			var post = qs.parse(body);
			// use post['blah'], etc.
		});
	}
}

getSKU('20088413');

http.createServer((req, res) => {
	if(handlers[req.url]) {
		handlers[req.url](req, res)
	}
	else {
		res.writeHead(404, { "Content-Type" : "text/plain" });
		res.end("Error 404: URL not found");
	}
}).listen(8080, console.log("tumatakbong server.."));
