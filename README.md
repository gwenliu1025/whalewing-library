# 鲸翼书库（whalewing-library）

[鲸翼](https://github.com/gwenliu1025/whalewing)「知识卡片 → 书架 → 在线书目」读取的公开书目。书不随插件分发，员工在书架里点“下载到书架”时才从这里下载到本机，不想看就不下载，不占插件体积。

鲸翼读取本仓库 `main` 分支的书目，地址固定为：

```
https://raw.githubusercontent.com/gwenliu1025/whalewing-library/main/catalog.json
```

## 只收开放许可的内容

这里只放允许公开再分发的书：开放许可（CC BY、CC BY-SA、MIT 等）或已进入公有领域的作品，每本都写明来源、许可和署名。**商业出版的电子书不能放进来**，即使自己买过；这类书请员工在书架里用“导入电子书”放进自己的本机书架，只自己看。

## 目录结构

| 路径 | 内容 |
|---|---|
| `catalog.json` | 书目（由脚本生成，不要手改） |
| `books.json` | 书目的人工登记：书名、作者、简介、分类、许可、署名 |
| `books/` | 可下载的书，目前是 Markdown（鲸翼也能读 EPUB、TXT、PDF 等格式） |
| `sources/` | 译文所依据的固定版本原件，便于核对 |
| `licenses/` | 许可证全文 |
| `build-catalog.mjs` | 生成 `catalog.json`，补上文件大小和 SHA-256 |

## 加一本书

1. 确认许可允许再分发，把文件放进 `books/`（文件名只用字母、数字、`-`、`.`）。
2. 在 `books.json` 里登记：`id`（小写字母、数字、`-`）、`file`、`title`、`author`、`description`、`category`、`language`、`license`、`licenseUrl`、`attribution`。
3. 运行 `node build-catalog.mjs` 重新生成 `catalog.json`。鲸翼下载后核对 SHA-256，不一致会丢弃文件。
4. 提交并推送到 `main`。

下载地址只接受 GitHub 的域名（`raw.githubusercontent.com`、`github.com` 及其下载跳转域名）。书目里的 `url` 写仓库内相对路径即可，也可以写 GitHub Release 附件的完整地址（大文件适合放 Release）。

## 许可

每本书保留各自的许可，见 `catalog.json` 里的 `license`、`licenseUrl` 和 `attribution`，许可证全文在 `licenses/`：

- 《管理学原理（节选·中文译本）》《经济学原理（节选·中文译本）》：OpenStax 教材，CC BY 4.0。中文译文由鲸翼翻译，不是 OpenStax 官方译本，同样按 CC BY 4.0 提供；`sources/` 里保留所依据的固定版本英文原件。
- 《生成式 AI 入门：提示工程》：微软 Generative AI for Beginners 官方中文课程，MIT。正文未改写，只在原位置标明校订了一处术语误写。

`books.json`、`build-catalog.mjs` 和本说明随鲸翼采用 Apache License 2.0。
