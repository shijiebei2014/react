"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// rabbit mq 的代理工具
var rabbitmq_config_1 = require("../../rabbitmq_config");
var assign = require("object-assign");
var urllib = require("urllib");
var api_url = ['http://', rabbitmq_config_1.default.rbmq.api_host, ':', rabbitmq_config_1.default.rbmq.api_port, '/api/'].join('');
var vhost = encodeURIComponent(rabbitmq_config_1.default.rbmq.vhost);
var user = rabbitmq_config_1.default.rbmq.user;
var password = rabbitmq_config_1.default.rbmq.password;
var request = function (url, opts, callback) {
    var options = {};
    assign(options, {});
    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }
    for (var key in opts) {
        if (key !== 'headers') {
            options[key] = opts[key];
        }
        else {
            if (opts.headers) {
                options["headers"] = options["headers"] || {};
                assign(options["headers"], opts.headers);
            }
        }
    }
    options["timeout"] = 10000;
    // console.log(options);
    urllib.request(url, options, callback);
};
var make_msg = function (exchange, routing_key, msg) {
    var msg1 = {
        "vhost": "/",
        "name": exchange,
        "properties": {
            "delivery_mode": 2,
            "headers": { "agent": "zhisiyun" },
            "content_type": "application/json",
            "content_encoding": "utf-8"
        },
        "routing_key": routing_key,
        "delivery_mode": "2",
        "payload": (typeof msg === 'object') ? JSON.stringify(msg) : msg,
        "headers": {},
        "props": {},
        "payload_encoding": "string"
    };
    return msg1;
};
function publish(exchange, routing_key, msg, cb) {
    if (!exchange) {
        return cb(Error('no exchange'), null);
    }
    if (!routing_key) {
        return cb(Error('no routing_key'), null);
    }
    if (!msg) {
        return cb(Error('no message'), null);
    }
    var req_url = [api_url, 'exchanges/', vhost, '/', exchange, '/publish'].join('');
    console.log(vhost);
    console.log(req_url);
    var req_opt = {
        auth: [user, password].join(':'),
        contentType: 'json',
        dataType: 'json',
        method: 'POST',
        data: make_msg(exchange, routing_key, msg)
    };
    request(req_url, req_opt, cb);
}
exports.publish = publish;
;
var connstr = ['amqp://', rabbitmq_config_1.default.rbmq.user, ':', rabbitmq_config_1.default.rbmq.password, '@', rabbitmq_config_1.default.rbmq.host, ':', rabbitmq_config_1.default.rbmq.port, '/', vhost].join('');
exports.connstr = connstr;
