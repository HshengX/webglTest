# webglTest

 **webglTest**是《H5和WebGL3D开发实战详解》 吴亚峰 于复兴 索伊娜编著 随书源码的例子。 [书籍源码下载地址](http://www.toppr.net/)

## 章节说明
部分例子说明如下

## Sample5_1

使用将球体切分成三角形的的策略绘制球体的

## Sample5_2

在**Sample5_1**的基础上增加环境光效果

## Sample5_3
在**Sample5_1**的基础上增加散射光效果

散射光的计算公式如下：
light：散射光照射结果
k：材质的散射系数
lightSource：散射光强度
$\alpha$：入射角

$$
light=k*lightSource*max(cos(\alpha),0)
$$
程序中不进行三角函数计算，而是计算入射光向量和法向量的向量积

## Sample5_4
在**Sample5_3**的基础上修改，只不过不是增加散射光效果，而是增加镜面光效果。不同的是镜面光效果还与摄像机位置有关

## Sample5_5
综合**Sample5_2**环境光，**Sample5_3**散射光和**Sample5_4**镜面光三种通道。这样更接近真实光照效果