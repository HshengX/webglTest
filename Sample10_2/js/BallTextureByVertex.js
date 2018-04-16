function BallTextureByVertex(								//�����������������������
	gl,						 					//GL������
	programIn	//��ɫ������id
	){
	var vertices=new Array();//������������
	var texcoor=new Array();//������������
	var texCoorArray=generateTexCoor(360/11.25,180/11.25);//��ȡ�з���ͼ����������
	var tc=0,ts=texCoorArray.length,i=0,j=0;//����������������������鳤��
	for(var vAngle=90;vAngle>-90;vAngle=vAngle-11.25)//��ֱ����angleSpan��һ��
        {
        	for(var hAngle=360;hAngle>0;hAngle=hAngle-11.25)//ˮƽ����angleSpan��һ��
        	{
        		//����������һ���ǶȺ�����Ӧ�Ĵ˵��������ϵ��ı��ζ�������
        		//��������������ı��ε�������
        		
        		var xozLength=1.0*0.8*Math.cos(Math.PI*vAngle/180);
        		var x1=xozLength*Math.cos(Math.PI*hAngle/180);
        		var z1=xozLength*Math.sin(Math.PI*hAngle/180);
        		var y1=1.0*0.8*Math.sin(Math.PI*vAngle/180);
        		
        		xozLength=1.0*0.8*Math.cos(Math.PI*(vAngle-11.25)/180);//
        		var x2=xozLength*Math.cos(Math.PI*hAngle/180);
        		var z2=xozLength*Math.sin(Math.PI*hAngle/180);
        		var y2=1.0*0.8*Math.sin(Math.PI*(vAngle-11.25)/180);
        		
        		xozLength=1.0*0.8*Math.cos(Math.PI*(vAngle-11.25)/180);
        		var x3=xozLength*Math.cos(Math.PI*(hAngle-11.25)/180);
        		var z3=xozLength*Math.sin(Math.PI*(hAngle-11.25)/180);
        		var y3=1.0*0.8*Math.sin(Math.PI*(vAngle-11.25)/180);
        		
        		xozLength=1.0*0.8*Math.cos(Math.PI*vAngle/180);
        		var x4=xozLength*Math.cos(Math.PI*(hAngle-11.25)/180);
        		var z4=xozLength*Math.sin(Math.PI*(hAngle-11.25)/180);
        		var y4=1.0*0.8*Math.sin(Math.PI*vAngle/180);   
        		//������һ��������
				vertices[i*18]=x1;vertices[i*18+1]=y1;vertices[i*18+2]=z1;
				vertices[i*18+3]=x2;vertices[i*18+4]=y2;vertices[i*18+5]=z2;
				vertices[i*18+6]=x4;vertices[i*18+7]=y4;vertices[i*18+8]=z4;       		
        		//�����ڶ�������
				vertices[i*18+9]=x4;vertices[i*18+10]=y4;vertices[i*18+11]=z4;
				vertices[i*18+12]=x2;vertices[i*18+13]=y2;vertices[i*18+14]=z2;
				vertices[i*18+15]=x3;vertices[i*18+16]=y3;vertices[i*18+17]=z3;
        		//��һ������3�������6����������
				texcoor[j*12]=texCoorArray[tc++%ts];
				texcoor[j*12+1]=texCoorArray[tc++%ts];
				texcoor[j*12+2]=texCoorArray[tc++%ts];
				texcoor[j*12+3]=texCoorArray[tc++%ts];
				texcoor[j*12+4]=texCoorArray[tc++%ts];
				texcoor[j*12+5]=texCoorArray[tc++%ts];
        		//�ڶ�������3�������6����������
				texcoor[j*12+6]=texCoorArray[tc++%ts];
				texcoor[j*12+7]=texCoorArray[tc++%ts];
				texcoor[j*12+8]=texCoorArray[tc++%ts];
				texcoor[j*12+9]=texCoorArray[tc++%ts];
				texcoor[j*12+10]=texCoorArray[tc++%ts];
				texcoor[j*12+11]=texCoorArray[tc++%ts];    		
        	}
        }
	this.vcount=vertices.length/3;					//�õ���������
	this.vertice=vertices;
	this.texcoors=texcoor;
	this.vertexBuffer=gl.createBuffer();				//���������������ݻ���
	gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer); 	//�󶨶����������ݻ���
	//�����������������뻺��
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertice),gl.STATIC_DRAW);
    //���������������껺��
	this.vertexTexCoorBuffer=gl.createBuffer();
	//���������������������뻺��
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexTexCoorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.texcoors),gl.STATIC_DRAW);
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
	//this.generateTexCoor=function(bw,bh)
	function generateTexCoor(bw,bh)
	{
		var result=new Array(bw*bh*6*2);
		var sizew=1.0/bw,sizeh=1.0/bh,c=0;
		for(var i=0;i<bh;i++)
    	{
    		for(var j=0;j<bw;j++)
    		{
    			//ÿ����һ�����Σ������������ι��ɣ��������㣬12����������
    			var s=j*sizew,t=i*sizeh;
    			
    			result[c++]=s;
    			result[c++]=t;
    			
    			result[c++]=s;
    			result[c++]=t+sizeh;
    			
    			result[c++]=s+sizew;
    			result[c++]=t;
    			
    			
    			result[c++]=s+sizew;
    			result[c++]=t;
    			
    			result[c++]=s;
    			result[c++]=t+sizeh;
    			
    			result[c++]=s+sizew;
    			result[c++]=t+sizeh;    			
    		}
    	}
		return result;
	}
}
