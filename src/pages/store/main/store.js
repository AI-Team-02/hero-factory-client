import './store.css';

/* 메인 애니메이션 */
function animateM($item){
	var scrollTop = $(window).scrollTop() + $(window).height();
	if ($item.length){
		if (scrollTop > $item.offset().top) {
			$item.addClass('motion');
		}
	}
}
function showDiv(){
	var mainDivEl = $('.main-wrap > div');
	for (var i = 0; i < mainDivEl.length; i++) {
		animateM( mainDivEl.eq(i) );
	}
}
$(window).scroll(function () {
	showDiv(); 
});
$(document).ready(function(){

	/* 메인 애니메이션 */
	setTimeout(function(){
		showDiv(); 
	}, 100);

	/* 메인 비주얼 */
	$(".main-visual").each(function() {
		$(this).css("opacity",1);

		$(".main-visual .slider-wrap > div").each(function(i) {
			var title = $(".slider-nav > li");
			$(".main-visual .slider-wrap > div").eq(i).append(title.eq(i).html());
		});
	});

	/* 퀵 메뉴 */
	$('.main-quick-menu > ul > li').each(function(i){
		var num = 0;
		for (j=0;j<=i;j++) {
			num += 2;
		}
		$('.main-quick-menu > ul > li').eq(i).addClass('ani'+num);
	});

	/* 인기키워드 스크롤 */
	$('.prd-tab-slide2 .item_hl_tab_type .goods_tab_cont .goods_tab_box').each(function() { 
		$(this).find('> ul').addClass('swiper-wrapper');
		$(this).find('> ul > li').addClass('swiper-slide');
		$(this).append('<div class="swiper-scrollbar"></div>');

		var swiper = new Swiper($(this), {
		  spaceBetween: 30,		
		  slidesPerView: 3,
		  scrollbar: {
		    el: $(this).find('.swiper-scrollbar'),
		    hide: false,
		    draggable: true,
		  },
		  observer: true,
		  observeParents: true,
		});		
	});	
});






/* 인키 키워드 */

$(function() {
    var count = $('#rank-list li').length;
    var height = $('#rank-list li').height();

    function step(index) {
        $('#rank-list ol').delay(2000).animate({
            top: -height * index,
        }, 500, function() {
            step((index + 1) % count);
        });
    }

    step(1);
});






/************************* 섭********************** */

