function ObjectData(vertexCountIn,verticesIn) {
    this.vertexCount=vertexCountIn;
    this.vertices=verticesIn;
}
function fromObjStrToObjectData(objStr) {
    var alv=new Array();//原始顶点坐标数据数组-直接从obj文件中加载
    var alvResult=[];   //结果顶点数组坐标-按面组织好
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
            for(var i=1;i<4;++i){

                var tempArray=array[i].split("/");//面的第一个顶点的x、y、z坐标到数组
                var vIndex=tempArray[0]-1;//得到顶点索引
                alvResult.push(alv[vIndex*3]);
                alvResult.push(alv[vIndex*3+1]);
                alvResult.push(alv[vIndex*3+2]);
            }
        }

    }
    return new ObjectData(alvResult.length/3,alvResult);//返回提取的数据
}