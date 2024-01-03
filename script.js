// script.js

document.addEventListener('DOMContentLoaded', async () => {
    const historyList = document.getElementById('historyList');

    // Fetch and display permission history when the page loads
    try {
        const historyResponse = await fetch('i-0f83ce38967d70569');
        const historyData = await historyResponse.json();

        // Update history list with fetched data
        historyData.forEach(({ userName, permission }) => {
            updateHistoryList({ userName, permission });
        });
    } catch (error) {
        console.error('Error fetching permission history:', error);
        alert('Error fetching permission history. Please check the console for details.');
    }

    // Attach event listener to the request button
    const requestButton = document.getElementById('requestButton');
    requestButton.addEventListener('click', requestPermission);

    // Function to handle permission request
    async function requestPermission() {
        const userName = prompt("Enter your name:");

        if (!userName) {
            alert('Permission request canceled. Please provide your name.');
            return;
        }

        const permission = confirm("Do you have permission to go out with your friends?");

        try {
            // Send permission request to the server
            const response = await fetch('i-0f83ce38967d70569', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, permission }),
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            const message = await response.text();

            if (message.includes('Permission granted')) {
                alert('Permission granted!');
            } 

            // Update permission history
            //updateHistoryList({ userName, permission });
        //} catch (error) {
          //  console.error('Error:', error);
            //alert('Error sending permission request. Please check the console for details.');
        //}
    }

    // Function to update permission history list
    function updateHistoryList({ userName, permission }) {
        const listItem = document.createElement('li');
        listItem.textContent = `${userName} - ${permission ? 'Granted' : 'Denied'}`;
        historyList.appendChild(listItem);
    }
});
