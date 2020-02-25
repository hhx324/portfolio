$(document).ready(function() {
    var $acco = $('.accordion');

    //1) 로딩시 초기 설정
    //시각적 제어 : 첫번째 .tit.on 클래스명 추가 => 바로 뒤 패널을 보여지게 처리 => 포커스가 이동할수 있도록 tabIndex : 0
    $acco.find('.tit:first-of-type').addClass('on').next().show();

    //접근성을 위한 의미적 제어 : 나자신 버튼에게는 aria-expanded: true / aria-disabled: true, 나머지 버튼은 aria-expanded: false
    $acco.find('.tit:first-of-type .accoheader').attr({'aria-expanded': true, 'aria-disabled': true}).parent().siblings('.tit').children().attr({'aria-expanded': false});

    //2) 아코디언헤더(버튼)을 누르는 동안 keydown = 키보드 제어
    //방향키 : 상단38, 하단40, 홈36, end35, enter13와 space bar32
    $acco.find('.accoheader').on('keydown', function (e) {
        var key = e.keyCode;
        console.log(key);
        switch (key) {
            case 38: //상단 방향키
                if ($(this).hasClass('first')) $(this).closest('.accordion').find('.tit .last').focus();
                else $(this).parent().prev().prev().children().focus();
                break;
            case 40: //하단 방향키
                if ($(this).hasClass('last')) $(this).closest('.accordion').find('.tit .first').focus();
                else $(this).parent().next().next().children().focus();
                break;
            case 36:    //home키
                e.preventDefault();
                $(this).siblings('.accordion').find('.tit .first').focus();
                break;
            case 35:    //end키
                e.preventDefault();
                $(this).siblings('.accordion').find('.tit .last').focus();
                break;
            case 13:    //enter키
            case 32:    //space bar키
                $(this).trigger('click');
                break;
        }
    });

    //3) 아코디언헤더(버튼)을 click =마우스 제어 : 열려진 패널은 다시 닫기지 않는다 => 닫긴 패널만 제어
    $acco.find('.accoheader').on('click', function () {
        var display = $(this).parent().next().css('display');
        console.log(display);

        if ( display == 'none' ) {
            //아코디언헤더(버튼) : 나자신의 aria추가 => 부모에 .on추가 => 나머지 .tit형제들 .on 제거 => 그 하위 자식의 aria-expanded: false
            $(this).attr({'aria-expanded': true, 'aria-disabled': true}).parent().addClass('on').siblings('.tit.on').removeClass('on').children().attr({'aria-expanded': false}).removeAttr('aria-disabled');

            //아코디언패널 : 나자신 바로뒤 패널은 열리고 나머지 패널은 닫기기 => tabIndex 제어
            $(this).parent().next().stop().slideDown().attr('tabIndex', 0).siblings('.accopanel').stop().slideUp().attr('tabIndex', -1);
        }
    });
});