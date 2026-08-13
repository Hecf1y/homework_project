//MODAL
const modal = document.querySelector(".modal");
const modalOpenBtn = document.querySelector("#btn-get");
const modalCloseBtn = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

// modalOpenBtn.onclick = () => openModal();

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

modalOpenBtn.onclick = openModal;
modalCloseBtn.onclick = closeModal;
// modal.onclick = (e) => {

//   if (e.target === modal) {
//     closeModal();
//   }
// };
modal.onclick = (e) => e.target.classList.contains("modal") && closeModal();

const handleScrollEnd = () => {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 5;

  if (scrolledToBottom) {
    openModal();
    window.removeEventListener("scroll", handleScrollEnd);
  }
};

window.addEventListener("scroll", handleScrollEnd);

setTimeout(openModal, 10_000);
