function dividir(callback, divisor){
    callback()
    console.log(`Divisor es: ${divisor}`)    
}

dividir(()=>{
    console.log("Es es un callback funcion flecha")
},0)