function LightManager(lxIn,lyIn,lzIn) {//声明光源的管理类
    this.lx=lxIn;//定向光的x分量
    this.ly=lyIn;//定向光的y分量
    this.lz=lzIn;//定向光的z分量
    this.setLightLocation=setLightLocationF;//设置定向光方向的方法
}

function setLightLocationF(lxIn,lyIn,lzIn) {
    this.lx=lxIn;//定向光的x分量
    this.ly=lyIn;//定向光的y分量
    this.lz=lzIn;//定向光的z分量
}