'use strict'
const models=require('../models')
const rutas = require('../services/rutas')
const request=require('./../services/request')

async function getSincronizacions(req,res){
  let [err,sincronizacions]=await get(models.Sincronizacion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(sincronizacions==null) return res.status(404).json({message: `Sincronizacions nulos`})
  res.status(200).json(sincronizacions)
}

async function sincronizarPersonal(req,res){

  try {

    let headersODATA = {
      'Authorization': 'Basic SU5URVJGQVpfSENNOkluaWNpbzAx',
    }

    let resultODATA = await request.get(rutas.rutaODATAPERSONAL , headersODATA)
    if (resultODATA.response.statusCode >= 200 && resultODATA.response.statusCode <= 299) {


      await get(models.Temp_Personal.destroy(
        {
          truncate: true
        }
      ));

      let data=resultODATA.body;
      let xmlParser = require('xml2js').parseString;
      

      xmlParser(data, {trim: true, strict: true, explicitArray: false} ,function (err, result) {
        res.status(200).json(result.feed.entry);  
      });
      /* let arreglo=[];

      let [err, encuestas] = await get(models.sequelize.query('EXEC SetImportPersonalSyncSap :data' ,
       {replacements: { data: JSON.stringify(data)} , type: models.Sequelize.QueryTypes.BULKUPDATE }))
      if (err) return res.status(500).json({ message: `${err}` })
      if (encuestas == null) return res.status(404).json({ message: `Encuestas nulos` }) */

      
      /* res.status(200).json(obj); */
      
    }
  }catch(error){
    console.log('Error try: ' + error);
    res.status(500).json(error);
  }

  /*  */


}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getSincronizacions,
  sincronizarPersonal,
}