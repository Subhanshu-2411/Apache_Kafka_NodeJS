const {kafka} = require('./client');
const group = process.argv[2];

async function init() {
    const consumer = kafka.consumer({groupId: group});
    console.log("Connecting.. Consumer");
    await consumer.connect();
    console.log("Connected.. Consumer");

    await consumer.subscribe({
        topic: "rider-updates",
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async result => {
            console.log("Receiving Message..");
            console.log(`Group ID: ${group}`);
            console.log(`Message Type: ${result.message.key.toString()}`)
            console.log(`Rider Name: ${result.message.value}`);
            console.log(`Rider Location: ${result.message.value}`);
            console.log("Message Received..");
        }
    });
}

init();