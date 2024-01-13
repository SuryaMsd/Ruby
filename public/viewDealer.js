document.addEventListener('DOMContentLoaded', function () {
    // Fetch dealers data from the server
    fetch('/dealers')
        .then(response => response.json())
        .then(dealers => displayDealers(dealers))
        .catch(error => console.error('Error fetching dealers', error));

    function displayDealers(dealers) {
        const tbody = document.querySelector('tbody');

        dealers.forEach(dealer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dealer.id}</td>
                <td>${dealer.dealer_name}</td>
                <td>${dealer.mobile}</td>
                <td>${dealer.place}</td>
                <td><button onclick="showDealerDetails(${dealer.id})">View Details</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    function showDealerDetails(dealerId) {
        // Fetch dealer details from the server based on dealerId
        fetch(`/dealers/${dealerId}`)
            .then(response => response.json())
            .then(dealer => {
                const popup = document.getElementById('dealer-details-popup');
                popup.innerHTML = `
                    <h3>${dealer.dealer_name}</h3>
                    <p>ID: ${dealer.id}</p>
                    <p>Mobile: ${dealer.mobile}</p>
                    <p>Place: ${dealer.place}</p>
                `;
                popup.style.display = 'block';
            })
            .catch(error => console.error(`Error fetching dealer details for ID ${dealerId}`, error));
    }
});
