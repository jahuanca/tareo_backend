'use-strict'
const cron = require('node-cron');


cron.schedule('14 0 * * *', () => {
    console.log('This function is a event in background');
});