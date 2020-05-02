# MicroPay
【个人微信支付 无需资质】MicroPay

采用OCR方式 Tesseract引擎，使用前请前往https://github.com/UB-Mannheim/tesseract/wiki下载并安装

（默认地址为 C:/Program Files (x86)/Tesseract-OCR 如果改变安装地址请更改main.js内ocrpath的值）

注意：该软件需要长期挂着，建议使用云电脑/vps

如果没有能力的话可以使用虚拟机或直接本机运行，不过这样会干扰使用体验

建议使用虚拟机哦

使用结果：

[小破站视频xd](player.bilibili.com/player.html?aid=795608656&bvid=BV18C4y1H7FU&cid=186111768&page=1)

--------
使用方法：

首先，下载一个“微信电脑版”

然后，打开微信支付这个公众号，随便找一个收款（没有就让人给自己发一分钱）点击“收款小账本”

出现一个窗口，把这个窗口拖到一个不挡视线的位置（必须露出共计金额）

将整个屏幕截图

![avatar](https://s1.ax1x.com/2020/05/02/Jvj4qe.png)

用图像处理软件（啥都行）把显示金额（就是图里面的￥0.12那部分）画成白色（必须是纯白），剩下的画成黑色（必须是纯黑）

处理完后如图：

![avatar](https://s1.ax1x.com/2020/05/02/Jvjoad.png)

（别问我为啥用屑QQ浏览器）

将处理完的图片替换mask.png（必须是png，效果最好）

现在，运行这个nodejs（main.js）

什么？怎么运行？

首先，在[这个网站](https://nodejs.org/zh-cn/download/)下一个nodejs（镜像站，比较快，官网的也可以）

（别下错了啊，windows msi）

然后安装，安装后可能弹出个命令行，等命令行消失（或者压根没有命令行）后，在你下载的源码路径运行命令行

```
node main.js
```

记住不要遮挡金额

然后你可以访问localhost:3000，这里就有个付款界面了

对了，你还需要用你的二维码图片替换website内的qrcode.png，不然就变成给我付款啦~

然后...如果你运行这给命令出了问题，请看[这里](https://blog.csdn.net/qq_29712995/article/details/79094433)

然后把这个网站映射出去就可以啦~
