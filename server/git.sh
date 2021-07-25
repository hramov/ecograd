#!/bin/bash
git add .
echo "Input the commit message"
read commit
git commit -m "$commit"
git push origin main