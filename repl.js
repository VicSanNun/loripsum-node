'use strict'; 

const http = require('http');
const fs = require('fs');

const fileName = process.argv[2];
const quantityOfParagraphs = process.argv[3];
const fileType = process.argv[4];

const howUse = 'Modo de Usar: \nnode repl.js {nome do arquivo} {quantidade de parágrafos} {extensão do arquivo(txt ou html)}';

if(!fileName || !quantityOfParagraphs){
	return console.log(howUse);
}
else{
	http.get(`http://loripsum.net/api/${quantityOfParagraphs}`, (res)=>{
		let text = '';

		res.on('data', (chunk)=>{
			text+=chunk;
		});
		res.on('end', ()=>{
			fs.writeFile(`${fileName}.${fileType}`, text, ()=>{
				console.log('Arquivo Pronto');
			})
		});
	}).on('error', (e)=>{
		console.log(e.message);
	});
}

