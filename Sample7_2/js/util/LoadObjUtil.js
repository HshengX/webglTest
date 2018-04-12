function ObjectData(vertexCountIn,verticesIn,normalsIn) {
    this.vertexCount=vertexCountIn;
    this.vertices=verticesIn;
    this.normals=normalsIn;
}
function fromObjStrToObjectData(objStr) {
    var alv=new Array();//原始顶点坐标数据数组-直接从obj文件中加载
    var alvResult=[];   //结果顶点数组坐标-按面组织好
    var alnResult=[];   //计算出的法向量坐标
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
        }else if(array[0]=="f"){
            if(array.length!=4){
                alert("array.length!=4");
                continue;
            }
            var tempArray=array[1].split("/");
            var vIndex=tempArray[0]-1;
            vx0=alv[vIndex*3];
            vy0=alv[vIndex*3+1];
            vz0=alv[vIndex*3+2];

            alvResult.push(vx0);
            alvResult.push(vy0);
            alvResult.push(vz0);

            var tempArray=array[2].split("/");
            var vIndex=tempArray[0]-1;
            vx1=alv[vIndex*3];
            vy1=alv[vIndex*3+1];
            vz1=alv[vIndex*3+2];

            alvResult.push(vx1);
            alvResult.push(vy1);
            alvResult.push(vz1);

            var tempArray=array[3].split("/");
            var vIndex=tempArray[0]-1;
            vx2=alv[vIndex*3];
            vy2=alv[vIndex*3+1];
            vz2=alv[vIndex*3+2];

            alvResult.push(vx2);
            alvResult.push(vy2);
            alvResult.push(vz2);

            var vxa=vx1-vx0;
            var vya=vy1-vy0;
            var vza=vz1-vz0;

            var vxb=vx2-vx0;
            var vyb=vy2-vy0;
            var vzb=vz2-vz0;
            var vNormal=vectorNormal(getCrossProduct(vxa,vya,vza,vxb,vyb,vzb));
            for(var i=0;i<3;i++){
                alnResult.push(vNormal[0]);
                alnResult.push(vNormal[1]);
                alnResult.push(vNormal[2]);
            }
        }

    }
    return new ObjectData(alvResult.length/3,alvResult,alnResult);//返回提取的数据
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
    return new Array(vector[0]/module,vector[1]/module,vector[2]/module);//规格化
}
