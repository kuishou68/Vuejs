## 前言
PHP初学者实现登录注册、增伤改查

## 一、PHP+MySql+PDO实现简单登录、注册

> 最近学习中要使用PHP+MySql实现简单登录注册，看了很多简单案例后发现，并没有人通过PDO实现简单登录注册，要么就是Mysql和MySqli实现，就算实现了意义也不大，js就可以做的事情，没必要放到PHP中去，我却偏偏不相信，保留着一股倔劲，简单的实现了登录注册，下面请看代码，有错误的地方希望大佬们指教！

### 1.新建数据库名itcast , 表名user ,执行下面代码

```php
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

### 2.首先从注册前台页面register_html.php开始

```php
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


### 3.注册后台页面register.php（注册即是新增）

```php
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

### 4.登录前台页面login_html.php

```php
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

###  5.登录后台页面login.php

```php
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

### 6.最后是我们登录成功的inex.php页面

```php
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

> 这里做的并不是很美观，大家可以在这个基础上增加好看的样式，增加两次密码是否相同的判断，使用正则实现注册格式的判断等等，这里就不一一讲了，目的主要是能实现简单的登录注册，嘻嘻！

### 7.输入注册信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142141905.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 8.点击注册

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142219896.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 9.注册成功，自动跳转到登录页面

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142314458.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 10.输入刚刚注册的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/201905271426363.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 11.点击登录

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142736746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 12.成功跳转到index.php页面

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527142835237.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)



## 二、PHP+MySql+PDO实现简单增加、删除、修改、查询

> 最近学习中要使用PHP+MySql实现表单的增加、删除、修改、查询，看了很多简单案例后，写了一个简单的表单，下面请看代码，有错误的地方希望大佬们指教！

### 1.数据库名itcast , 表名emp_info

```php
CREATE TABLE `emp_info` (
  `e_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `e_name` varchar(20) NOT NULL,
  `e_dept` varchar(20) NOT NULL,
  `date_of_birth` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_of_entry` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
)CHARSET=utf8;

INSERT INTO `emp_info` VALUES 
(11,'张三','营销部','2019-05-22 17:42:00','2019-05-22 17:42:00'),
(12,'李四','人事部','2018-11-02 20:30:00','2019-05-26 20:30:00');
```

### 目录结构 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527144837309.png)

> images和js没有的也没关系，只是样子不好看而已

### 2.查询的前台页面list_html.php

```php
<?php if(!defined('APP')) die('error!');?>
<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <title>员工信息列表</title>
  <style>
	.box{margin:20px;}
	.box .title{font-size:22px;font-weight:bold;text-align:center;}
	.box table{width:100%;margin-top:10px;border-collapse:collapse;font-size:12px;border:1px solid #B5D6E6;min-width:460px;}
	.box table th,.box table td{height:20px;border:1px solid #B5D6E6;}
	.box table th{background-color:#E8F6FC;font-weight:normal;}
	.box table td{text-align:center;}
	.box a{color:#444;text-decoration:none;}
	.box a:hover{text-decoration:underline;}
	.search{padding:10px 0;float:right;font-size:12px;}
 </style>
 </head>
 <body>
	<form action="./showList.php" method="post">
		<div class="box">
		<div class="title">员工信息列表</div>
		<table border="1">
			<tr>
				<th width="5%">ID</th>
				<th>姓名</th>
				<th>所属部门</th>
				<th>出生日期</th><th>入职时间</th>
				<th width="25%">相关操作</th>
			</tr>
			<?php if(!empty($rows)){ ?>
			<?php foreach($rows as $row){ ?>
			<tr>
				 <td><?php echo $row['e_id']; ?></td>
				 <td><?php echo $row['e_name']; ?></td>
				 <td><?php echo $row['e_dept']; ?></td>
				 <td><?php echo $row['date_of_birth']; ?></td>
				 <td><?php echo $row['date_of_entry']; ?></td>
				 <td>
					<div align="center">
						<span>
							<img src="images/edt.gif" width="16" height="16" /><a href="<?php echo './empUpdate.php?e_id='.$row['e_id'] ?>">编辑</a>&nbsp; &nbsp;
							<a href="<?php echo './empDel.php?e_id='.$row['e_id'] ?>"><img src="images/del.gif" width="16" height="16" />删除</a>
						</span>
					</div>
				</td>
			</tr>
			<?php } ?>
			<?php }else{ ?>
			<tr><td colspan="6">查询的结果不存在！</td></tr>
			<?php } ?>
		</table>
	</form>
		<div class="search"><a href="./empAdd.php">添加员工</a></div>
 </body>
</html>
```

### 3.查询后台页面showList.php

```php
<?php
//声明文件解析的编码格式
header('content-type:text/html;charset=utf-8');

$dbms = 'mysql';

//数据库服务器主机名，端口号，选择的数据库
$host = 'localhost';
$port = '';
$dbname = 'itcast';
//设置字符集
$charset = 'utf8';
//用户密码
$user = 'root';
$pwd = 'root';
$dsn = "$dbms:host=$host;port=$port;dbname=$dbname;charset=$charset";

try{
    $pdo = new PDO($dsn,$user,$pwd);
    //准备SQL语句
    $sql = 'select * from emp_info';
    //执行query()函数
    $result = $pdo->query($sql);

    $rows = array();
        //执行成功
        //遍历结果集
        while( $row = $result->fetch()) {
            $rows[] = $row;
        }
     
}catch(PDOException $e){
    echo $e->getMessage().'<br>';
}
define('APP', 'itcast');
//加载视图页面，显示数据
require './list_html.php';
```

### 4.新增前台页面add_html.php

```php
<?php if(!defined('APP')) die('error!');?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>添加员工</title>
<link rel="stylesheet" href="./js/jquery.datetimepicker.css"/ >
<script src="./js/jquery.js"></script>
<script src="./js/jquery.datetimepicker.js"></script>
<script>
	$(function(){
		$('#date_of_birth').datetimepicker({lang:'ch'});
		$('#date_of_entry').datetimepicker({lang:'ch'});
	});
</script>
<style>
body{background-color:#eee;margin:0;padding:0;}
.box{width:400px;margin:15px auto;padding:20px;border:1px solid #ccc;background-color:#fff;}
.box h1{font-size:20px;text-align:center;}
.profile-table{margin:0 auto;}
.profile-table th{font-weight:normal;text-align:right;}
.profile-table input[type="text"]{width:180px;border:1px solid #ccc;height:22px;padding-left:4px;}
.profile-table .button{background-color:#0099ff;border:1px solid #0099ff;color:#fff;width:80px;height:25px;margin:0 5px;cursor:pointer;}
.profile-table .td-btn{text-align:center;padding-top:10px;}
.profile-table th,.profile-table td{padding-bottom:10px;}
.profile-table td{font-size:14px;}
.profile-table .txttop{vertical-align:top;}
.profile-table select{border:1px solid #ccc;min-width:80px;height:25px;}
.profile-table .description{font-size:13px;width:250px;height:60px;border:1px solid #ccc;}
</style>
</head>
<body>
<div class="box">
	<h1>添加员工</h1>
	<form method="post" action="./empAdd.php">
	<table class="profile-table">
		<tr><th>姓名：</th><td><input type="text" name="e_name" /></td></tr>
		<tr><th>所属部门：</th><td><input type="text" name="e_dept" /></td></tr>
		<tr><th>出生年月：</th><td><input id="date_of_birth" name="date_of_birth" type="text" ></td></tr>
		<tr><th>入职日期：</th><td><input id="date_of_entry" name="date_of_entry" type="text" ></td></tr>
		<tr><td colspan="2" class="td-btn">
		<input type="submit" value="保存资料" class="button" />
		<input type="reset" value="重新填写" class="button" />
		</td></tr>
	</table>
	</form>
</div>
</body>
</html>
```

### 5.新增后台页面

```php
<?php 
header ('content-type:text/html;chaset=utf-8');

$dbms = 'mysql';

//数据库服务器主机名，端口号，选择的数据库
$host = 'localhost';
$port = '';
$dbname = 'itcast';
    
//设置字符集
$charset = 'utf8';
//用户密码
$user = 'root';
$pwd = 'root';

$dsn = "$dbms:host=$host;port=$port;dbname=$dbname;charset=$charset";

try{
    $pdo = new PDO($dsn,$user,$pwd);
    
    //判断是否有表单提交
    if(!empty($_POST)){
    
        //声明变量$fields，用来保存字段信息
        $fields = array('e_name','e_dept','date_of_birth','date_of_entry');
    
        //声明变量$values，用来保存值信息
        $values = array();
    
        //遍历$fields，获取输入员工数据的键和值
        foreach($fields as $k => $v){
    
            $data = isset($_POST[$v]) ? $_POST[$v] : '';
    
            if($data=='') die($v.'字段不能为空');
    
    
            //把字段使用反引号包裹，赋值给$fields数组
            $fields[$k] = "`$v`";
    
            //把值使用单引号包裹，赋值给$values数组
            $values[] = "'$data'";
        }
    
        //将$fields数组以逗号连接，赋值给$fields，组成insert语句中的字段部分
        //implode — 将一个一维数组的值转化为字符串
        $fields = implode(',', $fields);
    
        //将$values数组以逗号连接，赋值给$values，组成insert语句中的值部分
        $values = implode(',', $values);
      
        //最后把$fields和$values拼接到insert语句中，注意要指定表名
        $sql = "insert into `emp_info` ($fields) values ($values)";
    
        //执行SQL
        if($res = $pdo->query($sql)){
            //成功时返回到 showList.php
            header('Location: ./showList.php');
            //停止脚本
            die;
        }else{
            //执行失败
            die('员工添加失败！');
        }
    }
   
    
}catch(PDOException $e){
    echo $e->getMessage().'<br>';
}
define ('APP','itcast');
require './add_html.php';
?>
```

###  6.修改前台页面update_html.php

```php
<?php if(!defined('APP')) die('error!');?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>员工信息编辑</title>
<link rel="stylesheet" href="./js/jquery.datetimepicker.css"/ >
<script src="./js/jquery.js"></script>
<script src="./js/jquery.datetimepicker.js"></script>
<script>
	$(function(){
		$('#date_of_birth').datetimepicker({lang:'ch'});
		$('#date_of_entry').datetimepicker({lang:'ch'});
	});
</script>
<style>
    body{background-color:#eee;margin:0;padding:0;}
    .box{width:400px;margin:15px auto;padding:20px;border:1px solid #ccc;background-color:#fff;}
    .box h1{font-size:20px;text-align:center;}
    .profile-table{margin:0 auto;}
    .profile-table th{font-weight:normal;text-align:right;}
    .profile-table input[type="text"]{width:180px;border:1px solid #ccc;height:22px;padding-left:4px;}
    .profile-table .button{background-color:#0099ff;border:1px solid #0099ff;color:#fff;width:80px;height:25px;margin:0 5px;cursor:pointer;}
    .profile-table .td-btn{text-align:center;padding-top:10px;}
    .profile-table th,.profile-table td{padding-bottom:10px;}
    .profile-table td{font-size:14px;}
    .profile-table .txttop{vertical-align:top;}
    .profile-table select{border:1px solid #ccc;min-width:80px;height:25px;}
    .profile-table .description{font-size:13px;width:250px;height:60px;border:1px solid #ccc;}
</style>
</head>
<body>
<div class="box">
	<h1>修改员工信息</h1>
	<form method="post">
	<table class="profile-table">
		<tr><th>姓名：</th><td><input type="text" name="e_name" value="<?php echo $emp_info['e_name']; ?>"/></td></tr>
		<tr><th>所属部门：</th><td><input type="text" name="e_dept" value="<?php echo $emp_info['e_dept']; ?>"/></td></tr>
		<tr><th>出生年月：</th><td><input id="date_of_birth" name="date_of_birth" type="text" value="<?php echo $emp_info['date_of_birth']; ?>"></td></tr>
		<tr><th>入职日期：</th><td><input id="date_of_entry" name="date_of_entry" type="text" value="<?php echo $emp_info['date_of_entry']; ?>"></td></tr>
		<tr><td colspan="2" class="td-btn">
		<input type="submit" value="保存资料" class="button" />
		<input type="reset" value="重新填写" class="button" />
		</td></tr>
	</table>
	</form>
</div>
</body>
</html>
```

### 7.修改后台页面emUpdate.php

```php
<?php
//声明文件解析的编码格式
header('content-type:text/html;charset=utf-8');

$dbms = 'mysql';
//数据库服务器主机名，端口号，选择的数据库
$host = 'localhost';
$port = '';
$dbname = 'itcast';
//设置字符集
$charset = 'UTF8';
//用户密码
$user = 'root';
$pwd = 'root';
$dsn = "$dbms:host=$host;port=$port;dbname=$dbname;charset=$charset";

try{
    
    $pdo = new PDO($dsn,$user,$pwd);
    
    //获取要编辑的员工的id
    $e_id = isset($_GET['e_id']) ? intval($_GET['e_id']) : 0;
    
    //判断是否有POST数据提交
    if(!empty($_POST)){
    
        //定义变量$update，用来保存处理后的员工数据
        $update = array();
    
        //定义合法字段数组
        $fields = array('e_name','e_dept','date_of_birth','date_of_entry');
    
        //遍历$_POST，获取更新员工数据的键和值
        foreach($fields as $v){
    
            $data = isset($_POST[$v]) ? $_POST[$v] : '';
    
            if($data=='') die($v.'字段不能为空');
    
            //把键和值按照sql更新语句中的语法要求连接，并存入到$update数组中
            $update[] = "`$v`='$data'";
        }
    
        //把$update数组元素使用逗号连接，赋值给$update_str
        $update_str = implode(',', $update);
    
        //组合sql语句
        $sql = "update `emp_info` set $update_str where  `e_id`=$e_id";
    
        if($res = $pdo->query($sql)){
            header("Location: ./showList.php");
            die;
        }else{
            die('员工信息修改失败');
        }
    }else{
        //当没有表单提交时，查询当前要编辑的员工信息，展示到页面中
        $pdo = new PDO($dsn,$user,$pwd);
        
        //编写SQL语句，查询相应ID的员工数据
        $sql = "select * from `emp_info` where `e_id`=$e_id";
    
        $result = $pdo->query($sql);
            
        $rows = array();
        
        while($row = $result->fetch()){
            $rows[] = $row;
        }
    }
}catch(PDOEXception $e){
    echo $e->getMessage().'<br>';
    echo $e->getLine().'<br>';
    echo $e->__toString().'<br>';
}

//显示员工修改页面
define('APP', 'itcast');
require './update_html.php';

```

### 8.删除页面empAdd.php

```php
<?php
header ('Conent-type:text/html;charset=utf-8');

$dbms = 'mysql';
//数据库服务器主机名，端口号，选择的数据库
$host = 'localhost';
$port = '';
$dbname = 'itcast';
//设置字符集
$charset = 'utf8';
//用户名和密码
$user = 'root';
$pwd = 'root';
$dsn = "$dbms:host=$host;port=$port;dbname=$dbname;charset=$charset";

try{
   $pdo = new PDO($dsn,$user,$pwd);
   
   //获取要编辑的员工的id
   $e_id = isset($_GET['e_id']) ? intval($_GET['e_id']) : 0;
   // 准备SQL语句  DELETE FROM Employee WHERE ID='$id'
   $sql = "delete from emp_info where e_id = $e_id";
    
    $result = $pdo->query($sql);
   
    $rows = array();
    
    while($row = $result->fetch()){
        $rows[] = $row;
    }
}catch(PDOException $e){
    echo $e->getMessage().'<br>';
}
define ('APP','itcast');

//在当前页面刷新数据
header ("Location: ./showList.php");
```

### 9.最后提供一个检查用户名密码格式的check_form.lib.php

```php
<?php
//验证用户名（2~16位，只允许汉字，英文字母，数字，下划线）
//注意：只支持验证UTF-8编码
function checkUsername($username){
	if(!preg_match('/^[\w\x{4e00}-\x{9fa5}]{2,10}$/u',$username)){
		return '用户名格式不符合要求';
	}
	return true;
}

//验证密码（长度6~16位，只允许英文字母，数字，下划线）
function checkPassword($password){
	if(!preg_match('/^\w{6,16}$/',$password)){
		return '密码格式不符合要求';
	}
	return true;
}

//验证邮箱（不超过40位）
function checkEmail($email){
	if(strlen($email) > 40){
		return '邮箱长度不符合要求';
	}elseif(!preg_match('/^[a-z0-9]+@([a-z0-9]+\.)+[a-z]{2,4}$/i',$email)){
		return '邮箱格式不符合要求';
	}
	return true;
}

//验证QQ号（5~20位）
function checkQQ($qq){
	if(!preg_match('/^[1-9][0-9]{4,20}$/',$qq)){
		return 'QQ号码格式不符合要求';
	}
	return true;
}

//验证手机号码（11位）
function checkPhone($num){
	if(!preg_match('/^1[358]\d{9}$/',$num)){
		return '手机号码不符合要求';
	}
	return true;
}

//验证URL地址
function checkURL($url){
	if(strlen($url) > 200){
		return 'URL长度不符合要求';
	}elseif(!preg_match('/^http:\/\/[a-z\d-]+(\.[\w\/]+)+$/i',$url)){
		return 'URL格式不符合要求';
	}
	return true;
}
```

> 这里的修改页面做得并不是很好，存在无法显示数据的情况，但是修改功能可以实现，不想修改了，有意向的帮我修改一下，并在下面评论区留言告诉我！

### 10.演示一下，打开首页，实现查询功能

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527150623549.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 11.添加员工

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527150749149.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 12.输入员工信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527150908369.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 13.点击保存，自动回到查询页面，显示刚刚新增的数据

![](https://img-blog.csdnimg.cn/20190527150953634.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

### 其他的不演示了，有问题留言吧！
