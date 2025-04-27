document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const archiveBody = document.getElementById('archive-body');
            const archiveSearchBox = document.getElementById('archive-search-box');

            // Populate the archive table
            const populateArchiveTable = (filteredData) => {
                archiveBody.innerHTML = ''; // Clear existing rows
                filteredData.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><a href="${item.Website}" target="_blank">${item.Title}</a></td>
                        <td>${item.Location}</td>
                        <td>${item.Date}</td>
                        <td>${item.Fees}</td>
                        <td>${item.Notes}</td>
                    `;
                    archiveBody.appendChild(row);
                });
            };

            // Get the current date
            const currentDate = new Date();

            // Filter data to include only events before the current date
            const archiveData = data.filter(item => new Date(item.Date) <= currentDate);

            // Sort data by Date in descending order
            const sortedArchiveData = archiveData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

            // Initial population of the archive table
            populateArchiveTable(sortedArchiveData);

            // Add search functionality
            archiveSearchBox.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase();
                const searchFilteredData = sortedArchiveData.filter(item =>
                    item.Title.toLowerCase().includes(searchTerm) ||
                    item.Location.toLowerCase().includes(searchTerm) ||
                    item.Date.toLowerCase().includes(searchTerm) ||
                    item.Fees.toString().toLowerCase().includes(searchTerm) ||
                    item.Notes.toLowerCase().includes(searchTerm)
                );
                populateArchiveTable(searchFilteredData);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});