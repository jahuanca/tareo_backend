'use strict'

const config = require("../config");

const RUTA_SBS='http://serviciosweb.sbs.gob.pe/api/tipocambio/';
const RUTA_ODATA=`https://ecs-hanaqas.agrovision.com:44300/sap/xi/zhcm_int_gmo/webhcm?sap-client=${config.mantenedorNow} HTTP/1.1`;
const RUTA_GETTOKEN=`https://ecs-hanaqas.agrovision.com:44300/sap/xi/zhcm_int_gmo/webhcm?sap-client=${config.mantenedorNow} HTTP/1.1`;


module.exports ={
    getToken: RUTA_GETTOKEN,
    rutaSBS: RUTA_SBS,
    rutaODATA: RUTA_ODATA,
}