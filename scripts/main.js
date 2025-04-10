// Fetch data from the JSON file and populate the table
document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('table-body');
            const searchBox = document.getElementById('search-box');

            // Populate the table
            const populateTable = (filteredData) => {
                tableBody.innerHTML = ''; // Clear existing rows
                filteredData.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><a href="${item.Website}" target="_blank">${item.Title}</a></td>
                        <td>${item.Location}</td>
                        <td>${item.Date}</td>
                        <td>${item.Fees}</td>
                        <td>${item.Notes}</td>
                    `;
                    tableBody.appendChild(row);
                });
            };

            // Sort data by Date on initial load
            const sortedData = data.sort((a, b) => new Date(a.Date) - new Date(b.Date)); // Changed from StartDate to Date

            // Initial population of the table
            populateTable(sortedData);

            // Add search functionality
            searchBox.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase();
                const filteredData = sortedData.filter(item =>
                    item.Title.toLowerCase().includes(searchTerm) ||
                    item.Location.toLowerCase().includes(searchTerm) ||
                    item.Date.toLowerCase().includes(searchTerm) ||
                    item.Fees.toString().toLowerCase().includes(searchTerm) ||
                    item.Notes.toLowerCase().includes(searchTerm)
                );
                populateTable(filteredData);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

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