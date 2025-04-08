// Fetch data from the JSON file and populate the table
document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('table-body');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.Title}</td>
                    <td>${item.StartDate}</td>
                    <td>${item.Fees}</td>
                    <td>${item.Notes}</td>
                `;
                tableBody.appendChild(row);
            });
        });

    // Sorting functionality
    const table = document.getElementById('sortable-table');
    if (!table) {
        console.error('Table with ID "sortable-table" not found.');
        return;
    }
    const headers = table.querySelectorAll('th');

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            const tableBody = table.querySelector('tbody');
            const rows = Array.from(tableBody.querySelectorAll('tr')); // Select all rows in tbody
            const isAscending = header.classList.toggle('asc');
            const direction = isAscending ? 1 : -1;

            rows.sort((a, b) => {
                const aText = a.children[index].textContent.trim();
                const bText = b.children[index].textContent.trim();

                return aText.localeCompare(bText, undefined, { numeric: true }) * direction;
            });

            // Append sorted rows back to the table body
            rows.forEach(row => tableBody.appendChild(row));
        });
    });
});