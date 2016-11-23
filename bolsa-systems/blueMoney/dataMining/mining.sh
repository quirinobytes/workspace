#!/bin/bash

N=/usr/bin/node


cd /root/workspace/bolsa-systems/blueMoney/dataMining/acoes/anglo-american/
$N anglo-american.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/acoes/cliff_natural_resources/
$N cliff_natural_resources.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/acoes/csna3/
$N csna3.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/acoes/rio_tinto/
$N rio_tinto.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/bolsas/dji/
$N dji.js 

cd /root/workspace/bolsa-systems/blueMoney/dataMining/bolsas/ibovespa/
$N ibovespa.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/bolsas/sp500/
$N sp500.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/commodities/aluminum_futures/
$N aluminum.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/commodities/coal/
$N coal.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/commodities/copper/
$N copper_UK.js
$N copper_US.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/commodities/iron/
$N fe62.js
$N finance.sina.com.cn.js
$N ore-pellets.js 

cd /root/workspace/bolsa-systems/blueMoney/dataMining/commodities/manganese/
$N manganese.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/commodities/nickel/
$N nickel.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/economics/brasil/
$N brasil-government-bold-yeld.js
$N brasil-pib-growth.js
$N fgv-consumer-confidence.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/economics/china/
$N business_confidence.js
$N car_index.js
$N gdp-growth.js
$N housing_index.js
$N industrial-production.js
$N loan-to-private.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/economics/india/
$N gdp-growth.js

cd /root/workspace/bolsa-systems/blueMoney/dataMining/economics/usa/
$N gdp-growth.js


cd /root/workspace/bolsa-systems/blueMoney/csv/all
paste * -d, > ../consolidado.csv

DATA=`date "+%H_%Mh-%d-%h-%Y"`
mv /root/workspace/bolsa-systems/blueMoney/csv/consolidado.csv /var/www/webserver/arquivos/coleta-$DATA.csv
