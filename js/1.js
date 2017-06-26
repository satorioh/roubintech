/*popbox up & down function*/
var $box = $('#_popBox');
var $boxLeft = $('#_popBox-left');
var $showFrame = $('#_showFrame');
var $iframeMask = $('#_iframeMask');
var $carouselImg = $('.carousel-inner a');
var imgArr = [];
//var img = ["aiqiyi",];
//var $itemTitle = $('.itemTitle');
//var jTitle = document.getElementsByClassName('itemTitle');
//console.log(Array.isArray(jTitle));
var itemTitle = {
    $itemTitle : $('.itemTitle'),
    glyphiconToggle : function () {
        //console.log(this);
        //var $target = $(e.target);
        var $span = $(this).children("span:nth-of-type(2)");
        //console.log($span);
        if ($span.hasClass("glyphicon-menu-up")){
            $span.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
            $(this).children('span.glyphicon-menu-down').parent().css("color","#fff");
        }else {
            $span.removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
            $(this).children('span.glyphicon-menu-up').parent().css("color","springgreen");
        }
    },
    init : function () {
        var $span = $(this).children("span:nth-of-type(2)");
        //console.log($span);
        if ($span.hasClass("glyphicon-menu-up")){
            $span.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
            $(this).children('span.glyphicon-menu-down').parent().css("color","#fff");
        }
    }

};
var popBox = {
    boxHeight : getComputedStyle($box[0]).height,
    boxWidth : getComputedStyle($box[0]).width,
    init : function () {
        //console.log(this.boxHeight);
        //console.log(this.boxWidth);
        //console.log(itemTitle.$itemTitle);
        $box.css("marginBottom","-"+this.boxHeight);
    },
    down : function () {
        $box.animate({marginBottom:"-"+this.boxHeight,opacity:"0"},300,"swing");
        itemTitle.$itemTitle.next().removeClass('in');
        itemTitle.init.call(itemTitle.$itemTitle);
    },
    up : function () {
        $box.animate({marginBottom:"35px",opacity:"1"},300,"swing");
        $iframeMask.css("display","block");
    }
};
popBox.init();
$('#_startButton').click(function (e) {
   if (parseInt($box.css("marginBottom")) < 0) {
       popBox.up();
   }else {
       popBox.down();
   }
});

$iframeMask.on("click",function (e) {
   //console.log(e.clientX);
   //console.log(e.clientY);
    $(this).css("display","none");
    popBox.down();
});

/*glyphicon-menu-down icon toggle*/
itemTitle.$itemTitle.on("click", itemTitle.glyphiconToggle);

// add jump out icon for link that has target attr
$boxLeft.find("a.list-group-item[target]").append($('<span class="glyphicon glyphicon-share-alt pull-right"></span>'));

function getDatahref(e) {
    e.preventDefault();
    var $target = $(e.target);
    if ($target.attr("target")){
        //$target.attr("target","_parent");
        window.open($target.attr("data-href"));
    }else {
        $showFrame.attr("src",$target.attr("data-href"));
    }
};

/*get data-href to showFrame*/
$boxLeft.on("click","a:not(.itemTitle)", getDatahref
    // e.preventDefault();
    // var $target = $(e.target);
    // if ($target.attr("target")){
    //     //$target.attr("target","_parent");
    //     window.open($target.attr("data-href"));
    // }else {
    //     $showFrame.attr("src",$target.attr("data-href"));
    // }
);

var $dataImg = $boxLeft.find('a[data-img]');
$dataImg.each(function () {
    imgArr.push($(this).attr("data-img"));
});
//console.log(imgArr);

/*generate random string*/
function noRepeatObj() {
    var arr = [];
    var obj = {};
    while (arr.length < 4){
    var num = Math.floor(Math.random()*imgArr.length);
    if (arr.indexOf(imgArr[num]) == -1) {
        arr.push(imgArr[num]);
        } else { continue;}
    }
    for(var i=0,len=arr.length;i<len;i++){
        var $item = $boxLeft.find("[data-img="+arr[i]+"]");
        var valueHref = ($item.attr("target"))?$item.attr("data-href")+"#"+arr[i]+"#target":$item.attr("data-href")+"#"+arr[i];
        var keyText = $item.text().replace(/\s+/g,"");
        obj[keyText] = valueHref;
    }
    return obj;
}
console.log(noRepeatObj());

/*change carousel href & img src & text & target attr*/
function carouselImgReady() {
    var result = noRepeatObj();
    var i = 0;
    for(var key in result){
        if(result.hasOwnProperty(key)){
            //console.log($carouselImg[i]);
            var arr = result[key].split("#");
            $carouselImg[i].href = arr[0];
            $($carouselImg[i]).find('img').attr("src","img/"+arr[1]+".png");
            $($carouselImg[i]).find('span').text(key);
            if(arr[2]){
                $($carouselImg[i]).attr("target","_blank");
            }
            console.log($carouselImg[i]);
            i++;
        }
    }
    // $carouselImg.each(function () {
    //
    // });
}
carouselImgReady();










