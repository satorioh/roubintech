/*popbox up & down function*/
var $box = $('#_popBox');
var $showFrame = $('#_showFrame');
var $itemTitle = $('.itemTitle');
var jTitle = document.getElementsByClassName('itemTitle');
//console.log(Array.isArray(jTitle));

var popBox = {
    boxHeight : getComputedStyle($box[0]).height,
    boxWidth : getComputedStyle($box[0]).width,
    init : function () {
        console.log(this.boxHeight);
        console.log(this.boxWidth);
        $box.css("marginBottom","-"+this.boxHeight);
    },
    down : function () {
        $box.animate({marginBottom:"-"+this.boxHeight,opacity:"0"},300,"swing");
        $itemTitle.next().removeClass('in');
        glyphiconToggle.bind(jTitle);

    },
    up : function () {
        $box.animate({marginBottom:"35px",opacity:"1"},300,"swing");
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

$('#_showFrame').on("click",function (e) {
   console.log(e.clientX);
   console.log(e.clientY);
});

// var itemTitle = {
//     $itemTitle : $('.itemTitle'),
//
// };
function glyphiconToggle(e) {
    var $span = $(this).children("span:last");
    if ($span.hasClass("glyphicon-menu-down")){
        $span.removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        $(this).css("color","springgreen");
    }else {
        $span.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
        $(this).css("color","#fff");
    }
}
/*glyphicon-menu-down icon toggle*/
$itemTitle.on("click", glyphiconToggle);

// add jump out icon for link that has target attr
$box.find("a.list-group-item[target]").append($('<span class="glyphicon glyphicon-share-alt pull-right"></span>'));

/*get data-href to showFrame*/
$box.on("click","a:not(.itemTitle)",function (e) {
    e.preventDefault();
    var $target = $(e.target);
    if ($target.attr("target")){
        window.open($target.attr("data-href"));
    }else {
        $showFrame.attr("src",$target.attr("data-href"));
    }
});





