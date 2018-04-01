import * as amqp from 'amqplib/callback_api'
import { connstr } from '../utils/rabbitmq'
import * as _ from 'underscore'

console.log(amqp)
amqp.connect(connstr, function(err, conn) {
    if (err) {
        console.log(err)
        return 
    }
    //创建消息通道
    conn.createChannel(function(err, ch) {
        //固定值,表示交换器,用于映射队列
        var exchange = 'upset_line'
        //需要在服务器配置
        var routing_key = 'upset.line.binding'
        var queue_name = 'upset.line'

        //信道
        ch.prefetch(5);
        ch.assertExchange(exchange, 'topic', {
            durable: true
        });

        //绑定队列
        ch.bindQueue(queue_name, exchange, routing_key);

        //消费监听
        ch.consume(queue_name, function(msg) {
            var cond;
            try {
                cond = JSON.parse(msg.content.toString());
            } catch (e) {
                cond = msg.content.toString();
            };

            console.dir(cond)
            ch.ack(msg);
        }, {
            noAck: false
        });
    });
});
