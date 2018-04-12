function ObjObject(								//声明绘制用物体对象所属类
    gl,						 					//GL上下文
    vertexDataIn,                               //顶点坐标数据
    vertexNormalIn,                             //顶点法向量数组
    programIn									//着色器程序id
){
    this.vertexData=vertexDataIn;
    this.vcount=this.vertexData.length/3;					//得到顶点数量
    this.vertexBuffer=gl.createBuffer();				//创建顶点坐标数据缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer); 	//绑定顶点坐标数据缓冲
    //将顶点坐标数据送入缓冲
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

    this.normalData=vertexNormalIn;					//存储法向量的数组
    this.normalBuffer=gl.createBuffer();				//创建顶点法向量数据缓存
    gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);	//绑定顶点法向量缓存
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.normalData),gl.STATIC_DRAW);//将法向量数据送入缓存

    this.program=programIn;		//初始化着色器程序id
    this.drawSelf=function(ms)//绘制物体的方法
    {
        gl.useProgram(this.program);//指定使用某套着色器程序
        //获取总变换矩阵引用id
        var uMVPMatrixHandle = gl.getUniformLocation(this.program, "uMVPMatrix");
        //将总变换矩阵送入渲染管线
        gl.uniformMatrix4fv(uMVPMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));

        //获得位置、旋转变换矩阵的引用
        var uMMatrixHandle = gl.getUniformLocation(this.program, "uMMatrix");
        //将位置、旋转变换矩阵送入渲染管线
        gl.uniformMatrix4fv(uMMatrixHandle, false, new Float32Array(ms.getMMatrix()));

        //得到关于位置的引用
        var uLightLocationHandle = gl.getUniformLocation(this.program, "uLightLocation");
        gl.uniform3fv(uLightLocationHandle, new Float32Array([lightManager.lx, lightManager.ly, lightManager.lz]));//传入光源位置

        //得到关于摄像机位置的引用
        var uCameraHandle = gl.getUniformLocation(this.program, "uCamera");
        gl.uniform3fv(uCameraHandle, new Float32Array([ms.cameraFB[0], ms.cameraFB[1], ms.cameraFB[2]]));//将摄像机位置传入管线

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));//启用顶点坐标数据数组
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);	//绑定顶点坐标数据缓冲
        //给管线指定顶点坐标数据
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aPosition"), 3, gl.FLOAT, false, 0, 0);

        //启用法向量数据数组
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aNormal"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);//绑定法向量数据缓冲
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aNormal"), 3, gl.FLOAT, false, 0, 0);//给管线指定法向量坐标数据

        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);		//用顶点法绘制物体
    }
}
