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

//converter

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

// const converter = (data) => {
//   somInput.oninput = () => {
//     usdInput.value = (somInput.value / data.usd).toFixed(2);
//     eurInput.value = (somInput.value / data.eur).toFixed(2);
//   };

//   usdInput.oninput = () => {
//     somInput.value = (usdInput.value * data.usd).toFixed(2);
//     eurInput.value = ((usdInput.value * data.usd) / data.eur).toFixed(2);
//   };

//   eurInput.oninput = () => {
//     somInput.value = (eurInput.value * data.eur).toFixed(2);
//     usdInput.value = ((eurInput.value * data.eur) / data.usd).toFixed(2);
//   };

// };

const converter = (data) => {
  somInput.oninput = () => {
    if (somInput.value === "") {
      usdInput.value = "";
      eurInput.value = "";
      return;
    }
    usdInput.value = (somInput.value / data.usd).toFixed(2);
    eurInput.value = (somInput.value / data.eur).toFixed(2);
  };

  usdInput.oninput = () => {
    if (usdInput.value === "") {
      somInput.value = "";
      eurInput.value = "";
      return;
    }
    somInput.value = (usdInput.value * data.usd).toFixed(2);
    eurInput.value = ((usdInput.value * data.usd) / data.eur).toFixed(2);
  };

  eurInput.oninput = () => {
    if (eurInput.value === "") {
      somInput.value = "";
      usdInput.value = "";
      return;
    }
    somInput.value = (eurInput.value * data.eur).toFixed(2);
    usdInput.value = ((eurInput.value * data.eur) / data.usd).toFixed(2);
  };
};

const getCurrency = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../data/converter.json");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.response);
          resolve(data);
        } catch (error) {
          reject(new Error("Failed to parse converter data"));
        }
      } else {
        reject(new Error("Failed to get converter data"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

getCurrency()
  .then((data) => {
    converter(data);
  })
  .catch((error) => {
    console.log(error.message);
  });

// const promise = new Promise(() => {
//   const message = "ok ok ok ";
//   console.log(message);
//   resolve(data);
//   reject();
// });
