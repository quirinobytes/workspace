var crawlerjs = require('crawler-js');
var fs = require ('fs');
var crawler = {
        interval: 1000,
        getSample: 'http://science.gsfc.nasa.gov/sed/index.cfm?fuseAction=people.staffList&navOrgCode=600&nav_about_us&PageNum=1',
        get:'http://science.gsfc.nasa.gov/sed/index.cfm?fuseAction=people.staffList&navOrgCode=600&nav_about_us&PageNum=[numbers:1:30:1]',
        preview: 0,
        extractors: [
                {
                //selector: '#border-spacing tr',
                selector: '#border-spacing tr',
		callback: function(err, html, url, response){
			//console.log('Crawled url:');
		        //console.log(url);

			data = {};
			data.nome = html.children('td').eq(0).text();
			data.filial = html.children('td').eq(3).text();
			data.telefone = html.children('td').eq(4).text();
		//console.log (data);
		fs.appendFile('nasa-employes.txt','Nome: ' + data.nome + '\t Fone: ' + data.telefone + '\nCargo: ' + data.filial + '\n');
		},
 		//mongoCollection: 'nasa',
		//csv: {name:'funcionarios-nasa.csv'}
                }
        ]

}

var config = {
        mongoDB: 'TDC',
        mongoDBHost: 'localhost',
        mongoDBPort: '27017'
}

crawlerjs(crawler,config);

