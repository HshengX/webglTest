		function loadObjFile(url,object,id)//�����ȡobj�ļ��ķ���
		{
		    var req = new XMLHttpRequest();//�����Է�����������
		    req.onreadystatechange = function () { processLoadObj(req,object,id) };//��д�����onreadystatechange�¼�
		    req.open("GET", url, true);//������������ͺ�obj�ļ���·��
		    req.responseType = "text";//���û�Ӧ������
		    req.send(null);
		}
		
		function createObj(objDataIn,object,id)//����ȡ�����ݴ������ƶ���ķ���
		{
		   if(shaderProgArray[id])//�����ɫ���Ѿ����б���
		   {
		   	switch (object){
				case 0:
                    cft=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[id]); //���������õ�����
					break;
				case 1:
                    ch=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[id]); //���������õ�����
					break;
				case 2:
                    pm=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[id]); //���������õ�����
					break;
				case 3:
                    qt=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[id]); //���������õ�����
					break;
				case 4:
                    yh=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[id]); //���������õ�����
					break;
				default:
					break;

            }
		   }
		   else{//�����ɫ����δ���б���
		      setTimeout(function(){createObj(objDataIn,object,id);},10); //10����֮���ٴν��е���
		   }
		}
		
		function processLoadObj(req,object,id)//��д���onreadystatechange�¼�
		{
		    if (req.readyState == 4) //�����ܵ����������������ݺ�
		    {
		        var objStr = req.responseText;//�õ�obj�ļ����ı�����      
		        var dataTemp=fromObjStrToObjectData(objStr);//�����ݽ��д������ȡ
		        createObj(dataTemp,object,id);//����ȡ�����ݴ������ƶ���
		    }
		} 