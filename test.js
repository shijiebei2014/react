var urllib = require('urllib')

urllib.request('http://xxbs.sh.gov.cn:8080/weixinpage/HandlerOne.ashx', {
	type: 'GET',
	contentType: 'application/json',
	data: {
		"name": '700路'
	}
}, function(err, data, res) {
	if (err) {
		throw err; // you need to handle error 
	}
	console.log(res.statusCode);
	console.log(res.headers);
	// data is Buffer instance 
	console.log(data.toString());
})