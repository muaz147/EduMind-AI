const filterButtons = document.querySelectorAll(".filter-button");
const courseCards = document.querySelectorAll(".catalog-card");
const courseSearch = document.querySelector("#course-search");
const emptyState = document.querySelector("#empty-state");

function updateCourses() {
  const activeFilter = document.querySelector(".filter-button.active").dataset
    .filter;
  const searchTerm = courseSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const matchesFilter =
      activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.title.includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateCourses();
  });
});

courseSearch.addEventListener("input", updateCourses);
