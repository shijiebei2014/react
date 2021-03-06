import express = require('express');
import * as path from 'path'
import logger = require('morgan');
import bodyParser = require('body-parser');
//import cons = require('consolidate');
import ejs = require('ejs');

import {router} from './routes/index'
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); //ejs引擎
app.listen(app.get('port'), function() {
 	console.log('Express server listening on port ' + app.get('port'));
});

// 设置全局变量
app.locals.path_js_plugins = 'lib'
app.locals.path_js_page = 'pagejs'
/*path_js_page: path_js_page,
path_css_page: path_css_page,
path_css_plugins: path_css_plugins,*/

// 捕获可以让系统崩溃的错误，避免进程反复重启
process.on('uncaughtException', function(err) {
    err.name = "UncaughtExceptionError";
    console.log('Caught exception: ' + err);
});

router(app, null)