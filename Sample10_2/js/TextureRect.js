function TextureRect(								//�����������������������
	gl,						 					//GL������
	programIn	//��ɫ������id
	){
	this.vcount=6;					//�õ���������
	this.vertices=[-4*1.0,0,-2.568*1.0,
        	-4*1.0,0,2.568*1.0,     
        	4*1.0,0,2.568*1.0,
        	
        	4*1.0,0,2.568*1.0,
        	4*1.0,0,-2.568*1.0,     
        	-4*1.0,0,-2.568*1.0];
	this.texcoor=[0,0,0,0.642,1,0.642,
            1,0.642,1,0,0,0];
	
	this.vertexBuffer=gl.createBuffer();				//���������������ݻ���
	gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer); 	//�󶨶����������ݻ���
	//�����������������뻺��
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertices),gl.STATIC_DRAW);
    //���������������껺��
	this.vertexTexCoorBuffer=gl.createBuffer();
	//���������������������뻺��
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexTexCoorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.texcoor),gl.STATIC_DRAW);
	this.program=programIn;		//��ʼ����ɫ������id
	//��������
	gl.uniform1i(gl.getUniformLocation(this.program, "sTexture"), 0);
	this.drawSelf=function(ms,texture)//��������ķ���
	{	
		gl.useProgram(this.program);//ָ��ʹ��ĳ����ɫ������
		//��ȡ�ܱ任��������id
		var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");
		//���ܱ任����������Ⱦ����
		gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));
		
		gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));//���ö���������������
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);	//�󶨶����������ݻ���
		//������ָ��������������
		gl.vertexAttribPointer(gl.getAttribLocation(this.program,"aPosition"),3,gl.FLOAT,false,0, 0);
		
		//����������������
		gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aTexCoor")); 
		//������������������������Ⱦ����
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoorBuffer);
		gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aTexCoor"), 2, gl.FLOAT, false, 0, 0);        
              
        //������
        gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.drawArrays(gl.TRIANGLES, 0, this.vcount);		//�ö��㷨��������
	}
}
