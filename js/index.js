$(document).ready(function () {
    /* cnt1 스타워즈 효과 */
    var byline = document.getElementById('byline'); // Find the H2
    bylineText = byline.innerHTML; // Get the content of the H2
    bylineArr = bylineText.split(''); // Split content into array
    byline.innerHTML = ''; // Empty current content

    var span; // Create variables to create elements
    var letter;

    for (i = 0; i < bylineArr.length; i++) { // Loop for every letter
        span = document.createElement("span"); // Create a <span> element
        letter = document.createTextNode(bylineArr[i]); // Create the letter
        if (bylineArr[i] == ' ') { // If the letter is a space...
            byline.appendChild(letter); // ...Add the space without a span
        } else {
            span.appendChild(letter); // Add the letter to the span
            byline.appendChild(span); // Add the span to the h2
        }
    }

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

// copy
balapaCop("Windows Hello Animation", "rgba(255,255,255,.8)");

/* cnt4 */

var scrollT;
var moveOffsetT = $('#cnt4').offset().top;						//#cnt3의 수직 전역위치
var horTotal = $('#cnt4 .cntwrap > ul > li').length;			//#cnt3 .cntwrap > ul > li의 전체개수
var moveBoxWid = $('#cnt4 .cntwrap > ul > li').outerWidth();	//#cnt3 .cntwrap > ul > li 하나의 너비
var validate = moveBoxWid * (horTotal - 1);						//가로로 움직일수 있는 유효한 거리	

//문서가 로딩되면 하단에 padding-bottom 선언하고 시작된다
$('#cnt4').css('paddingBottom', validate);

$(window).on('scroll', function () {
  scrollT = $(this).scrollTop();
  //console.log(scrollT);

  //상단영역
  if (scrollT < $('#cnt4').offset().top) {
    $('#cnt4').css({paddingTop: 0, paddingBottom: validate}).children().removeClass('fix');
  }
  //fixed로 고정영역 : 가로 스크롤이동이 되는 영역
  else if (scrollT < $('#cnt5').offset().top) {  //마지막 컨텐츠는 왼쪽으로 사라지면 안된다(- moveBoxWid)
      $('#cnt4').css({paddingTop: 0, paddingBottom: validate}).children().addClass('fix');

      /* https://greensock.com/tweenmax/
      TweenMax.to('html, body', 1, {scrollTop: 200, ease:Power1.easeOut});
        첫 번째 파라미터는 트윈 할 대상(Target)입니다. 
        두 번째 파라미터는 초 단위의 지속시간(duration), 
        세 번째는 속성(Properties)인데, 대상이 기존에 가지고 있던 속성 값과는 다른, 변화 된 값(End values)이어야 합니다. */
      TweenMax.to('#cnt4 .cntwrap > ul', 0.6, {marginLeft: -(scrollT-moveOffsetT), ease:Power1.easeOut});
  }
  //하단영역
  else {
    $('#cnt4').css({paddingTop: validate, paddingBottom: 0}).children().removeClass('fix');
  }

  
});	//scroll


});