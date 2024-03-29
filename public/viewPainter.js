document.addEventListener('DOMContentLoaded', function () {
    // Fetch painters data from the server
    fetch('/painters')
        .then(response => response.json())
        .then(painters => displayPainters(painters))
        .catch(error => console.error('Error fetching painters', error));

    function displayPainters(painters) {
        const tbody = document.querySelector('tbody');

        painters.forEach(painter => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${painter.id}</td>
                <td>${painter.painter_name}</td>
                <td>${painter.mobile}</td>
                <td>${painter.dealer_name}</td>
                <td>${painter.place}</td>
                <td><button onclick="showPainterDetails(${painter.id})">View Details</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    function showPainterDetails(painterId) {
        // Fetch painter details from the server based on painterId
        fetch(`/painters/${painterId}`)
            .then(response => response.json())
            .then(painter => {
                const popup = document.getElementById('painter-details-popup');
                popup.innerHTML = `
                    <h3>${painter.painter_name}</h3>
                    <p>ID: ${painter.id}</p>
                    <p>Mobile: ${painter.mobile}</p>
                    <p>Dealer: ${painter.dealer_name}</p>
                    <p>Place: ${painter.place}</p>
                `;
                popup.style.display = 'block';
            })
            .catch(error => console.error(`Error fetching painter details for ID ${painterId}`, error));
    }
});
