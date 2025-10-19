           
document.addEventListener('DOMContentLoaded', function() {
    // Find all filter containers and attach independent filters to each
    const filterContainers = document.querySelectorAll('.filter-container');

    filterContainers.forEach((container, index) => {
        const yearFilter = container.querySelector('.year-filter');
        const subjectFilter = container.querySelector('.subject-filter');

        // Find the immediately following table
        let table = container.nextElementSibling;
        while (table && !table.classList.contains('subject-table')) {
            table = table.nextElementSibling;
        }

        if (table) {
            const tbody = table.querySelector('tbody');
            const rows = tbody ? tbody.querySelectorAll('tr') : [];

            // Filter function specific to this table
            const applyFilters = () => {
                const yearValue = yearFilter.value.toLowerCase();
                const subjectValue = subjectFilter.value.toLowerCase();

                rows.forEach(row => {
                    const year = row.cells[0].textContent.toLowerCase().trim();
                    const subject = row.cells[1].textContent.toLowerCase().trim();
                    const paperName = row.cells[2].textContent.toLowerCase().trim();

                    const yearMatch = yearValue === '' || year === yearValue;
                    const subjectMatch = subjectValue === '' || 
                                       subject.includes(subjectValue) || 
                                       paperName.includes(subjectValue);

                    row.style.display = (yearMatch && subjectMatch) ? '' : 'none';
                });
            };

            // Event listeners for this specific filter set
            if (yearFilter && subjectFilter && rows.length > 0) {
                yearFilter.addEventListener('change', applyFilters);
                subjectFilter.addEventListener('input', applyFilters);

                // Initial filter application
                applyFilters();
            } else {
                console.warn(`Filter setup incomplete for container ${index + 1}. Check elements.`);
            }
        } else {
            console.warn(`No table found after filter container ${index + 1}.`);
        }
    });
});
