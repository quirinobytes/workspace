var request = require ('request');
var cheerio = require ('cheerio');
var fs = require ('fs');

request('http://www.imdb.com/chart/moviemeter', function (err, res, body) {
	if (err) console.log ('Erro: ' + err );

	var $ = cheerio.load(body);

	$('.lister-list tr').each( function() {
		var title = $(this).find('.titleColumn a').text().trim();
		var rating = $(this).find('.ratingColumn strong').text().trim();

		console.log( rating + ' Titulo: '+ title + '\t' + rating );
		fs.appendFile('thebestmovies.txt', title + ' ' + rating + '\n');

	});

});

