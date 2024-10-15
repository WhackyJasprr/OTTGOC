clear
file=index.js
echo $file
pub=/public
if [ "$file" != "" ]; then
    node $file
else
    echo "no file"
fi
if [ "$pub" == "" ]; then
    echo "no public folder"
fi