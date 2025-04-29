
let sections = [];

function addSection() {
  const name = prompt("Enter section name (e.g., Foundation, Walls):");
  if (name) {
    sections.push({ name: name, expenses: [] });
    renderSections();
  }
}

function renderSections() {
  const list = document.getElementById("sectionList");
  list.innerHTML = "";
  sections.forEach((section, index) => {
    const li = document.createElement("li");
    li.textContent = section.name;
    list.appendChild(li);
  });
}
