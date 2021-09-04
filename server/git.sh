git add .
echo "Enter the commit message"
read message
git commit -m "$message"
git push origin main
