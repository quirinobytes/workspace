#!/bin/bash

N=/usr/bin/node


cd acoes/anglo-american/
$N anglo-american.js
cd -

cd acoes/cliff_natural_resources/
$N cliff_natural_resources.js
cd -

cd acoes/csna3/
$N csna3.js
cd -

cd acoes/rio_tinto/
$N rio_tinto.js
cd -



cd bolsas/dji/
$N dji.js 
cd -



cd bolsas/ibovespa/
$N ibovespa.js
cd -



cd bolsas/sp500/
$N sp500.js
cd -



cd commodities/aluminum_futures/
$N aluminum.js
cd -



cd commodities/coal/
$N coal.js
cd -



cd commodities/copper/
$N copper_UK.js
$N copper_US.js
cd -


cd commodities/iron/
$N fe62.js
$N finance.sina.com.cn.js
$N ore-pellets.js 
cd -



cd commodities/manganese/
$N manganese.js
cd -



cd commodities/nickel/
$N nickel.js
cd -



cd economics/brasil/
$N brasil-government-bold-yeld.js
$N brasil-pib-growth.js
$N fgv-consumer-confidence.js
cd -



cd economics/china/
$N business_confidence.js
$N car_index.js
$N gdp-growth.js
$N housing_index.js
$N industrial-production.js
$N loan-to-private.js
cd -



cd economics/india/
$N gdp-growth.js
cd -



cd economics/usa/
$N gdp-growth.js
cd -


cd ../csv/all
paste * -d, > ../consolidado.csv

DATA=`date "+%d%m%Y"`
mv ../consolidado.csv /var/www/webserver/arquivos/coleta-$DATA.csv

cd ../..
