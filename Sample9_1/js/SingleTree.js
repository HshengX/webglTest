function SingleTree(x,z,yAngle,tg) {
    tg=new TreeGroup();//获取植物的数组引用
    this.x=x;//该植物的x位置
    this.z=z;//该植物的y位置
    this.yAngle=yAngle;//植物纹理图的旋转角度
    this.tg=tg;

    this.drawSelf=function (ms,texture) {
        ms.pushMatrix();//保护现场
        ms.translate(x,0,z);//将植物平移到对应位置
        ms.rotate(yAngle,0,1,0);//将纹理图旋转对应角度
        tfd.drawSelf(ms,texture);//树的绘制
        ms.popMatrix();//恢复现场
    }

    this.calculateBillboardDirection=function () {//根据摄像机位置计算树木面朝向
        var xspan=x-cx;//计算从植物位置到摄像机位置的x分量
        var zspan=z-cz;//计算从植物位置到摄像机位置的z分量

        //根据向量的两个分量计算出纹理矩形绕y轴的旋转角度
        if(zspan<=0){
            yAngle=180/Math.PI*(Math.atan(xspan/zspan));
        }else{
            yAngle=180+180/Math.PI*(Math.atan(xspan/zspan));
        }
    }
}