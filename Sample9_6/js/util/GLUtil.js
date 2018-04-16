//初始化WebGL Canvas的方法
function initWebGLCanvas(canvasName){
    var canvas = document.getElementById(canvasName);//获取Canvas对象
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;//声明上下文变量
    for( var ii = 0; ii < names.length; ++ii)//遍历可能的gl上下文名称
    {
        try
        {
            context = canvas.getContext(names[ii], null);//获取GL上下文
        }
        catch(e){}
        if(context)//若成功获取GL上下文则终止循环
        {
            break;
        }
    }
    return context;//返回GL上下文对象
}

//加载单个着色器的方法
function loadSingleShader(ctx, shaderScript) {
    if(shaderScript.type == "vertex")//若为顶点着色器
        var shaderType = ctx.VERTEX_SHADER;//顶点着色器类型
    else if(shaderScript.type == "fragment")//若为片元着色器
        var shaderType = ctx.FRAGMENT_SHADER;//片元着色器类型
    else{//否则打印错误信息
        console.log("*** Error: shader script of undefined type'"+shaderScript.type+"'");
        return null;
    }

    //根据类型创建着色器程序
    var shader = ctx.createShader(shaderType);

    //加载着色器脚本
    ctx.shaderSource(shader, shaderScript.text);

    //编译着色器
    ctx.compileShader(shader);

    //检查编译状态
    var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    if(!compiled && !ctx.isContextLost()){//若编译出错
        var error = ctx.getShaderInfoLog(shader);//获取错误信息
        console.log("*** Error compiling shader ':"+error);//打印错误信息
        ctx.deleteShader(shader);//删除着色器程序
        return null;//返回空
    }
    return shader;//返回着色器程序
}

//加载链接顶点、片元着色器的方法
function loadShaderSerial(gl, vshader, fshader) {
    //加载顶点着色器
    var vertexShader = loadSingleShader(gl,vshader);
    //加载片元着色器
    var fragmentShader = loadSingleShader(gl, fshader);

    //创建着色器程序
    var program = gl.createProgram();

    //将顶点着色器和片元着色器挂接到着色器程序
    gl.attachShader(program, vertexShader);//将顶点着色器添加到着色器程序中
    gl.attachShader(program, fragmentShader);//将片元着色器添加到着色器程序中

    //链接着色器程序
    gl.linkProgram(program);

    //检查链接是否成功
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(!linked && !gl.isContextLost())//若链接不成功
    {
        //获取并在控制台打印错误信息
        var error = gl.getProgramInfoLog(program);//获取错误信息
        console.log("Error in program linking:"+error);//打印错误信息

        gl.deleteProgram(program);//删除着色器程序
        gl.deleteProgram(fragmentShader);//删除片元着色器
        gl.deleteProgram(vertexShader);//删除顶点着色器

        return null;//返回空
    }
    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);
    return program;//返回着色器程序
}

function loadImageTexture(gl,url,texName,isMipmap)
{
    var texture = gl.createTexture();
    var image = new Image();
    image.onload = function() { doLoadImageTexture(gl, image, texture,isMipmap) }
    image.src = url;
    //texMap.set(texName,texture);
    texMap[texName]=texture;
}

function doLoadImageTexture(gl, image, texture,isMipmap)
{
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    if(isMipmap){
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);//使用mipmap线性纹理采样
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)//使用mipmap最近点纹理采样;
    }else{
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    if(isMipmap){
        gl.generateMipmap(gl.TEXTURE_2D);//自动生成mipmap纹理
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
}