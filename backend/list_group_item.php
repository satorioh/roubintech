<?php
header("Content-Type:application/json;charset:utf-8");

$wgroup = $_REQUEST['wgroup'];
$link = mysqli_connect('localhost','root','','roubintech');

$sql = "set names utf8";
mysqli_query($link,$sql);

$sql = "select * from website where wgroup='$wgroup'";
$result = mysqli_query($link,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);