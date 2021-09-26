## 前言
##基本操作
**初始化本地仓库** 
```git
git init
```

**跟踪文件｜将改动放入暂存区**

**当前目录下的所有，不包括.gitignore中的文件或目录**
```text
git add . 
# 指定目录
git add dirPath
# 指定文件
git add filePath
# 指定多个文件
git add file1Path file2Path
```

**将改动从暂存区中移除**
```text
git restore filename
****
# 移除所有
git restore HEAD
```


**撤销工作区指定文件的修改**
```text
# 还原到最近的commit状态
git checkout filename
```

**将暂存区的内容提交到本地仓库**
```text
git commit -m "you can diy here content"
```

**查看commit日志,提交历史**
```text
git log
# 带图像的查看
git log --graph
```

**查看工作区当前状态**
```text
git status
```
**查看查看命令历史**
```text
git reflog
```

**查看指定文件的改动了哪些**
```text
git diff filename
# 查看工作区指定的文件与版本库中最新的代码有何区别
git diff HEAD -- filename
```

**回退到之前的commit**
+ tips：
    + HEAD表示当前版本
    + HEAD^表示前一版本
    + HEAD^^表示前两个版本，依次类推
```text
# 当前的修改不会丢弃
git reset HEAD^

# 丢弃当前的更改
git reset HEAD^ --hard
```

## 删除文件相关
**从本地仓库中取回被删除的文件**
```text
git checkout filename
# 命令本质的作用就是用最新的commit中的文件替换当前的文件 
```

**从本地仓库中删除指定的文件**
```text
git rm filename
# 删除后需要commit过后才生效
git commit -m "del: delete a filename"
# 在commit之前想要恢复的话
# 第一步，先把修改弄到暂存区
git restore --staged filename
# 第二部，撤销暂存区的修改
git restore filename
```

## 远程仓库相关
**创建本地的ssh key**
```text
ssh-keygen -t rsa -C "youremail@example.com"
```

**本地仓库关联远程仓库**
```text
git remote add remoteName address
# remoteName 可以自行定义，可以关联多个远程仓库
# 一般主要的remote 使用 origin命名
```

**插查看关联的远程仓库**
```text
# 只显示名称
git remote
# 显示远程仓库的地址
git remote -v
```

**删除关联的远程仓库**
```text
git remote remove remoteName
```
**重命名关联的远程仓库名称**
```text
git remote rename oldRemoteName newRemoteName
```

**将本地分支推向远程仓库**
```text
# 全写
git push remoteName localBranchName:remoteBranchName

# 简写(这种情况默认本地与远程分支名称一致)
git push remoteName branchName
```

**设置上游分支**
```text
git push -u remoteName branchName 
# 设置上游分支后
# 本地在push的时候就可以直接执行
git push
# 等价于
git push remoteName branchName
```

**克隆远程仓库到本地**
```text
git clone remoteAddress
```

**更新本地的分支列表**
```text
# 更新所有的远程仓库的
git fetch -all
# 更新指定远程仓库
git fetch remoteName
```
**拉取/合并远程的分支到本地**
```text
git pull remoteName branchName
```
## 分支相关
**创建分支**
```text
git branch newBranchName
```
**切换分支**
```text
git checkout otherBranchName
```

**创建并切换**
```text
git checkout -b newBranchName
```
**合并分支**
```text
# 快速合并
# 将otherBranch分支合并到当前的分支
# 快速合并看不出来做过改动
git merge otherBranch
# 合并其它分支，将变动都放入暂存区，不合并commit
git merge otherBranch --squash
# 禁用快速合并
git merge --no-ff -m "commit msg" otherBranch
# 舍弃合并，尝试恢复到你运行合并前的状态
git merge --abort
```

**合并其它分支的某个commit到当前分支**
```text
git cherry-pick commit_id
```
**变基**

> rebase操作可以把本地未push的分叉提交历史整理成直线
```text
git rebase branchName
```

**删除分支**
```text
git branch -d branchName
```

**switch**
> checkout 既可以切换分支又可以撤销修改，容易造成歧义，所以切换分支可以使用switch
```text
# 切换分支
git switch branchName
# 创建并切换
git switch -c newBranchName
```

## stash
> 将工作区未提交的内容先存储起来

**储存**
```text
# flagName 用于标示每次的stash操作
git stash save flagName
```

**查看贮藏的列表**
```text
git stash list
```

**恢复贮藏的内容**
```text
git stash pop stash_id
# or
git stash apply stash_id
# stash_id通过git stash list 获取
# 区别
# pop会在恢复后删除指定的stash
# apply不会删除
```

## 标签
> 给指定的commit打上一个标签，便于寻找关键的commit
```text
# 默认为最新的commit打上tag
git tag v0.0.0
git tag youlikeText

# 为指定的commit 打上tag
git tag youlikeText commit_id
# commit_id通过git log获取
```

**创建带有说明的标签**
```text
git tag -a tagName -m "description" comment_id
```

**查看指定tag的说明内容**
```text
git show tagName 
```

**查看所有标签**
```text
git tag
```

**将本地的tag提交到远程仓库**
```text
git push --tag
```

