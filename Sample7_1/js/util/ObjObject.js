function ObjObject(								//声明绘制用物体对象所属类
    gl,						 					//GL上下文
    vertexDataIn,                               //顶点坐标数据
    programIn									//着色器程序id
){
    this.vertexData=vertexDataIn;
    this.vcount=this.vertexData.length/3;					//得到顶点数量
    this.vertexBuffer=gl.createBuffer();				//创建顶点坐标数据缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer); 	//绑定顶点坐标数据缓冲
    //将顶点坐标数据送入缓冲
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

    this.normalData=this.vertexData;					//存储法向量的数组
    this.normalBuffer=gl.createBuffer();				//创建顶点法向量数据缓存
    gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);	//绑定顶点法向量缓存
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.normalData),gl.STATIC_DRAW);//将法向量数据送入缓存

    this.program=programIn;		//初始化着色器程序id
    this.drawSelf=function(ms)//绘制物体的方法
    {
        gl.useProgram(this.program);//指定使用某套着色器程序
        //获取总变换矩阵引用id
        var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");
        //将总变换矩阵送入渲染管线
        gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));

        //获得位置、旋转变换矩阵的引用
        var uMMatrixHandle=gl.getUniformLocation(this.program,"uMMatrix");
        //将位置、旋转变换矩阵送入渲染管线
        gl.uniformMatrix4fv(uMMatrixHandle,false,new Float32Array(ms.getMMatrix()));

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));//启用顶点坐标数据数组
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);	//绑定顶点坐标数据缓冲
        //给管线指定顶点坐标数据
        gl.vertexAttribPointer(gl.getAttribLocation(this.program,"aPosition"),3,gl.FLOAT,false,0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);		//用顶点法绘制物体

    }
}
