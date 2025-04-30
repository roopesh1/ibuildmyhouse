let sections = JSON.parse(localStorage.getItem("sections") || "[]");
let totalBudget = parseFloat(localStorage.getItem("totalBudget") || "0");

document.getElementById("totalBudget").value = totalBudget;

function saveData() {
  localStorage.setItem("sections", JSON.stringify(sections));
  localStorage.setItem("totalBudget", document.getElementById("totalBudget").value);
}

function updateSummary() {
  totalBudget = parseFloat(document.getElementById("totalBudget").value || "0");
  let totalExpenses = sections.reduce((sum, s) => sum + s.expenses, 0);
  document.getElementById("totalExpenses").textContent = totalExpenses;
  document.getElementById("remainingBudget").textContent = (totalBudget - totalExpenses).toFixed(2);
}

function addSection() {
  const name = document.getElementById("sectionName").value.trim();
  const budget = parseFloat(document.getElementById("sectionBudget").value);
  if (!name || isNaN(budget)) return alert("Enter valid section details.");
  const newSection = {
    id: Date.now(),
    name,
    budget,
    expenses: 0,
    items: []
  };
  sections.push(newSection);
  saveData();
  renderSections();
  updateSummary();
}

function renderSections() {
  const container = document.getElementById("sectionsContainer");
  container.innerHTML = "";
  sections.forEach((section, index) => {
    const div = document.createElement("div");
    div.className = "section-card";
    div.innerHTML = \`
      <h3>\${section.name}</h3>
      <p>Budget: ₹\${section.budget}</p>
      <p>Expenses: ₹\${section.expenses}</p>
      <button onclick="addExpense(\${index})">Add Expense</button>
    \`;
    container.appendChild(div);
  });
}

function addExpense(index) {
  const amount = parseFloat(prompt("Enter amount:"));
  if (isNaN(amount)) return;
  const note = prompt("Enter note:");
  sections[index].expenses += amount;
  sections[index].items.push({ amount, note });
  saveData();
  renderSections();
  updateSummary();
}

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

document.getElementById("totalBudget").oninput = () => {
  saveData();
  updateSummary();
};

renderSections();
updateSummary();