const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

(async () => {
    await app.start();
    console.log('?? Bolt app started');
})();

app.message("hey", async ({ command, say }) => {
    try {
        say("Yaaay! that command works!");
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});

// Echo all messages the app can hear
app.message(async ({ message, say }) => {
    try {
        // Filter out message events with subtypes REF: https://api.slack.com/events/message
        if (message.subtype === undefined || message.subtype === 'bot_message') {
            console.log(JSON.stringify(message, null, 2));
            await say(message.text);
        }
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});
