"use strict";
exports.__esModule = true;
var cfg_data = {
    development: {
        rbmq: {
            host: 'localhost',
            port: 5672,
            api_host: 'localhost',
            api_port: 15672,
            user: 'xqq',
            password: '123456',
            vhost: '/xqq-dev'
        }
    },
    production: {
        rbmq: {
            host: '10.168.189.221',
            port: 5672,
            api_host: '10.168.189.221',
            api_port: 15672,
            user: 'gisi_prd',
            password: 'gisi2016',
            vhost: '/zhisiyun-prd'
        }
    }
};
var env = process.env.NODE_ENV || 'development';
exports["default"] = cfg_data[env];
/**
 * To have launchd start rabbitmq now and restart at login:
 * brew services start rabbitmq
 * Or, if you don't want/need a background service you can just run:
 * rabbitmq-server
 */
/**
 * The RabbitMQ server scripts are installed into /usr/local/sbin. This is not automatically added to your path, so you may wish to add
 * PATH=$PATH:/usr/local/sbin to your .bash_profile or .profile. The server can then be started with rabbitmq-server.
 * http://jingyan.baidu.com/article/d2b1d1029c1ea65c7e37d4c9.html
 * http://localhost:15672/
 */
