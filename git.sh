git add .
echo 'Input the commit message'
read message
git commit -m "$message"
git push origin main -f
echo 'Successfully pushed to main' 
