$(document).ready(function () {

/* cnt1 스타워즈 효과 */
var byline = document.getElementById('byline');  	// Find the H2
bylineText = byline.innerHTML;										// Get the content of the H2
bylineArr = bylineText.split('');									// Split content into array
byline.innerHTML = '';														// Empty current content

var span;					// Create variables to create elements
var letter;

for(i=0;i<bylineArr.length;i++){									// Loop for every letter
  span = document.createElement("span");					// Create a <span> element
  letter = document.createTextNode(bylineArr[i]);	// Create the letter
  if(bylineArr[i] == ' ') {												// If the letter is a space...
    byline.appendChild(letter);					// ...Add the space without a span
  } else {
		span.appendChild(letter);						// Add the letter to the span
  	byline.appendChild(span); 					// Add the span to the h2
  }
}

/* header */
  var $gnb = $('#gnb');

  //메뉴열기 클릭
  $('.btn_menu').on('click', function () {
    if ($(this).hasClass('active')) { //닫기
      $gnb.stop().animate({left: '50%'}, 300, function () {
        $(this).css({visibility: 'hidden'}).find('ul li.on').removeClass('on').children('ul').stop().slideUp();
      });

      $(this).removeClass('active').find('blind').text('메뉴 열기');
    } else {    //열기
      var scrollMove = scrollT;  //click시 스크롤을 저장
      console.log(scrollMove);

      $(this).addClass('active').find('blind').text('메뉴 닫기');

      //가정처음과 마지막에서 #gnb 외부로 포커스가 나가지 않도록 제어
      var $first = $gnb.find('[data-link="first"]');
      var $last = $gnb.find('[data-link="last"]');

      $gnb.css({visibility: 'visible'}).stop().animate({left: '50%'}, 300, function () {
        $first.focus();   //대상 엘리먼트에 포커스를 강제로 이동
      });

      //첫번째 a 태그에서 shift+tab을 눌러 header의 영역으로 포커스가 이동하지 못하게 제한
      $first.on('keydown', function (e) {
        console.log(e.keyCode);   //tab을 클릭하면 9를 반환
        if ( e.shiftKey && e.keyCode == 9) {
          e.preventDefault();   //포커스 이동을 강제로 제한
          $last.focus();        //처음 포커스로 이동, #gnbWrap을 벗어나지 않고 순환됨
        }
      });
      //마지막 버튼 태그에서 tab을 눌러 container의 영역으로 포커스가 이동하지 못하게 제한
      $last.on('keydown', function (e) {
        if ( !e.shiftKey && e.keyCode == 9) {
          e.preventDefault();
          $('.btn_menu').focus();
        }
      });

    }

    //depth1 a click
    $gnb.find('>ul>li>a').on('click', function () {
      if ($(this).next().size() == 0) {	//depth1 <a>만 있는 경우
        //console.log($(this).next().size());
        location.href=$(this).attr("href");
      }else {								//depth2 <ul>도 있는 경우
        //console.log($(this).next().size());
        $(this).next().stop().slideToggle("fast").parent().toggleClass('on');
      }

      return false;
    });
  });


  /* cnt3 */
  var mainCtr = $("#main-ctr"),
  hello = $(".hello"),
  eyeLeft = $("#eye-left"),
  eyeRight = $("#eye-right"),
  eyeToLeft = $("#eye-to-left"),
  eyeToRight = $("#eye-to-right"),
  wink = $("#wink"),
  smileUp = $("#smile-up"),
  smileDown = $("#smile-down"),
  smile = $("#smile");

var tl = new TimelineMax({
repeat: -1,
repeatDelay: .3,
delay: .3
});

TweenMax.set([mainCtr, hello], {
opacity: 0
});

tl
.to(mainCtr, .3, {
  opacity: 1
})
.to(smileDown, .3, {
  morphSVG: "#smile-up"
})
.to(smile, .3, {
  rotation: -30,
  transformOrigin: "center center",
  ease: Circ.ease
})
.to(smile, .9, {
  rotation: 900,
  transformOrigin: "center center",
  ease: Circ.easeInOut
})
.to(eyeLeft, .3, {
  morphSVG: "#eye-to-left",
  ease: Power2.ease
}, "-=.3")
.to(eyeRight, .3, {
  morphSVG: "#eye-to-right",
  ease: Power2.ease
}, "-=.3")
.to(eyeRight, .1, {
  scaleY: .25,
  transformOrigin: "center center"
})
.to(eyeRight, .1, {
  scaleY: 1
})
.to(hello, .3, {
  opacity: 1
}, "-=.3")
.to(mainCtr, .6, {
  delay: 1,
  opacity: 0
})


/* cnt4 */

var scrollT;
var moveOffsetT = $('#cnt4').offset().top;						//#cnt4의 수직 전역위치
var horTotal = $('#cnt4 .cntwrap > ul > li').length;			//#cnt4-2 .cntwrap > ul > li의 전체개수
var moveBoxWid = $('#cnt4 .cntwrap > ul > li').outerWidth();	//#cnt4-2 .cntwrap > ul > li 하나의 너비
var validate = moveBoxWid * (horTotal - 1);						//가로로 움직일수 있는 유효한 거리
console.log(moveOffsetT, horTotal, moveBoxWid, validate);	

//문서가 로딩되면 하단에 padding-bottom 선언하고 시작된다
$('#cnt4').css('paddingBottom', 'validate');

$(window).on('scroll', function () {
scrollT = $(this).scrollTop();
//console.log(scrollT);

//상단영역
if (scrollT < $('#cnt4').offset().top) {
  $('#cnt4').css({paddingTop: 0, paddingBottom: validate}).find('.cntwrap').removeClass('fix');
}
//fixed로 고정영역 : 가로 스크롤이동이 되는 영역
else if (scrollT < $('#cnt5').offset().top) {  //마지막 컨텐츠는 왼쪽으로 사라지면 안된다(- moveBoxWid)
    $('#cnt4').css({paddingTop: 0, paddingBottom: validate}).find('.cntwrap').addClass('fix');

    /* https://greensock.com/tweenmax/
    TweenMax.to('html, body', 1, {scrollTop: 200, ease:Power1.easeOut});
      첫 번째 파라미터는 트윈 할 대상(Target)입니다. 
      두 번째 파라미터는 초 단위의 지속시간(duration), 
      세 번째는 속성(Properties)인데, 대상이 기존에 가지고 있던 속성 값과는 다른, 변화 된 값(End values)이어야 합니다. */
    TweenMax.to('#cnt4 .cntwrap > ul', 0.6, {marginLeft: -(scrollT-moveOffsetT), ease:Power1.easeOut});
}
//하단영역
else {
  $('#cnt4').css({paddingTop: validate, paddingBottom: 0}).find('.cntwrap').removeClass('fix');
}


});	//scroll


/* #cnt5 bigstudio bs-big bs-small smallstudio ss-title ss-button*/

$('.bigstudio .bs-big button').on('click', function(){
  var index = $(this).parent().index();
  console.log(index);
  $('.bs-small li').eq(index).addClass('f').siblings().removeClass('f');
  $('.smallstudio .ss-title li').eq(index).slideDown().siblings().slideUp();
  $('.explain li').eq(index).slideDown().siblings().slideUp();
});
$('.ss-button li button').on('click', function(){
  var index = $(this).parent().index();
  console.log(index);
  $('.bs-small li').eq(index).addClass('f').siblings().removeClass('f');
  $('.smallstudio .ss-title li').eq(index).slideDown().siblings().slideUp();
  $('.explain li').eq(index).slideDown().siblings().slideUp();
});


/* cnt6 */
$('#modal1 a').on('click', function (e) {
  e.preventDefault(); //a 기본 기능 제한
  var tgNum = $(this).index()-1;
  console.log(tgNum);
  $('#modal1 img').eq(tgNum).css('display', 'block').siblings('img').css('display', 'none');
});
$('#modal2 a').eq(0).on('click', function (e) {
  e.preventDefault(); //a 기본 기능 제한
  $('#modal2 video').eq(0).css('display', 'block').siblings('img').css('display', 'none');
});
$('#modal2 a').eq(1).on('click', function (e) {
  e.preventDefault(); //a 기본 기능 제한
  $('#modal2 img').eq(0).css('display', 'block').siblings('img, video').css('display', 'none');
});
$('#modal2 a').eq(2).on('click', function (e) {
  e.preventDefault(); //a 기본 기능 제한
  $('#modal2 img').eq(1).css('display', 'block').siblings('img, video').css('display', 'none');
});
$('#modal3 a').eq(0).on('click', function (e) {
  e.preventDefault(); //a 기본 기능 제한
  $('#modal3 video').eq(0).css('display', 'block').siblings('img').css('display', 'none');
});
$('#modal3 a').eq(1).on('click', function (e) {
  e.preventDefault(); //a 기본 기능 제한
  $('#modal3 img').eq(0).css('display', 'block').siblings('img, video').css('display', 'none');
});
$('#modal3 a').eq(2).on('click', function (e) {
  e.preventDefault(); //a 기본 기능 제한
  $('#modal3 img').eq(1).css('display', 'block').siblings('img, video').css('display', 'none');
});

});

$(document).ready(function() {
  /* === 열기 버튼 클릭시
  1) 스크린리더에서는 열려진 모달 말고는 접근하지 못하도록 제어(보조기술이 미구현 되어서 추가해 줌)
      aria-hidden="true" inert(비활성, 불활성)
  2) #dim 동적 생성
  3) resize 이벤트로 열려질 모달의 위치 제어
  4) #dim, 모달 컨텐츠를 보여지게 처리, 첫번째 링크에 포커스 강제 이동

  5) 접근성을 위해 추가 : 닫기 버튼을 누르기 전까지 포커스는 모달 내부에 존재해야 함
  첫번째 링크에서 shift+tab을 누르면 가장 마지막으로 포커스 강제이동
  마지막 링크에서 shift(X)+tab을 누르면 가장 처음으로 포커스 강제이동 */
  $('.open_btn').on('click', function () {
      var $openBtn = $(this);   //모달 닫기를 클릭시 열어준 버튼에 포커스 강제 이동
      var $mdCnt = $( $(this).data('href') ); //$()로 감싸서 선택자로 변경
      var $closeBtn = $mdCnt.find('.close_btn'); //열려진 모달 내부의 닫기버튼
      var $first = $mdCnt.find('[data-link="first"]'); //열려진 모달 내부의 첫번째 포커스가 갈 대상
      var $last = $mdCnt.find('[data-link="last"]'); //열려진 모달 내부의 마지막 포커스가 갈 대상
      console.log($mdCnt, typeof $mdCnt);
      var timer = 0; //누적되는 resize 이벤트를 제어 => 성능 향상

      //1) 스크린리더에서는 열려진 모달 말고는 접근하지 못하도록 제어
      $mdCnt.siblings().attr({'aria-hidden': true, inert: ''});

      //2) #dim 동적 생성
      $mdCnt.before('<div id="dim"></div>');
      var $dim = $('#dim');

      //3) resize 이벤트로 열려질 모달의 위치 제어
      $(window).on('resize', function () {
          clearTimeout(timer);

          timer = setTimeout(function () {
              //문서가운데 위치(가로) : (윈도창의 너비-열려질모달의가로) / 2
              var xpos = ($(this).width() - $mdCnt.outerWidth()) / 2;
              var ypos = ($(this).height() - $mdCnt.outerHeight()) / 2;
              console.log(xpos, ypos);
              $mdCnt.css({left: xpos, top: ypos});
          }, 50);
      });
      $(window).trigger('resize');

      //4) #dim, 모달 컨텐츠를 보여지게 처리, 첫번째 링크에 포커스 강제 이동
      $dim.stop().fadeIn().next().css('visibility', 'visible');
      $first.focus();

      //5-1) 접근성 추가 : 첫번째 링크에서 shift+tab을 누르면 가장 마지막으로 포커스 강제이동
      $first.on('keydown', function (e) {
          console.log( e.keyCode ); //tab => 9
          if (e.shiftKey && e.keyCode == 9) {
              e.preventDefault();
              $last.focus();
          }
      });

      //5-2) 접근성 추가 : 마지막 링크에서 shift(X)+tab을 누르면 가장 처음으로 포커스 강제이동
      $last.on('keydown', function (e) {
          console.log( e.keyCode ); //tab => 9
          if ( !e.shiftKey && e.keyCode == 9 ) {
              e.preventDefault();
              $first.focus();
          }
      });

      // 닫기버튼 클릭시
      $closeBtn.on('click',function () {
          /* 1) $dim 투명도 0으로 사라지기
          (완료함수로 remove()로 제거), 모달컨텐츠 숨기기(visibility) */
          $dim.stop().fadeOut('fast',function () {
              $(this).remove();
          });
          /* 2) 모달상세컨텐츠의 나머지 형제들을 스크린리더에서 
          접근할수 있도록 되돌리기(제거 - aria-hidden, inert) */
          $mdCnt.css('visibility','hidden').siblings().removeAttr('aria-hidden inert');
          // 3) 열기 버튼으로 포커스 강제 이동
          $openBtn.focus();
      });
      // #dim을 클릭해도 모달창 닫히기
      $dim.on('click', function() {
          $closeBtn.click();
      });

      // esc 키보드를 클릭하면 모달 닫기
      $(window).on('keydown',function(e) {
          console.log(e.keyCode); //27
          if (e.keyCode==27) $closeBtn.click();
      });
  });
});

