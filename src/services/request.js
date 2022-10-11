const request = require('request')

async function get(url, headers) {
  return new Promise((resolve, reject) => {
    request.get(url, {
      json: true,
      headers: headers

    }, (error, response, body) => {
      if (error) return reject(error)
      return resolve({body: body, response: response })
    })
  })
}

function returnOnlyHours(value){
    var d = new Date(value);
    var hours= d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    var minutes= d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    var seconds= d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}

function returnFormatDate(value){
  var d = new Date(value);
  var day= d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  var month= d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
  var year= d.getFullYear() < 10 ? `0${d.getFullYear()}` : d.getFullYear();

  //return `10.10.2022`;
  return `${day}.${month}.${year}`;
}

/*async function post (url, data, headers) {
  return new Promise((resolve, reject) => {
    request({ url, method: 'POST', data },{
      headers: headers
    }, (error, response, body) => {
      if (error) return reject(error)

      return resolve({ body, response })
    })
  })
}*/

async function post(url, form, headers) {

  return new Promise((resolve, reject) => {
    request.post({
      url,
      body:JSON.stringify(form),
      headers: headers
    }, (error, response, b) => {
      if (error) return reject(error)

      return resolve({body: b, response: response })
    })
  })
}

module.exports = {
  get,
  post,
  returnOnlyHours,
  returnFormatDate,
}