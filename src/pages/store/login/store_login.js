// 캡슬락 안내
function checkCapsLock(event) {
    if (event.getModifierState("CapsLock")) {
        document.getElementById("message").innerText = "Caps Lock이 켜져 있습니다."
    } else {
        document.getElementById("message").innerText = ""
    }
}

// 북마크 추가
$(document).ready(function() {
$('#favorite').on('click', function(e) {
    var bookmarkURL = window.location.href;
    var bookmarkTitle = document.title;
    var triggerDefault = false;

    if (window.sidebar && window.sidebar.addPanel) {
        // Firefox version < 23
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
    } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
        // Firefox version >= 23 and Opera Hotlist
        var $this = $(this);
        $this.attr('href', bookmarkURL);
        $this.attr('title', bookmarkTitle);
        $this.attr('rel', 'sidebar');
        $this.off(e);
        triggerDefault = true;
    } else if (window.external && ('AddFavorite' in window.external)) {
        // IE Favorite
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
        // WebKit - Safari/Chrome
        alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
    }

    return triggerDefault;
});
});




/*  검색창 검색 시 엔터 */
$(function() {
    $("#inp")
            .keypress(
                    function(e) {
                        //검색어 입력 후 엔터키 입력하면 조회버튼 클릭
                        if (e.keyCode
                                && e.keyCode == 13) {
                            $("#search_btn")
                                    .trigger(
                                            "click");
                            return false;
                        }
                        //엔터키 막기
                        if (e.keyCode
                                && e.keyCode == 13) {
                            e
                                    .preventDefault();
                        }
                    });
    $("#search_btn").click(function() {
        alert("검색 결과가 없습니다.");
    });
});



/* 처음 화면 *//* 탭 2 숨기기 */
$(function tab() {
    $("#member-tab01").css("display", "block");
    $("#member-tab02").css("display", "none");
});

/************** 탭2 클릭 했을 때*/
$(function tab() {
    $("a.tab2").click(function() {
        $("a.tab2").addClass("active");
        $("a.tab1").removeClass("active");
        $("#member-tab02").css("display", "block");
        $("#member-tab01").css("display", "none");

    });
});
/************** 탭1 클릭 했을 때*/
$(function tab() {
    $("a.tab1").click(function() {
        $("a.tab1").addClass("active");
        $("a.tab2").removeClass("active");
        $("#member-tab02").css("display", "none");
        $("#member-tab01").css("display", "block");

    });
});