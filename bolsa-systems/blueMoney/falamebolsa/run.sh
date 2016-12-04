while read p; do
  node top.js $p
done < b.list
