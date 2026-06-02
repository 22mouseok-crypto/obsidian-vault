---
author: 小有趣日常
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzcwODIzMjI5Ng==&mid=2247483687&idx=1&sn=d220f5be42c41b7481854609a9f97143&chksm=f46f705e37cf1e62939ce4e9d94341ca5142db3d9de3a205b48862868cf774b624b3a02d1cf2&mpshare=1&scene=1&srcid=0527Y0lHG5lBzV76M8mQo4q9&sharer_shareinfo=94e954904468f38af08c5d3b82954129&sharer_shareinfo_first=73ced0fc81dad5ef78ab4dffb2d80a67#rd
saved: 2026-05-27 14:39:05
tags:
  - 笔记同步助手
id: e5a56100-37e6-4040-9796-5db02fff8753
---

公众号名称：小有趣日常

作者名称：小有趣日常

发布时间：2026-03-28 23:16

![[笔记同步助手/images/36bbee7005cb4832af140f70088aff7d_MD5.gif]]

🎉来啦来啦～跟着月大又✔️get新技能啦，这次真的是我的刚需啊～

---

# 📋前置准备

1.  安装Obsidian
    
2.  注册GitHub 账号
    
3.  注册Notion 账号
    
4.  注册Kollab 账号
    
5.  下载安装 Git（https://git-scm.com/download/win）
    

---

# 🛠️第1步 obsidian第三方插件安装

1.  打开Obsidian → 设置 → 第三方插件 → 关闭安全模式
    
2.  浏览 → 搜索 Git → 安装并启用
    

![[笔记同步助手/images/4d9a0d22f2f627532aa29340bde7336f_MD5.png]]

3.选项 → 进入第三方插件Git的设置页面

如图设置（仅供参考，按照自己的实际需求来设置配置）

![[笔记同步助手/images/264986701a1e9a0038e221cda4a17106_MD5.png]]

---

# 🛠️第2步 github同步仓库创建

1.  登录 GitHub → 点击右上角+号 → 新建仓库（New repository）
    
2.  填写仓库信息
    

Repository name：随意填自己想叫的仓库名字

Choose visibility：选 Private（私有，务必选）

后面三个选项默认即可，直接创建

![[笔记同步助手/images/29124c50e7a0cd13da09ab4eb6ef45c7_MD5.png]]

接着页面上会出现这个仓库的地址，复制仓库地址，格式：

https://github.com/你的用户名/你的仓库名.git

---

# 🛠️第3步本地初始化 Git

1.  打开你的Obsidian 笔记库文件夹（比如D:\\我的Obsidian笔记）
    
2.  文件夹空白处右键 → 选择 Open Git Bash here
    
3.  复制粘贴以下命令，一行一回车执行：
    

```
git init
git remote add origin 你复制的GitHub仓库地址
git pull origin main --allow-unrelated-history
git add .
git commit -m "first commit"
```

4.在git commit -m "first commit"这步之后，可能会需要设置下用户名和邮箱。（这里的名字和邮箱可以随便填，不需要和 GitHub 一致，只是 Git 需要一个标识而已）

```
git config --global user.email "你的邮箱"
git config --global user.name "你的用户名"
git commit -m "first commit"
git push -u origin main
```

5.弹出登录窗口时，输入 GitHub 账号密码 / 验证码即可

6.看到“branch 'main' set up to track 'origin/main'.”就是成功了。

7.接下来在obsidian仓库中新增、修改，就会按照自己设置的同步规则同步到github上了（如图右下角状态栏显示“git：pushed 2 files to remote”）

![[笔记同步助手/images/db900534d668d0a9f769d54315118b18_MD5.jpg]]

---

# 📌 后续使用指南

⌨️ 手动同步：

按 Ctrl+P 打开命令面板，输入 Git: commit and sync 执行同步，或者右上角点击 Git 的图标，点击 push / pull 按钮。

🔄 自动同步：

在Git插件设置页，通过设置 Auto backup interval 和 Auto pull interval 即可实现自动备份与拉取。

✅️ 验证同步：

访问你的 GitHub 仓库（https://github.com/你的用户名/仓库名称） ，刷新后可查看所有已同步的笔记文件

🔗 实现 Github 到其他端的同步：

本地笔记已和 GitHub 建立同步，剩下的就是通过 GitHub Actions 创建工作流来实现同步其他端（Notion、息流、飞书、微信公众号等）

![[笔记同步助手/images/d6dff0426f106ee6f743d5bcaf8ebe05_MD5.png]]

  

---

![[笔记同步助手/images/21870d8b7fd85fc22cf9817018543b38_MD5.jpg]]

新人冲100粉 | 有关必回

❤️感恩遇见 🤝携手共进

  

---

![[笔记同步助手/images/103b800abcaa6cb33cc272851103a30e_MD5.jpg|cover_image]]

Original 小有趣日常 小有趣日常

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/791ab04f_1779863944280?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzcwODIzMjI5Ng%3D%3D%26mid%3D2247483687%26idx%3D1%26sn%3Dd220f5be42c41b7481854609a9f97143%26chksm%3Df46f705e37cf1e62939ce4e9d94341ca5142db3d9de3a205b48862868cf774b624b3a02d1cf2%26mpshare%3D1%26scene%3D1%26srcid%3D0527Y0lHG5lBzV76M8mQo4q9%26sharer_shareinfo%3D94e954904468f38af08c5d3b82954129%26sharer_shareinfo_first%3D73ced0fc81dad5ef78ab4dffb2d80a67%23rd&s=obsidian)