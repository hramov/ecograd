#!/bin/bash
echo "Input the commit message"
read commit
git add .
git commit -m "$commit"
git push origin main
