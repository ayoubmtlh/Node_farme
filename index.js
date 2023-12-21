/*const fs=require("fs");
const text=fs.readFileSync('./final/txt/read-this.txt','utf-8');
console.log(text);
const g= `this is what we know about avocado ${text}\n Created on ${Date.now()}`;

console.log(g)*/
const fs=require("fs")
const http=require("http")
const url=require("url")
const replacetemplate = (template,product)=>{
    output=template.replace(/{%PRODUCTS_NAME%}/g,product.productName)
    output=output.replace(/{%QUANTITY%}/g,product.quantity)
    output=output.replace(/{%PRICE%}/g,product.price)
    output=output.replace(/{%IMAGE%}/g,product.image)
    output=output.replace(/{%FROM%}/g,product.from)
    output=output.replace(/{%NUTRENTS%}/g,product.nutrients)
    output=output.replace(/{%DESCRIPTION%}/g,product.description)
    output=output.replace(/{%ID%}/g,product.id);
   
    if(!product.organic){ output=output.replace(/{%NOT_ORGANIC%}/g,"not-organic")}
    return output
   }
   
const datajson=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8")
const products=fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8")
const overview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8")
const dataobject=JSON.parse(datajson)

const server=http.createServer((req,res)=>{
    console.log(req.url)
    const { query, pathname }= url.parse(req.url,true)
    if( pathname==="/overview"){

        let tabobject = dataobject.map(el=> replacetemplate(tempCard,el)).join("")
        const output = overview.replace(/{%Products_Cards%}/g,tabobject)
        res.end(output)
    }
    
   else if(pathname==="/api"){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(data)
       // res.end(data)
    }
    else if(pathname==="/products"){
       // res.writeHead(200,{"Content-type": "text/html"})
        const product=dataobject[query.id]
        const output=replacetemplate(products,product)
        console.log(output)
        res.end(output)
    }

})
server.listen(8000,"localhost",()=>{
    console.log("listening to request on port 8000")
})
