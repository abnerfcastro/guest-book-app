var amqp = require('amqplib/callback_api');

module.exports = new class RabbitMQService {
    send(data) {
        amqp.connect(process.env.RABBITMQ_URL, function (err, conn) {
            if (err) {
                console.log('Error on creating new connection with Rabbit MQ');
                return;
            }

            conn.createChannel(function (err, ch) {
                if (err) {
                    console.log('Error on creating new channel');
                    return;
                }
                var q = 'guestbook_app_queue';
                var msg = JSON.stringify(data);
                ch.assertQueue(q, { durable: false });
                ch.sendToQueue(q, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            });
            setTimeout(function () { conn.close(); }, 500);
        });
    }
}