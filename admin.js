const {kafka} = require("./client");

async function init() {
    const admin = kafka.admin();
    console.log("Admin Connecting..");
    await admin.connect();
    console.log("Admin Connected..");

    console.log("Creating Topics.. Rider Updates");
    await admin.createTopics({
        topics: [{
            topic: "rider-updates",
            numPartitions: 2
        }]
    })
    console.log("Topics Created.. Rider Updates");

    console.log("Disconnecting.. Admin");
    await admin.disconnect()
}

init();