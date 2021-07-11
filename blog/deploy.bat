
# 确保脚本抛出遇到的错误
#set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git branch -M main

# 手动删除docs/.vuepress/dist  下面 .git 文件再push

# 如果发布到 https://<USERNAME>.github.io  填写你刚刚创建的仓库地址
# git push -f git@github.com:kuishou68/kuishou68.github.io.git main
#git push -f git@lingxiu58.github.com:lingxiu58/lingxiu58.github.io.git main

git push -f git@github.com:lingxiu58/lingxiu58.github.io.git main

cd -
