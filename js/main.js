const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
  searchInputEl.focus();
});

// 입력 창이 focus 되면 통합 검색 보이게
searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused");
  searchInputEl.setAttribute("placeholder", "통합 검색");
});

// 입력 창이 focus 해제되면
searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});

// 스크롤 내리면 badge 없어지게
const bedgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector("#to-top");

// window.addEventListener('scroll', function () {
//     console.log("scroll!!!!");
// })

window.addEventListener(
  "scroll",
  _.throttle(function () {
    console.log("Scroll!");
    // console.log(window.scrollY)
    if (window.scrollY > 500) {
      // 배지 숨기기 // bedgeEl.style.display = 'none';
      gsap.to(bedgeEl, 0.6, {
        opacity: 0,
        display: "none",
      }); //요소, 지속시간(s), 옵션
      // ------ 스크롤 버튼 보이기!
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      // 배지 보이기 // bedgeEl.style.display = 'block';
      gsap.to(bedgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      // ------ 스크롤 버튼 숨기기!
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
); //0.3초 단위로 부하를 줘서 함수가 계속 실행하는 것을 방지

toTopEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, // 하나하나씩 순차적으로 보여주기 위해
    opacity: 1,
  }); //요소, 지속시간(s), 옵션
});

// 공지사항 부분 - Swiper
//Swiper 생성자 = Swiper(요소, 옵션)
new Swiper(".notice-line .swiper-container", {
  direction: "vertical", // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
});

new Swiper(".promotion .swiper-container", {
  direction: "horizontal", // 기본값(그냥 명시해봤음)
  slidesPerView: 3, // 한 번에 3개의 이미지 보여주겠다.
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 slide가 가운데로 오도록
  loop: true, // 반복 재생 여부
  autoplay: {
    delay: 5000, //5초에 한 번씩 이동하게
  },

  pagination: {
    el: ".promotion .swiper-pagination", //페이지 번호 요소 선택자
    clickable: true, //사용자의 페이지 번호 요소 제어 가능 여부
  },

  navigation: {
    prevEl: ".promotion .swiper-prev", //이전 요소 보는 버튼
    nextEl: ".promotion .swiper-next", //다음 요소 보는 버튼
  },
});

// AwARDS
new Swiper(".awards .swiper-container", {
  direction: "horizontal",
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5, // 한 번에 보여줄 개수
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});

// 슬라이드 영역 토글 (스타벅스 프로모션)
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false; //프로모션 부분 숨기기
/* 토글 버튼(true-false-true-false 반복하는 기능) */
promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion; //true
  if (isHidePromotion) {
    //true이면 -> 숨김 처리!
    promotionEl.classList.add("hide");
  } else {
    //false이면 -> 보임 처리!
    promotionEl.classList.remove("hide");
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// 둥둥 떠다니는 애니메이션
function floatingObject(selector, delay, size) {
  gsap.to(
    //요소, 시간(초). 옵션
    selector, //요소(선택자)
    random(1.5, 2.5), //시간(애니메이션 동작 시간)
    {
      //옵션
      y: size,
      repeat: -1, //무한 반복
      yoyo: true, //역재생 (위->아래 // 아래->위로 가는 부분)
      ease: Power1.easeInout, //자연스럽게(구글링해봐 gsap ease)
      delay: random(0, delay),
    }
  );
}
floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

// ScrollMagic
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // 뷰포트의 0.8 지점에 걸리면 trigger가 실행
  })
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller()); // 특정 섹션들이 화면에 보이는 지를 감시
});

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();
