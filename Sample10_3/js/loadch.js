  	function loadchObjFile(url)
		{
		    var req = new XMLHttpRequest();
		    req.onreadystatechange = function () { processBallLoadObj(req) };
		    req.open("GET", url, true);
		    req.responseType = "text";
		    req.send(null);
		}
		
		function createBall(objDataIn)
		{
		   if(shaderProgArray[0])
		   {
		      //���������õ�����
          ooTri=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[0]); 
		   }
		   else
		   {
		      setTimeout(function(){createBall(objDataIn);},10); //��ʱ����createBall����������ֻ����һ�� 
		   }
		}
		
		function processBallLoadObj(req)
		{
		    if (req.readyState == 4) 
		    {
		        var objStr = req.responseText;	       
		        var dataTemp=fromObjStrToObjectData(objStr);	
		        createBall(dataTemp);                     
		    }
		} 