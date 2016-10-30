var request = require ('request');
var cheerio = require ('cheerio');
var fs = require ('fs');

request('http://science.gsfc.nasa.gov/sed/index.cfm?fuseAction=people.staffList&navOrgCode=600', function (err, res, body) {
	if (err) console.log ('Erro: ' + err );

	var $ = cheerio.load(body);

	$('#border-spacing tr').each( function() {
		var nome = $(this).find('.centerRadio a').text().trim();
		var fone = $(this).children('td').eq(4).text().trim();
		var cargo = $(this).children('td').eq(3).text().trim();

		console.log( ' Nome:\t '+ nome + ' Fone:\t ' + fone + '\n' + ' Cargo:\t ' + cargo + '\n' );
		fs.appendFile('nasa-employerlist.txt', ' Nome:\t '+ nome + ' Fone:\t ' + fone + '\n' + ' Cargo:\t ' + cargo + '\n');
	});

});

