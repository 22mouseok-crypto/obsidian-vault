---
author: Pixhero
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzkyODk3ODczMg==&mid=2247486357&idx=1&sn=59efcc5d4e4a623b61d97cfebae3468a&chksm=c32fd2bfba5dc20bde99a5b9f86acfae98fef6e71965691ad16f71b87ccc965973d9101651d1&mpshare=1&scene=1&srcid=0527FD6tWRxjaTenjSGitLyO&sharer_shareinfo=fcca0a7337d37be646991ce3fa701d87&sharer_shareinfo_first=fcca0a7337d37be646991ce3fa701d87#rd
saved: 2026-05-27 23:14:44
tags:
  - 笔记同步助手
id: 613cd715-81bb-4dae-a731-cfe8dc51e3c6
---

公众号名称：小红猪LRPG

作者名称：Pixhero

发布时间：2026-05-27 19:47

原文链接：[https://xcnmkjwxl4rv.feishu.cn/docx/A4pld0tkSogcdSxOAzjcYEyBnHh](https://xcnmkjwxl4rv.feishu.cn/docx/A4pld0tkSogcdSxOAzjcYEyBnHh)

> 如果你已经把 DeepSeek V4 Pro 接入了 Claude Code，但发现它遇到截图、页面图、报错图时还是“看不见”，这篇文章可以直接照着做。

这套方法的重点，不是让你手动改脚本、配 Hook、写一堆代码。

真正的流程很简单：

• 下载我准备好的完整提示词包

• 把提示词包喂给 DeepSeek V4 Pro

• 提供 ModelScope API Key

• 让 DeepSeek V4 Pro 自动完成 VLM-Bridge 接入

最后实现的效果是：DeepSeek V4 Pro 继续负责推理，图片和截图先由视觉模型分析成文字，再交给 DeepSeek V4 Pro 继续回答。

•••

## 这篇适合谁

• 已经在 Claude Code 里使用 DeepSeek V4 Pro 的用户

• 想让 Claude Code 能看截图、看页面、看报错图的用户

• 不想自己研究 Hook、脚本和多模态接入细节的用户

• 希望把复杂配置交给 Agent 自动完成的用户

## 准备清单

• 一个已经能在 Claude Code 里使用的 DeepSeek V4 Pro

• 一个 ModelScope API Key

• 本文提供的完整提示词包

## 最终效果

• 截图可以被分析成文字

• 页面 UI 可以被理解

• 报错截图可以直接交给 DeepSeek V4 Pro 排查

• 多张图片可以按当前轮顺序一起分析

• 不默认乱读历史截图、旧缓存或下载目录里的图片

•••

## 先下载完整提示词包

> 这是本文最重要的资料。用户下载后，不需要自己研究里面的代码，也不需要自己一步一步照着改配置。

你只要把它作为资料喂给 DeepSeek V4 Pro，让它按提示词自动完成接入。

| 项目 | 内容 |
| --- | --- |
| 提示词包 | DeepSeek V4 加入视觉推理提示词包 |
| 下载地址 | https://pan.baidu.com/s/1XMinV3-O8j96EwfRZ-rN\_A?pwd=2whk |
| 提取码 | `2whk` |
| ModelScope | https://www.modelscope.cn/my/overview |

![[笔记同步助手/images/0371c7dd518aecb0cbe9c7861355b735_MD5.png]]

•••

## 一、确认 DeepSeek V4 Pro 已接入 Claude Code

视频里我先通过 CC Switch 将 DeepSeek V4 Pro 接入 Claude Code。

这里 CC Switch 只是演示中的一个接入方式，用来说明当前 Claude Code 已经在使用 DeepSeek V4 Pro。本文真正要解决的是下一步：如何让它也能处理截图和图片。

![[笔记同步助手/images/1ad209ccae6053e18f950c3fa9b67f7b_MD5.png]]

•••

## 二、先看问题：DeepSeek V4 Pro 不能直接看图

直接把图片丢给 DeepSeek V4 Pro，它会提示当前模型不支持多模态图像分析，所以无法直接查看图片内容。

这就是 VLM-Bridge 要解决的问题。

它不是把 DeepSeek V4 Pro 变成原生视觉模型，而是在它前面加一层“视觉翻译”：

• 先让视觉模型分析图片

• 再把图片内容转成文字

• 最后交给 DeepSeek V4 Pro 继续推理

![[笔记同步助手/images/1ad209ccae6053e18f950c3fa9b67f7b_MD5.png]]

•••

## 三、准备 ModelScope API Key

打开 ModelScope 魔塔社区并完成注册、实名认证。API Key 的位置不在模型详情页，而是在个人中心左侧的「访问控制」里。

进入方式：

• 打开 ModelScope 个人中心

• 点击左侧「访问控制」

• 进入「访问令牌」

• 如果还没有令牌，就点击「新建访问令牌」

• 已有令牌，则点击右侧复制按钮

复制出来的这串访问令牌，就是后面提供给 DeepSeek V4 Pro 的 ModelScope API Key。

![[笔记同步助手/images/613af52181390895ab5d74c1d368c301_MD5.png]]

![[笔记同步助手/images/8494fb34dc714f40c8325413d0d714ea_MD5.png]]

### ModelScope 配置

| 项目 | 内容 |
| --- | --- |
| 平台 | ModelScope 魔塔社区 |
| API 类型 | OpenAI-compatible API |
| Base URL | [https://api-inference.modelscope.cn/v1](https://api-inference.modelscope.cn/v1) |
| 视觉模型 | `Qwen/Qwen3.5-35B-A3B` |
| 作用 | 负责把截图、页面图、报错图分析成文字 |

注意：API Key 只需要在本机提供给 DeepSeek V4 Pro 使用，不要放到公开文档或公开截图里。

•••

## 四、把提示词包喂给 DeepSeek V4 Pro

这一步才是整套方案的核心。用户不需要手动复制一堆脚本，也不需要自己研究 Hook 怎么写。

下载提示词包后，在 Claude Code 里把提示词资料交给 DeepSeek V4 Pro，并告诉它你的 ModelScope API Key。可以按下面这个思路发给它：

```
我已经下载了 DeepSeek V4 加入视觉推理提示词包。
请你阅读这个提示词包和里面的说明，按照要求帮我自动完成 VLM-Bridge 接入。
我的 ModelScope API Key 是：YOUR_MODELSCOPE_API_KEY
请你完成脚本、配置、Claude Code Hook 注册，并最后帮我验证单图和多图分析是否正常。
```

DeepSeek V4 Pro 会自动处理这些事：

• 创建或修改 VLM-Bridge 脚本

• 填入 ModelScope 配置

• 注册 Claude Code `UserPromptSubmit` Hook

• 把图片分析结果注入当前 prompt

• 验证单图和多图分析是否正常

![[笔记同步助手/images/4d17aeefce11336ea5a5e21092b8cd09_MD5.png]]

•••

## 五、它会自动完成 VLM-Bridge 接入

DeepSeek V4 Pro 会根据提示词包里的要求，自动完成 VLM-Bridge 的核心接入。你只需要跟着它的提示确认执行，不需要自己一步步手动写配置。

| 自动完成项 | 说明 |
| --- | --- |
| 创建视觉分析脚本 | 用来读取当前轮图片并调用视觉模型 |
| 配置 ModelScope | 使用你的 API Key 和 `Qwen/Qwen3.5-35B-A3B` |
| 注册 Claude Code Hook | 在用户消息提交前自动运行 VLM-Bridge |
| 注入图片分析结果 | 把图片分析文本写入当前 prompt |
| 验证单图和多图 | 确认截图、图片路径、多图输入都能工作 |

![[笔记同步助手/images/6ca0297ddd640580822fe46bef889e65_MD5.png]]

•••

## 六、为什么不会乱读历史截图

提示词包里已经强调：只处理当前轮用户明确提交的图片，不会默认扫描历史截图、下载目录或旧缓存。

| 图片来源 | 处理方式 |
| --- | --- |
| 当前消息里的 `[Image #N]` | 只匹配当前轮对应图片 |
| 用户明确写出的图片路径 | 读取该路径 |
| 用户明确说“看图 / 截图 / 报错图” | 才读取当前剪贴板图片 |
| 历史截图、旧缓存、最近目录 | 默认不扫描 |

最终注入给 DeepSeek V4 Pro 的内容会标记为 `Current turn image analysis`，让模型知道这是当前轮图片分析，不是历史上下文。

•••

## 七、重新粘贴图片验证效果

接入完成后，重新在 Claude Code 里粘贴图片并提问。正常情况下，VLM-Bridge 会先调用视觉模型分析图片，再把分析结果交给 DeepSeek V4 Pro。

![[笔记同步助手/images/388db73e3f8d526dbc18438d6d39c974_MD5.png]]

如果一次提交多张图，也应该只分析当前轮明确提交的多张图，不把旧图混进来。

![[笔记同步助手/images/c82719d098882e15c99e25a34b3291ab_MD5.png]]

## 常见输入方式

| 输入方式 | 适合场景 |
| --- | --- |
| 直接粘贴截图 | 看报错、看页面、看配置 |
| 提供本地图片路径 | 分析项目目录里的固定素材 |
| 一次提交多张图 | 页面前后对比、连续步骤分析 |

•••

## 最后

这套方法的重点就是：把复杂操作交给 DeepSeek V4 Pro 自动完成。

你只需要下载提示词包，准备 ModelScope API Key，把资料喂给 DeepSeek V4 Pro，它就会帮你完成 VLM-Bridge 接入。

这样一来，DeepSeek V4 Pro 仍然是你的主力推理模型，同时又能通过视觉模型间接看懂图片、截图、页面和报错现场。

如果你已经在 Claude Code 里使用 DeepSeek V4 Pro，这个方法值得直接接上。

---

![[笔记同步助手/images/560c2fd76cbc88edc0e3b6b719ec1392_MD5.jpg|cover_image]]

原创 Pixhero 小红猪LRPG

阅读原文

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/2aad4799_1779894882211?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzkyODk3ODczMg%3D%3D%26mid%3D2247486357%26idx%3D1%26sn%3D59efcc5d4e4a623b61d97cfebae3468a%26chksm%3Dc32fd2bfba5dc20bde99a5b9f86acfae98fef6e71965691ad16f71b87ccc965973d9101651d1%26mpshare%3D1%26scene%3D1%26srcid%3D0527FD6tWRxjaTenjSGitLyO%26sharer_shareinfo%3Dfcca0a7337d37be646991ce3fa701d87%26sharer_shareinfo_first%3Dfcca0a7337d37be646991ce3fa701d87%23rd&s=obsidian)