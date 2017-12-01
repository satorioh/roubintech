<?php
header("Content-Type:application/json;charset:utf-8");
include('config.php');
$link = mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

$sql = "set names utf8";
mysqli_query($link,$sql);

$sql = "select * from website where dataimg!=''";
$result = mysqli_query($link,$sql);
//$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
$list = array();
while ($row = $result->fetch_assoc()) {
    $list[] = $row;
};
echo json_encode($list);