function TreeGroup(gl) {
    this.treeGroupadd=function (gl) {//数组中添加植物的位置
        alist.push(new SingleTree(0,0,0,this));//植物的位置
        alist.push(new SingleTree(8,0,10,this));
        alist.push(new SingleTree(5.7,5.7,0,this));
        alist.push(new SingleTree(0,-8,0,this));
        alist.push(new SingleTree(-5.7,5.7,0,this));
        alist.push(new SingleTree(-8,0,0,this));
        alist.push(new SingleTree(-5.7,-5.7,0,this));
        alist.push(new SingleTree(0,8,0,this));
        alist.push(new SingleTree(5.7,-5.7,0,this));
    };

    this.calculateBillboardDirection=function () {
        //计算列表中每棵树的朝向
        for(var i=0;i<alist.length;i++){
            alist[i].calculateBillboardDirection()
        }
    };

    this.drawSelf=function (ms,texture) {
        for(var i=0;i<alist.length;i++){
            alist[i].drawSelf(ms,texture);
        }
    }
}