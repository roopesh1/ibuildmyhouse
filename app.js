let sections = JSON.parse(localStorage.getItem('sections') || '[]');
let totalBudget = parseFloat(localStorage.getItem('totalBudget') || '0');
let totalExpenses = parseFloat(localStorage.getItem('totalExpenses') || '0');

function updateSummary() {
  document.getElementById('total-budget').textContent = totalBudget;
  document.getElementById('total-expenses').textContent = totalExpenses;
  document.getElementById('remaining-budget').textContent = (totalBudget - totalExpenses).toFixed(2);
}

function saveData() {
  localStorage.setItem('sections', JSON.stringify(sections));
  localStorage.setItem('totalBudget', totalBudget.toString());
  localStorage.setItem('totalExpenses', totalExpenses.toString());
}

function addSection() {
  const nameInput = document.getElementById('new-section-name');
  const sectionName = nameInput.value.trim();
  if (!sectionName) return;
  const newSection = {
    id: Date.now(),
    name: sectionName,
    budget: 0,
    expenses: 0,
    items: []
  };
  sections.push(newSection);
  nameInput.value = '';
  renderSections();
  saveData();
}

function renderSections() {
  const container = document.getElementById('sections-container');
  container.innerHTML = '';
  sections.forEach((section) => {
    const div = document.createElement('div');
    div.className = 'section-box';
    div.innerHTML = \`
      <div class="section-title">\${section.name}</div>
      <p>Budget: ₹\${section.budget}</p>
      <p>Expenses: ₹\${section.expenses}</p>
    \`;
    container.appendChild(div);
  });
}

updateSummary();
renderSections();