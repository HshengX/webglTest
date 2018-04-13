		function loadObjFile(url)//�����ȡobj�ļ��ķ���
		{
		    var req = new XMLHttpRequest();//�����Է�����������
		    req.onreadystatechange = function () { processLoadObj(req) };//��д�����onreadystatechange�¼�
		    req.open("GET", url, true);//������������ͺ�obj�ļ���·��
		    req.responseType = "text";//���û�Ӧ������
		    req.send(null);
		}
		
		function createObj(objDataIn)//����ȡ�����ݴ������ƶ���ķ���
		{
		   if(shaderProgArray[0])//�����ɫ���Ѿ����б���
		   {
			ooTri=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[0]); //���������õ�����
		   }
		   else{//�����ɫ����δ���б���
		      setTimeout(function(){createObj(objDataIn);},10); //10����֮���ٴν��е���
		   }
		}
		
		function processLoadObj(req)//��д���onreadystatechange�¼�
		{
		    if (req.readyState == 4) //�����ܵ����������������ݺ�
		    {
		        var objStr = req.responseText;//�õ�obj�ļ����ı�����      
		        var dataTemp=fromObjStrToObjectData(objStr);//�����ݽ��д������ȡ	
		        createObj(dataTemp);//����ȡ�����ݴ������ƶ���                     
		    }
		} 