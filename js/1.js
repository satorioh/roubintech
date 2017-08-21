var $box = $('#_popBox');
var $boxLeft = $('#_popBox-left');
var $showFrame = $('#_showFrame');
var $iframeMask = $('#_iframeMask');
var $carouselImg = $('.carousel-inner a');
var imgArr = [];

var itemTitle = {
    $itemTitle : $('.itemTitle'),
    glyphiconToggle : function () {
        //console.log(this);
        //var $target = $(e.target);
        var $span = $(this).children("span:nth-of-type(2)");
        var wgroup = $(this).next().attr("id");
        if ($span.hasClass("glyphicon-menu-up")){
            $span.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
            $(this).children('span.glyphicon-menu-down').parent().css("color","#fff");
        }else {
            $span.removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
            $(this).children('span.glyphicon-menu-up').parent().css("color","springgreen");
            loadListItem(wgroup);
            //addTargetIcon();
        }
    },
    init : function () {
        var $span = $(this).children("span:nth-of-type(2)");
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
function addTargetIcon(wgroup) {
    $('#'+wgroup).find("a.list-group-item[target='_blank']").append($('<span class="glyphicon glyphicon-share-alt pull-right"></span>'));
}

//判断是在当前页，或新便签页打开链接
function getDatahref(e) {
    e.preventDefault();
    if ($(this).attr("target")=="_blank"){
        window.open($(this).attr("data-href"));
    }else {
        $showFrame.attr("src",$(this).attr("data-href"));
    }
}

/*get data-href to showFrame*/
$boxLeft.on("click","a:not(.itemTitle)", getDatahref);

// var $dataImg = $boxLeft.find('a[data-img]');
// $dataImg.each(function () {
//     imgArr.push($(this).attr("data-img"));
// });
// console.log(imgArr);

/*generate random string*/
// function noRepeatObj() {
//     var arr = [];
//     var obj = {};
//     while (arr.length < 4){
//     var num = Math.floor(Math.random()*imgArr.length);
//     if (arr.indexOf(imgArr[num]) == -1) {
//         arr.push(imgArr[num]);
//         } else { continue;}
//     }
//     for(var i=0,len=arr.length;i<len;i++){
//         var $item = $boxLeft.find("[data-img="+arr[i]+"]");
//         var valueHref = ($item.attr("target"))?$item.attr("data-href")+"#"+arr[i]+"#target":$item.attr("data-href")+"#"+arr[i];
//         var keyText = $item.text().replace(/\s+/g,"");
//         obj[keyText] = valueHref;
//     }
//     return obj;
// }

/*change carousel href & img src & text & target attr*/
// function carouselImgReady() {
//     var result = noRepeatObj();
//     var i = 0;
//     for(var key in result){
//         if(result.hasOwnProperty(key)){
//             //console.log($carouselImg[i]);
//             var arr = result[key].split("#");
//             $carouselImg[i].href = arr[0];
//             $($carouselImg[i]).attr("data-href",arr[0]);
//             $($carouselImg[i]).find('img').attr("src","img/"+arr[1]+".png");
//             $($carouselImg[i]).find('span').text(key);
//             if(arr[2]){
//                 $($carouselImg[i]).attr("target","_blank");
//             }
//             //console.log($carouselImg[i]);
//             i++;
//         }
//     }
// }
// carouselImgReady();

$carouselImg.on("click", getDatahref);
$('.common_site > a').on("click", getDatahref);

//点击下拉按钮，异步加载list-item
function loadListItem(wgroup) {
    $.ajax({
        url:'backend/list_group_item.php',
        data:{wgroup:wgroup},
        success:function (data,msg) {
            // console.log(msg);
            // console.log(data);
            var html='';
            $.each(data,function (i,group) {
                html+=`<a class="list-group-item" href="#" data-href="${group.datahref}" target="${group.isjump}" ${group.dataimg}>`;
                if(wgroup=="_movie"||wgroup=="_comic"||wgroup=="_download"||wgroup=="_scholar"||wgroup=="_design"||wgroup=="_data"||wgroup=="_funny"){
                    html+=`<i class="${group.icon}"></i>
                        ${group.wname}
                        <div class="rightClickMenu">打开</div>
                    </a>`;
                }else{
                    html+=`<svg class="icon" aria-hidden="true">
                            <use xlink:href="${group.icon}"></use>
                        </svg>
                        ${group.wname}
                        <div class="rightClickMenu">打开</div>
                        </a>`;
                }
                ``;
            });

            $('#'+wgroup).html(html);
            addTargetIcon(wgroup);
            $('[data-toggle="popover"]').popover();
        },
        error:function (data,msg) {
            console.log(msg);
        }
    });
}
//右侧幻灯图异步生成
$(function () {
   $.ajax({
       url:'backend/slide_data_img.php',
       success:function (data,msg) {
           //console.log(msg);
           //console.log(data);
           var html='';
           $.each(data,function (i,carouselImg) {
               html+=`
               <div class="item">
                                    <a href="#" data-href="${carouselImg.datahref}" target="${carouselImg.isjump}">
                                        <img class="img-responsive" src="${carouselImg.img}">
                                        <div class="carousel-caption">
                                            <span>${carouselImg.wname}</span>
                                        </div>
                                    </a>
                                </div>
               `;
           });
           $('#rightCarouselImg').html(html);
           $('#rightCarouselImg div:first-child').addClass("active");

       },
       error:function (data,msg) {
           console.log(msg);
       }
   });
});
$('#rightCarouselImg').on('click','a',getDatahref);

$(window).on('contextmenu',function (e) {
    console.log($(e.target).children('.rightClickMenu'));
    console.log(e.offsetX);
    console.log(e.offsetY);
    console.log(e.clientX);
    console.log(e.clientY);
    var left = e.offsetX + "px";
    var top = e.offsetY + "px";
    $(e.target).children('.rightClickMenu').css({"display":"block","left":left,"top":top});
    return false;
});
$boxLeft.on('mouseleave','.list-group-item',function (e) {
    $('.rightClickMenu').css("display","none");
});

//customer scrollbar import
(function($){
    $(window).on("load",function(){
        $("#_popBox-left").mCustomScrollbar({
            theme: "light-3",
            scrollInertia: 300,
            mouseWheelPixels: 120,
            autoHideScrollbar: true
        });
    });
})(jQuery);











