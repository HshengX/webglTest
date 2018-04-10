function LightManager(lxIn,lyIn,lzIn) {//声明光源的管理类
    this.lx=lxIn;//新建光源管理时设置x坐标
    this.ly=lyIn;//新建光源管理时设置y坐标
    this.lz=lzIn;//新建光源管理时设置z坐标
    this.setLightLocation=setLightLocationF;//设置光源位置的方法
}

function setLightLocationF(lxIn,lyIn,lzIn) {
    this.lx=lxIn;//改变光源x的坐标
    this.ly=lyIn;//改变光源y的坐标
    this.lz=lzIn;//改变光源z的坐标
}