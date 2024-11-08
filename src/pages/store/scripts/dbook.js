var frmPath = location.pathname;
var frmSearch = location.search;
var frmPathSearch = location.pathname + location.search;

/* 상단 고정 */
function showHeader() {
	var headH = $("#header").height();
	$('#header').css({'min-height':headH});
	if ($(window).scrollTop() > headH) {
		$("#header").addClass("fixed");
	} else {
		$("#header").removeClass("fixed");
	}
}
$(document).ready(function(){

	/* 상단 고정 */
	$(window).scroll(showHeader);
	showHeader();

    /* 상단으로 */
	$(".top-btn").click(function(e){
		$("html, body").animate({ scrollTop : 0 }, 600);
		e.preventDefault();
	});
	/* 하단으로 */
	$(".down-btn").click(function(e){
		var position = $("#footer").offset();
		$("html, body").animate({ scrollTop: position.top }, 600);		
		e.preventDefault();
	});

	/* 상품 목록 */
	if ( $('.body-goods-list, .body-goods-search').length )	{

		// 상품 정렬
		$('.sort-select em').click(function(){			
			$(this).toggleClass('on');
			$(this).next().slideToggle(200);
		});
		if(frmSearch.indexOf('sort=') > -1){
			setTimeout(function(){
				$('.sort-select em').text($('.sort-select label.on').text());
			}, 1);

		}
	}
});






/***********top_bn.js */
$(document).ready(function(){
	/* 상단 배너 */
	var topBnH = $(".top-bn").find("img").height();
	function topBanner(){
		if ($("#topLine").css("height")=="0px") {
			$("#topLine").stop(true,true).animate({height:topBnH});
		}
	}
	topBanner();

	$("#topLine .top-btn-close").click(function() {
		$("#topLine").stop(true,true).animate({height:0});
	});
});