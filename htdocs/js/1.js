/*popbox up & down function*/
var $box = $('#_popBox');
var $showFrame = $('#_showFrame');
var $itemTitle = $('.itemTitle');
var popBox = {
    //boxBottom:0,
    //boxLeft:0,
    boxHeight:getComputedStyle($box[0]).height,
    init:function () {
        $box.css("marginBottom","-"+this.boxHeight);
    },
    down:function () {
        $box.animate({marginBottom:"-"+this.boxHeight,opacity:"0"},300,"swing");
    },
    up:function () {
        $box.animate({marginBottom:"0",opacity:"1"},300,"swing");
    }
};
popBox.init();
$('#_startButton').click(function () {
   if (parseInt($box.css("marginBottom")) < 0) {
       popBox.up();
   }else {
       popBox.down();
   }
});

/*glyphicon-menu-down icon toggle*/
$itemTitle.on("click",function (e) {
    var $span = $(this).children("span:last");
    $span.hasClass("glyphicon-menu-down") ? $span.removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up") : $span.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
});

/*get data-href to showFrame*/
$box.on("click","a:not(.itemTitle)",function (e) {
    e.preventDefault();
    var $target = $(e.target);
    $showFrame.attr("src",$target.attr("data-href"));
})

