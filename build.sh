cd ./src/client
npm run build
cd ../../

git add .
echo 'Input the commit message'
read message
git commit -m "$message"