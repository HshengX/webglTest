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


## Sample5_6
在**Sample5_5**的基础上修改，不同的是这里的光源是定向光（光的方向一致），不是定位光（类似点光源）。
呈现的效果是不管是场景中的任何位置的物体都产生相同的光照效果。
同样综合**Sample5_2**环境光，**Sample5_3**散射光和**Sample5_4**镜面光三种通道。这样更接近真实光照效果

## Sample5_7
在**Sample5_5**的基础上修改，不同的是这里的是正方体，采用面向量策略（一个面上所有点的法向量即为面法向量）

## Sample5_8
在**Sample5_5**的基础上修改，不同的是这里的是正方体，采用点向量策略（点所属的面法向量的平均值）。对于棱角分明的物体，采用面法向量策略比较好

## Sample5_9
在**Sample5_5**的基础上修改。不同的是这里的光照计算是在片元着色器计算的，光照效果更加细腻。片元接收从顶点传过来的法向量，在片元着色器中计算最终光照强度。这样计算量更大，
计算效率没有每顶点计算光照的方法高

## Sample6_1
纹理映射

## Sample6_2
在**Sample6_1**的基础上修改。纹理拉伸

## Sample7_1
3D模型加载——加载obj文件

## Sample7_2
在**Sample7_1**的基础上修改。3D模型加载——增加光照、采用面法向量

## Sample7_3
在**Sample7_2**的基础上修改。3D模型加载——增加光照、采用点法向量

## Sample7_4
在**Sample7_3**的基础上修改。3D模型加载——增加光照、采用点法向量、增加纹理

## Sample7_5
在**Sample7_4**的基础上修改。3D模型加载——增加光照、采用点法向量、增加纹理，不同的是法向量是3dx max导出obj的时候也导出法向量，这样就不用再程序中计算点法向量，提升运行效率

## Sample8_1
混合，实现半透明效果

## Sample9_1
标志板

## Sample9_2
普通灰度图形

## Sample9_3
在**Sample9_2**的基础上修改。普通灰度图形，过程纹理地形。修改着色器，当高度高于某值时采用岩石纹理，低于某一高度采用草皮纹理，介于两者之间则
按一定比例混合

## Sample9_4
在**Sample9_3**的基础上修改。普通灰度图形，过程纹理地形。采用mipmap技术，避免远处纹理清晰，近处纹理反而模糊的情况。

## Sample9_5
天空盒，由6张纹理图构成正方体。缺点是旋转摄像机角度时，面与面接缝处真实感差很多

## Sample9_6
在**Sample9_4**的基础上修改。天空穹

## Sample10_1
在**Sample7_5**的基础上修改。剪裁测试

## Sample10_2
模板测试

## Sample10_3
任意剪裁屏幕

## Sample11_1
初识THREE.js

## Sample11_2
初识THREE.js 场景 雾化

## Sample11_3
初识THREE.js 几何对象

## Sample11_4
初识THREE.js 透视投影和正交投影

## Sample11_5
初识THREE.js 点光源和环境光

## Sample11_7
初识THREE.js 聚光灯光源 重点是开启投影

## Sample11_8
在**Sample11_7**的基础上修改。初识THREE.js 平行光光源 重点是开启投影

## Sample11_9
在**Sample11_1**的基础上修改。材质-网格基础材质

## Sample11_10
在**Sample11_4**的基础上修改。材质-深度着色材质。比较特殊的材质，外观不有光照或者某个材质属性决定，
而是有物体到摄像机的距离决定的，使用这种材质很容易创建出逐渐消失的效果

## Sample11_11
在**Sample11_9**的基础上修改。材质-法向量材质。程序在渲染时会根据法向量选择对应的颜色

## Sample11_12
初识THREE.js 材质-面材质。更像是一种容器。面材质不能直接使用，必须使用其他材质进行“填充”。

## Sample11_13
初识THREE.js 材质-朗伯材质。与前几种材质不同，朗伯材质会受到光源影响。通常正对光源的面反射较为明亮的光，整体画面显得十分昏暗。
所以表面粗糙的物体应用此材质会显得很真实。比如树木，岩石，山体等

## Sample11_14
初识THREE.js 材质-Phong材质。Phong也会受到光源影响。适合创建颜色明亮、表面光滑的物体，呈现高光效果，表现出物体的光泽。

## Sample11_15
初识THREE.js 材质-着色器材质。

## Sample11_16
初识THREE.js 模型加载-three.js支持的模型文件格式。以JSON文件格式保存和加载几何体、以JSON文件格式保存和加载场景

## Sample11_17
初识THREE.js 模型加载-three.js支持的模型文件格式。加载JSON格式模型（可以定义几何体、纹理）。JSON格式模型文件是blender建模后导出的适合three.js的JSON格式

## Sample11_18
在**Sample11_17**的基础上修改。初识THREE.js 模型加载-three.js支持的模型文件格式。加载OBJ格式模型（定义几何体），加载OBJ（定义几何体）、MTL格式模型（定义几纹理）。

## Sample11_19
在**Sample11_17**的基础上修改。初识THREE.js 模型加载-three.js支持的模型文件格式。加载Collada格式模型（定义几何体、材质甚至可以定义光照）