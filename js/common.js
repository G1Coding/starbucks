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


const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();

