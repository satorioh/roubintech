<?php
header("Content-Type:application/json;charset:utf-8");
include('config.php');

$kw = $_REQUEST['kw'];
$link = mysqli_connect($db_url,$db_user,$db_pwd,$db_name);

$sql = "set names utf8";
mysqli_query($link,$sql);

$sql = "select * from website where wname like '%$kw%'";
$result = mysqli_query($link,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);
