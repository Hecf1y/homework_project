// TAB SLIDER

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabContentItems = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");
let currentIndex = 0;

const hideTabContent = () => {
  tabContentBlocks.forEach((block) => {
    block.style.display = "none";
  });
  tabContentItems.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (i = 0) => {
  tabContentBlocks[i].style.display = "block";
  tabContentItems[i].classList.add("tab_content_item_active");
  currentIndex = i;
};
hideTabContent();
showTabContent();

tabsParent.onclick = (e) => {
  if (e.target.classList.contains("tab_content_item")) {
    tabContentItems.forEach((tab, tabIndex) => {
      if (tab === e.target) {
        hideTabContent();
        showTabContent(tabIndex);
      }
    });
  }
};

setInterval(() => {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= tabContentItems.length) {
    nextIndex = 0;
  }
  hideTabContent();
  showTabContent(nextIndex);
}, 3_000);

console.log(tabContentBlocks);
console.log(currentIndex);
