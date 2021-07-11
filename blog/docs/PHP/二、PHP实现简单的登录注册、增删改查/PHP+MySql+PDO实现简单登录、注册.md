# PHP+MySql+PDO实现简单登录、注册

最近学习中要使用PHP+MySql实现简单登录注册，看了很多简单案例后发现，并没有人通过PDO实现简单登录注册，要么就是Mysql和MySqli实现，就算实现了意义也不大，js就可以做的事情，没必要放到PHP中去，我却偏偏不相信，保留着一股倔劲，简单的实现了登录注册，下面请看代码，有错误的地方希望大佬们指教！

### 新建数据库名itcast , 表名user ,执行下面代码

```
create table user(
       id int unsigned primary key auto_increment,
       username varchar(10) not null comment '用户名',
       password char(20) not null comment '密码',
       email varchar(40) not null comment '邮箱'
)charset=utf8;

insert into user (username,password,email) values
('张三','123456','zhangsan@qq.com');
```

### 目录结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527135921307.png)
### 首先从注册前台页面register_html.php开始

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>欢迎注册</title>
</head>
<form action="./register.php" method="post">
<table >
	<tr><td class="title" colspan="2">欢迎注册新用户</td></tr>
	<tr><th>用户名：</th><td><input type="text" name="username" /></td></tr>
	<tr><th>邮箱：</th><td><input type="text" name="email" /></td></tr>
	<tr><th>密码：</th><td><input type="password" name="password" id="pw1" /></td></tr>
	<tr><th>确认密码：</th><td><input type="password" id="pw2" /></td></tr>
	<tr><td colspan="2" class="td-btn">
	<input type="submit" value="提交注册" class="button" />
	<input type="button" value="返回登录" class="button" onclick="location.href='login.php'"  />
	</td></tr>
</table>
</form>
</html>
```


### 注册后台页面register.php（注册即是新增）

```
<?php 
header ('Content-type:text/html;charset=utf-8');
//数据库服务器主机名，端口号，选择的数据库，字符集
$dsn = "mysql:host=localhost;dbname=itcast;charset=utf8";
$user = 'root';         //数据库名
$pwd = 'root';          //数据库密码

try{
    $pdo = new PDO($dsn,$user,$pwd);
    
    //如果post表单不为空
    if(!empty($_POST)){
        
        //声明变量$fields，用来保存字段信息
        $fields = array('username','password','email');
        
        //声明$values，用来保存值信息
        $values = array();
        
        //遍历$fields，获取输入用户名、密码、邮箱的键和值
        foreach($fields as $k=>$v){
            
            $data = isset($_POST[$v]) ? $_POST[$v] : '';
            
            if($data=='') die($v.'字段不能为空！');
            
            //赋值给$fields数组
            $fields[$k] = "$v";
            
            //赋值给$values数组
            $values[] = "'$data'";
            
        }
        //将$fields数组以逗号连接，赋值给$fields，组成insert语句中的字段部分
        //implode — 将一个一维数组的值转化为字符串
        $fields = implode(',', $fields);
        
        //将$values数组以逗号连接，赋值给$values，组成insert语句中的值部分
        $values = implode(',', $values);
        
        //最后把$fields和$values拼接到insert语句中，注意要指定表名
        $sql = "insert into user ($fields) values ($values)";
        
        if($res = $pdo->query($sql)){
            //注册成功，自动跳转到会员中心
            echo '<script>alert("注册成功！");window.location.href="login_html.php";</script>';
        }else{
            die ('注册失败！');
        }
    }
    
}catch(PDOException $e){
    echo $e->getMessage().'<br>';
    echo $e->getLine().'<br>';
    echo $e->__toString().'<br>';
}
define('APP', 'itcast');
require './register_html.php';

```

### 登录前台页面login_html.php

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>欢迎登录</title>
</head>
<body>
    <form method="post" action="./login.php">
        <table>
        	<tr><td>欢迎登录</td></tr>
        	<tr><th>用户名：</th><td><input type="text" name="username" /></td></tr>
        	<tr><th>密码：</th><td><input type="password" name="password" /></td></tr>
        	<tr><td>
        	<input type="submit" value="登录" />
        	<input type="reset" value="重新填写" />
        	</td></tr>
        </table>
    </form>
</body>
</html>

```
###  登录后台页面login.php

```
<?php
header ('Content-type:text/html;charset=utf-8');
//数据库相关信息
$dsn = "mysql:host=localhost;dbname=itcast;charset=utf8";
$user = 'root';         //数据库名
$pwd = 'root';          //数据库密码，根据自己的密码更改

try{
    $pdo = new PDO($dsn,$user,$pwd);
    
   //如果表单中不为空
    if(!empty($_POST)){
        
        //从表单中获取数据
        $username = isset($_POST['username']) ? trim($_POST['username']) : '';
        $password = isset($_POST['password']) ? ($_POST['password']) : '';

        //执行SQL语句
		$sql = "select `id`,`password` from `user` where `username`='$username'";
		
		if($res = $pdo->query($sql)){          
				//登录成功，自动跳转到会员中心
				echo '<script>alert("登录成功");window.location.href="index.php";</script>';
		}else{
		    //否则提示登录失败
		    die('登录失败！');
		}
    }
}catch(PDOException $e){
    //这段用于出错的时候，方便告诉我们那里错了
    echo $e->getMessage().'<br>';
    echo $e->getLine().'<br>';      //显示错误所在多少行
    echo $e->__toString().'<br>';
}
define('APP', 'itcast');
require './login_html.php';

?>
```
### 最后是我们登录成功的inex.php页面

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
		<h1>登录成功！</h1>
</body>
</html>

```
##### 这里做的并不是很美观，大家可以在这个基础上增加好看的样式，增加两次密码是否相同的判断，使用正则实现注册格式的判断等等，这里就不一一讲了，目的主要是能实现简单的登录注册，嘻嘻！

### 输入注册信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142141905.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 点击注册
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142219896.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
### 注册成功，自动跳转到登录页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142314458.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
### 输入刚刚注册的信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/201905271426363.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
### 点击登录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142736746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
### 成功跳转到index.php页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142835237.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)