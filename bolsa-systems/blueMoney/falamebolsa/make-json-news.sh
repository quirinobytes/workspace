PATH_URLLIST=/root/workspace/bolsa-systems/blueMoney/falamebolsa

while read line; do
  node $PATH_URLLIST/topnews.js $line
done < $PATH_URLLIST/url-db.list
