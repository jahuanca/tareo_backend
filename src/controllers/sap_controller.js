
'use strict'
const models = require('../models')
var Client = require('node-rest-client').Client;


async function getNames(req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    var client = new Client(
    );
    var args = {

        headers: {
            'Authorization': 'Basic bnNvc2E6TmVzdG9yLjIwMjA=',
            'SOAPAction': 'application/soap+xml;charset=UTF-8;action="urn:sap-com:document:sap:soap:functions:mc-style:ZHCM_WS_ABSENTISMO:ZhcmWsAbsentismoRequest"',
            'Content-Type': 'text/xml;charset=UTF-8'
        },
        data: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soapenv:Header/><soapenv:Body><urn:ZhcmWsAbsentismo><IDesde>2021-05-01</IDesde><IHasta>2021-05-10</IHasta></urn:ZhcmWsAbsentismo></soapenv:Body></soapenv:Envelope>'
    };

    client.post("https://200.107.154.142:44300/sap/bc/srt/rfc/sap/zhcm_ws_absentismo/200/zhcm_ws_absentismo/zhcm_ws_absentismo_b", args, function (data, response) {
        // parsed response body as js object
        if(data){
            var d=data['soap-env:Envelope']['soap-env:Body']['n0:ZhcmWsAbsentismoResponse']['EtData']['item']
            console.log(d);
            return res.status(200).json(d);
        }
        return res.status(500).json({message: 'Error al realizar la peticion'});
    });
    
}


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getNames,
}