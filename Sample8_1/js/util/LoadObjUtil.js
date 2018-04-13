function ObjectData(vertexCountIn,verticesIn,texcoordsIn,normalsIn) {
    this.vertexCount=vertexCountIn;
    this.vertices=verticesIn;
    this.texcoords=texcoordsIn;
    this.normals=normalsIn;
}

function Normal(nxIn,nyIn,nzIn) {//法向量类
    this.nx=nxIn;
    this.ny=nyIn;
    this.nz=nzIn;
    //与其他法向量比较的方法
    this.compareNormal=function (normal) {
        var DIFF=0.000001;
        if((this.nx-normal.nx)<DIFF && (this.ny-normal.ny)<DIFF && (this.nz-normal.nz)<DIFF){
            return false;//向量相等
        }else{
            return true;//如果3个分量的差值不都在误差范围内则向量不等
        }
    }
}

//法向量管理类其功能为将同一顶点的不同法向量放置在一个数组内
function SetOfNormal() {
    this.array=new Array();//声明存放法向量的数组，其长度与顶点数相同
    this.add=function (index,normal) {//添加法向量的方法
        if(this.array[index]==null){//如果代表顶点的数组中没有法向量
            this.array[index]=new Array();//新建一个存放法向量的数组
            this.array[index].push(normal);//直接将对应的法向量放入
        }else{
            var flag=true;
            for(var j=0;j<this.array[index].length;j++){
                //相同的法向量，则不存入
                if(this.array[index][j].compareNormal(normal)==false){
                    flag=false;
                }
            }
            if(flag=true){
                this.array[index].push(normal);
            }
        }
    }
}

function fromObjStrToObjectData(objStr) {
    var alv=new Array();//原始顶点坐标数据数组-直接从obj文件中加载
    var alvResult=[];   //结果顶点数组坐标-按面组织好
    var alnResult=[];   //计算出的法向量坐标
    var altResult=[];   //计算出的顶点纹理坐标
    var setOfNormal=new SetOfNormal();//法向量管理对象
    var aln=[];//存放平均法向量的数组
    var alt=[];//存放纹理坐标数据数组
    var alFaceIndex=[];
    var lines=objStr.split("\n");
    for(var lineIndex in lines){//遍历每一行内容
        var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");//先替换制表符，再替换行尾空格
        if(line[0]=="#"){//以#开头，为注释行
            continue;//直接将此行忽略
        }
        var array=line.split(" ");//以空格为分隔符进行切分
        if(array[0]=="v"){
            alv.push(parseFloat(array[1]));
            alv.push(parseFloat(array[2]));
            alv.push(parseFloat(array[3]));
        }else if(array[0]=="vn") {
            aln.push(parseFloat(array[1]));
            aln.push(parseFloat(array[2]));
            aln.push(parseFloat(array[3]));
        }else if(array[0]=="vt") {
            alt.push(parseFloat(array[1]));
            alt.push(1.0-parseFloat(array[2]));
        }else if(array[0]=="f"){
            if (array.length != 4)
            {
                alert("array.length != 4");
                continue;
            }
            for (var i = 1; i < 4; ++i)
            {
                var tempArray=array[i].split("/");
                var vIndex=tempArray[0]-1;
                var tIndex=tempArray[1]-1;
                var nIndex=tempArray[2]-1;

                alvResult.push(alv[vIndex*3+0], alv[vIndex*3+1], alv[vIndex*3+2]);
                altResult.push(alt[tIndex*2+0], alt[tIndex*2+1]);
                alnResult.push(aln[nIndex*3+0], aln[nIndex*3+1], aln[nIndex*3+2]);

            }
        }
    }
    return new ObjectData(alvResult.length/3,alvResult,altResult,alnResult);//返回提取的数据
}
function getCrossProduct( x1, y1, z1, x2, y2, z2)//求两个向量叉积的方法
{
    var array=new Array;
    // 求出两个矢量叉积在xyz轴的分量ABC
    var A=y1*z2-y2*z1;
    var B=z1*x2-z2*x1;
    var C=x1*y2-x2*y1;
    array.push(A,B,C);
    return array;
}
function vectorNormal(vector)
{
    var module=Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1]+vector[2]*vector[2]);//求向量的模
    return new Normal(vector[0]/module,vector[1]/module,vector[2]/module);//规格化
}
