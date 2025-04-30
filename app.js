let sections = JSON.parse(localStorage.getItem("sections") || "[]");
let totalBudget = parseFloat(localStorage.getItem("totalBudget") || "0");

document.addEventListener("DOMContentLoaded", function () {
  const totalBudgetInput = document.getElementById("totalBudget");
  const totalExpensesEl = document.getElementById("totalExpenses");
  const remainingBudgetEl = document.getElementById("remainingBudget");
  const sectionNameInput = document.getElementById("sectionName");
  const sectionBudgetInput = document.getElementById("sectionBudget");
  const addSectionBtn = document.getElementById("addSectionBtn");
  const sectionsContainer = document.getElementById("sectionsContainer");

  totalBudgetInput.value = totalBudget;

  function saveData() {
    localStorage.setItem("sections", JSON.stringify(sections));
    localStorage.setItem("totalBudget", totalBudgetInput.value);
  }

  function updateSummary() {
    totalBudget = parseFloat(totalBudgetInput.value || "0");
    let totalExpenses = sections.reduce((sum, s) => sum + s.expenses, 0);
    totalExpensesEl.textContent = totalExpenses.toFixed(2);
    remainingBudgetEl.textContent = (totalBudget - totalExpenses).toFixed(2);
  }

  function renderSections() {
    sectionsContainer.innerHTML = "";
    sections.forEach((section, index) => {
      const div = document.createElement("div");
      div.className = "section-card";
      div.innerHTML = \`
        <h3>\${section.name}</h3>
        <p>Budget: ₹\${section.budget}</p>
        <p>Expenses: ₹\${section.expenses}</p>
        <button onclick="addExpense(\${index})">Add Expense</button>
      \`;
      sectionsContainer.appendChild(div);
    });
  }

  window.addExpense = function(index) {
    const amount = parseFloat(prompt("Enter amount:"));
    if (isNaN(amount)) return;
    const note = prompt("Enter note:");
    sections[index].expenses += amount;
    sections[index].items.push({ amount, note });
    saveData();
    renderSections();
    updateSummary();
  };

  addSectionBtn.addEventListener("click", () => {
    const name = sectionNameInput.value.trim();
    const budget = parseFloat(sectionBudgetInput.value);
    if (!name || isNaN(budget)) return alert("Enter valid section details.");
    const newSection = {
      id: Date.now(),
      name,
      budget,
      expenses: 0,
      items: []
    };
    sections.push(newSection);
    sectionNameInput.value = "";
    sectionBudgetInput.value = "";
    saveData();
    renderSections();
    updateSummary();
  });

  totalBudgetInput.addEventListener("input", () => {
    saveData();
    updateSummary();
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  renderSections();
  updateSummary();
});