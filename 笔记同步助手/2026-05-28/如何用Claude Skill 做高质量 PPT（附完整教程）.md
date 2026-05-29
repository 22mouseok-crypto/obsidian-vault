---
author: 阿西
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzI1MjUxNzczNA==&mid=2247487250&idx=1&sn=eccff6cbb5d24cf5e3e7ed0b8544f6e9&chksm=e84f760a3b709105c3de49054fd9148f775905f1499e94b7781cadfc639d8337bec2eec7de2e&mpshare=1&scene=1&srcid=0528IzlHYYdWXSgxAEKUoUMW&sharer_shareinfo=d6eb8d6a65abe8ca4afa8341e3afdbbe&sharer_shareinfo_first=d6eb8d6a65abe8ca4afa8341e3afdbbe#rd
saved: 2026-05-28 21:32:54
tags:
  - 笔记同步助手
id: 164ec63a-5b4f-4e55-a362-9f2a54ec1fab
---

公众号名称：阿西-出海

作者名称：阿西

发布时间：2026-04-27 12:13

很多人问我上期爆了的那条视频里，那个 PPT 是怎么做的。

其实我是用 Anthropic 最近出的 Claude Design 做的，这个功能一发出来就在全网传疯了，一条推文就冲上了 6000 多万曝光。

![[笔记同步助手/images/d08a09d500b947eb5271f53eafa615f7_MD5.jpg]]

用它一句话就能做 PPT、网页、产品宣传动效。我自己用它做的笔记，直接获得了近千赞。

但这个功能目前只对会员开放，很多人根本用不了。所以我把它封装成了一个开源 Skill，想让更多人都能直接用上。

Github地址：https://github.com/bbostaice/axi-front-design-skill

通过本文我会带你手把手从 0 到 1 把这个Skill 装好，然后一起跑一个成品效果出来。

先给你看它做出来的效果。

## **案例 1：把文章转成PPT**

这是我用这个 Skill 做出来的 PPT。我把一篇文章丢给它，大概两三分钟的时间，它就设计好了 PPT， 整体质量还是蛮高的。做出来的质感，排版、配色、重点信息的处理，都有一种真的有设计师在做的感觉。

我一行代码都没有写，只是发给了他一句话，他就做完了，完全可以用来作为日常汇报、工作汇报，产品上台演讲时候用的 PPT。

![[笔记同步助手/images/2c403d8edc95782ca06baa4a839b2961_MD5.jpg]]

![[笔记同步助手/images/fb781d17abf23de6ba9a25f893dc3a6a_MD5.jpg]]

## **案例 2：产品文案转宣传动效**

不光能做 PPT ，它还能帮你做产品宣传动效

我把产品文案整段丢给它，它直接帮我把带产品出场、数据对比、镜头节奏的动效都做出来了，里面一些页面的切换、数据出场的效果，都让我挺惊喜的。

我设置了自动播放功能，还在里面加了加速按钮，如果你觉得播放慢的话，可以点击加速。

![[笔记同步助手/images/4cfd9ea4156f0d1d8d7b6977623d1ee5_MD5.jpg]]

![[笔记同步助手/images/884a9aab8a8475360981513bb17e2e1e_MD5.jpg]]

像这种有设计感的 PPT，还有宣传动效，以前是需要设计UI做好几天才能出的活。现在你不用写一行代码，靠跟AI对话就能做出来了。

而且我还设计了提问交互机制，在做的过程中，AI 不断地通过反问你来明确需求，让你把自己模糊的需求变得清晰。

就算你不会写提示词、不懂设计也没关系,它会一步步问你想做成什么样子，然后帮你梳理清楚自己的需求。

现在我们开始进入正式操作环节，教你如何拥有这个 Skill？

# 如何安装 skill

这里我用 Claude Code 来进行演示。

我们先在 GitHub 上找到我的这个 Skill ，叫axi-front-design-skill，然后把链接丢给 Claude Code，告诉它「帮我安装这个 Skill」，它会自动帮你装好。

装完之后，在 Claude Code 里输入 `/axi`，列表里能看到这个 skill，就说明装好了。

![[笔记同步助手/images/9312ca16366a2a03cfb4a9ad961e099b_MD5.jpg]]

## 实战 1：生成 PPT

接着我们来试一下怎么用这个 Skill 做 PPT。

我之前发过一篇《Claude Code 安装教程》的文章，我们来看看，能不能用这个 Skill 把这篇文章直接变成一份 PPT。

**操作步骤：**

我这里把文章的路径直接丢给它，跟他说：“把这篇文章做成 PPT”。这里你也可以直接把文章内容复制过去，丢给 Claude Code。

接着它会反过来问你几个问题：

-   风格偏哪种？
    
-   想要做什么尺寸？
    
-   要做几页？
    
-   甚至他还会问我需不需要附上演讲备忘稿
    

![[笔记同步助手/images/ba0d7107d0fb3fa53407869789994c7f_MD5.jpg]]

![[笔记同步助手/images/17abaa29e82153376a6bb42873f551fe_MD5.jpg]]

![[笔记同步助手/images/2f7abb3234401f6e8e3cceca8dd51fdb_MD5.jpg]]

然后它就会生成三套风格方案给你选。

![[笔记同步助手/images/c139d553e7d99ecc8c6753596fdca795_MD5.jpg]]

![[笔记同步助手/images/2e3d880478ceb7826aee7dcd0fda0f3e_MD5.jpg]]

选中其中一个版本以后，它就会开始给你做完整的 PPT。

这是最终生成的效果，它会自己去设计 PPT 里面的配图区域，然后每一页的层级也都设计得挺合理的，甚至能抓取我给的文章里面的原图素材，放到合适的位置

![[笔记同步助手/images/971df7f053670f9f543c502147dec9f5_MD5.jpg]]

![[笔记同步助手/images/20464f818c8fd2343a66934d84dd8eda_MD5.jpg]]

这件事我之前自己做的话，起码要一整天，现在只要几分钟。

## 实战 2：做一段产品宣传动效

接下来我们再试试用这个 Skill 做一个产品宣传动效。

我来试试它能不能帮我给 Claude 最新的模型 Opus 4.7 做一个产品宣传特效

**操作步骤：**

我先调用了这个 Skill，然后把 Claude 官网关于 Opus 4.7 的模型介绍都发给了它，接着跟它说：帮我给这个产品做一个宣传动效

接下来它会反过来问你几个问题

![[笔记同步助手/images/17cdc16ac0c9cd722661f9bc4b7099eb_MD5.jpg]]

大概跑一分多钟，它给你完整的宣传动效。

![[笔记同步助手/images/752ad6f003647a2988761cbd76aa2a5d_MD5.jpg]]

![[笔记同步助手/images/c1b17685f1b370ba62c4b52b5f98e46a_MD5.jpg]]

# 总结

到这里你已经学会了 怎么安装这个 skill，以及如何使用这个skill。

除了 PPT 、产品宣传动效之外，这个skill还能帮你做一个好看的 HTML 前端网站，安装之后也可以体验看看。

说实话，我之前每次做 PPT，大部分时间都花在找模板、调格式上面了。其实真正重要的是内容，但前面那堆设计的活，却要花我很多时间。

AI 时代最让我爽的一点，就是它给了普通人一种超能力，你不用会设计，只要你能说清楚你想要什么，它就能帮你做出来。

我希望通过这个skill可以让普通人把脑子里的想法，快速变成一个可传播的高质量内容，让更多人拥有这种内容创作的超能力。

好了，今天的分享就到这里，如果觉得有用的话，欢迎点赞关注。

我是阿西，我们下期见。

  

---

![[笔记同步助手/images/f7a392bad473e5aa18fc4fea664b9a42_MD5.jpg|cover_image]]

原创 阿西 阿西-出海

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/c620750a_1779975170559?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI1MjUxNzczNA%3D%3D%26mid%3D2247487250%26idx%3D1%26sn%3Deccff6cbb5d24cf5e3e7ed0b8544f6e9%26chksm%3De84f760a3b709105c3de49054fd9148f775905f1499e94b7781cadfc639d8337bec2eec7de2e%26mpshare%3D1%26scene%3D1%26srcid%3D0528IzlHYYdWXSgxAEKUoUMW%26sharer_shareinfo%3Dd6eb8d6a65abe8ca4afa8341e3afdbbe%26sharer_shareinfo_first%3Dd6eb8d6a65abe8ca4afa8341e3afdbbe%23rd&s=obsidian)