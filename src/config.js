'use strict'

const ips= {
    qas: '100',
    dev: '200',
    prd: '300',
}

module.exports={
    port: process.env.PORT || 3002,
    db: process.env.SQLSERVER || '',
    SECRET_TOKEN: 'secretcobranzas2019',
    sizeSeeds: 0,
    sizeSupervisors:1,
    sizeGestores:1,
    mantenedorNow: ips.prd,
}
