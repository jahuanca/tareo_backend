const multer = require("multer");
const jimp = require("jimp");
const crypto = require("crypto");

const sharp=require('sharp');

//const uuid = require("uuid");

const handlersImages = {
  upload: function (){
    
    const options = {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, next) => {
        const isPhoto = file.mimetype.startsWith("image/");

        if (isPhoto) {
          return next(null, true);
        }

        const error = new Error("El archivo no es una imagen");
        next(error, false);
        }
    };
    return multer(options).single("file");
  },

  uploadMany: (cantidad)=>{
    
    const options = {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, next) => {
        const isPhoto = file.mimetype.startsWith("image/");

        if (isPhoto) {
          return next(null, true);
        }

        const error = new Error("El archivo no es una imagen.");
        next(error, false);
        }
    };
    return multer(options).array("files",cantidad);
  },

  save: (ruta)=>{
    return async (req, res, next) => {
        
        if (!req.file) return next();
        const cadena=crypto
                    .createHash('RSA-SHA256')
                    .update(req.file.originalname)
                    .digest('hex');
        
        const name = `u_${cadena.substring(0,10)}_${new Date().valueOf().toString()}.${req.file.mimetype.split("/")[1]}`;

        req.file.filename=name;

        const photo = await jimp.read(req.file.buffer);
        //await photo.resize(300, jimp.AUTO);
        if(req.file.size>1048576){
            let calidad=100 - Math.trunc((req.file.size-1048576) % 17476);
            await photo.quality(calidad);
        }
        await photo.write(`./public/uploads/${ruta}/${req.file.filename}`);
        
        next();
    }
  },

  saveMany: (ruta)=>{
    return async (req, res, next) => {
        
        if (!req.files) return next();
        await req.files.forEach(async (e, i) => {
          console.log(e)
          const cadena=crypto
                      .createHash('RSA-SHA256')
                      .update(e.originalname)
                      .digest('hex');
          
          //const name = `sum2020_${cadena.substring(0,10)}_${new Date().valueOf().toString()}.${e.mimetype.split("/")[1]}`;
          const name = `sum2020_${cadena.substring(0,10)}_${new Date().valueOf().toString()}.webp`;
  
          req.files[i].filename=name;
  
          //const photo = await jimp.read(e.buffer);
          let calidad=90;
          //await photo.resize(300, jimp.AUTO);
          if(e.size>1048576){
            calidad=calidad - Math.trunc((e.size-1048576) % 17476);
            //await photo.quality(calidad);
          }
          await sharp(e.buffer)
            //.resize(640, 320)
            .toFormat("webp")
            //.webp({ quality: calidad })
            .webp()
            .toFile(`./public/uploads/${ruta}/${e.filename}`);
          
          //await photo.write(`./public/uploads/${ruta}/${e.filename}`);
        });
        
        next();
    }
  }
};

module.exports = handlersImages;