class Popup {
    constructor() {
        this.data = [];
        this.contentElement = document.getElementById('content');  // Store the element reference
        this.getData();  // Automatically fetch data when the class is created
    }

    getData() {
        fetch("http://localhost:5000/get_topics")
            .then(response => response.json())
            .then(data => {
                this.data = data.topics;
                this.render();  // Update the UI after fetching data
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    render() {
        // Clear previous content
        this.contentElement.innerHTML = "";

        // If there are no topics, display a message
        if (this.data.length === 0) {
            this.contentElement.innerHTML = "<p>No topics available</p>";
            return;
        }

        // Create a table to display topics
        let table = document.createElement("table");
        table.innerHTML = `
            <tr>
                <th>Topic</th>
                <th>Date</th>
            </tr>
        `;

        // Populate the table with data
        this.data.forEach(topic => {
            let row = table.insertRow();
            row.insertCell(0).textContent = topic.topic;
            row.insertCell(1).textContent = topic.date;
        });

        // Append table to content
        this.contentElement.appendChild(table);
    }
}

// Create an instance of Popup
document.addEventListener("DOMContentLoaded", () => {
    new Popup();
});
