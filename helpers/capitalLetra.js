


const firstLater=(text)=>{
    text=text.trim().replace(/^\w/, (c) => c.toUpperCase());
    return  text;
}

module.exports={
    firstLater
}