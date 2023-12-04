
const { formatInTimeZone } = require('date-fns-tz')

const getDateWithZone = (date) => {

    return formatInTimeZone(
        new Date(date), 'America/Lima', 'yyyy-MM-dd HH:mm:ss zzz'
    )

}

const get=(promise)=>{
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
}

module.exports= {
    getDateWithZone,
    get
}