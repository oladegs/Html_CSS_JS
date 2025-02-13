// Function to create the table
function createTable() {
  // Get user input for rows and columns
  const rows = document.getElementById("rows").value;
  const columns = document.getElementById("columns").value;

  // Get the container to display the table
  const tableContainer = document.getElementById("tableContainer");

  // Clear previous table if it exists
  tableContainer.innerHTML = "";

  // Create the table element
  const table = document.createElement("table");

  // Create rows and columns
  for (let i = 1; i <= rows; i++) {
    const row = document.createElement("tr");

    for (let j = 1; j <= columns; j++) {
      const cell = document.createElement("td");
      cell.textContent = `Row ${i}, Col ${j}`;
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  // Add the table to the page
  tableContainer.appendChild(table);
}
