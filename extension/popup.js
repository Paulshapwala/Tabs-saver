let originalContent = document.getElementById('content').innerHTML;
function SaveTopicsEvent() {
    document.getElementById('SaveTopics').addEventListener('click', () => {
        
        fetchHtml('saved_topics.html').then(html => {
            document.getElementById('content').innerHTML = html;
            fetchTopics(); // Load topics from the server
            display_2_Topics(topicsData); // Display topics in the table
            CloseTopicsEvent(originalContent); // set up event listener for close topics
            searchEvent(); // set up event listener for search topics
        }).catch(error => {
            console.error("Error loading topics:", error);
        });
    });
}


function fetchHtml(url) {
    return fetch(url) // Use the built-in fetch()
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load saved topics.");
            }
            return response.text(); // Convert response to text
        });
}

function CloseTopicsEvent(originalContent){document.getElementById('closeTopics').addEventListener('click', () =>{
        document.getElementById('content').innerHTML = originalContent;
        SaveTabsEvent();
        SaveTopicsEvent();});
}


function SaveTabsEvent() {
    document.getElementById("saveTabs").addEventListener("click", () => {
        let topicInput = document.getElementById("topic");
        
        if (topicInput.style.display === "none") {
            topicInput.style.display = "block"; // Show input field
            topicInput.focus();  // Focus on input
            return;  // Wait for user input
        }
    
        let topic = topicInput.value.trim();
    
        if (!topic) {
            topic = prompt("Enter a research topic:");
            if (!topic) {
                topic = "Untitled_Research";  // Default topic
            }
        }
    
        chrome.tabs.query({}, (tabs) => {
            let links = tabs.map(tab => ({ title: tab.title, url: tab.url }));
    
            fetch("http://localhost:5000/save_links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: topic, links: links })
            })
            .then(response => response.json())
            .then(data => {
                alert("Research saved successfully!");
                window.close();  // Close the popup after success
            })
            .catch(error => alert("Error saving research."));
        });
    });
}


let topicsData = []; //global variable to store topics data
function fetchTopics() {
    fetch("http://localhost:5000/get_topics")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch topics");
            }
            return response.json();
        })
        .then(data => {
            topicsData = data.topics; // Update global variable
            display_2_Topics(topicsData); // Display topics in the table
        })
        .catch(error => console.error("Error fetching topics:", error));
}


function display_2_Topics(data) {
    const topicsTable = document.getElementById("topicsList");
    topicsTable.innerHTML = ""; // Clear previous data

    data.forEach(item => {
        const row = document.createElement("tr");

        const topicCell = document.createElement("td");
        topicCell.textContent = item.topic;
        topicCell.classList.add("clickable");
        topicCell.addEventListener("click", () => {
            handleTopicClick(item.topic); // Trigger the click handler when the topic is clicked
        });


        const dateCell = document.createElement("td");
        dateCell.textContent = item.date;

        row.appendChild(topicCell);
        row.appendChild(dateCell);
        topicsTable.appendChild(row);
    });
}


function handleTopicClick(topic) {
    fetch(`http://localhost:5000/get_links/${encodeURIComponent(topic)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch links for topic");
            }
            return response.json(); // Assuming the response is JSON
        })
        .then(data => {
            // Fetch and replace content with links.html
            fetchHtml('links.html')
                .then(html => {
                    document.getElementById('content').innerHTML = html;
                    displayLinks(data); // Display the links in the table
                    TopicsEvent();// set up event listener for the back button
                    HomeEvent();// set up event listener for the home button
                });
        })
        .catch(error => console.error("Error fetching links:", error));
}


function displayLinks(data) {
    const linksList = document.getElementById("linksList");
    const openAllTabsBtn = document.getElementById("openAllTabsBtn");
    linksList.innerHTML = ""; // Clear previous links

    // Extract the topic name dynamically (assuming only one topic exists)
    const topic = Object.keys(data)[0]; 
    const links = data[topic]; // Get the array of links

    if (!links || links.length === 0) {
        linksList.innerHTML = "<li>No links available</li>";
        openAllTabsBtn.style.display = "none"; // Hide button if no links
        return;
    }

    links.forEach(linkObj => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = linkObj.url;
        a.textContent = linkObj.title;
        a.target = "_blank"; // Opens link in a new tab

        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` (${linkObj.date})`; // Show date next to title
        dateSpan.style.color = "gray";
        dateSpan.style.fontSize = "0.9em";

        li.appendChild(a);
        li.appendChild(dateSpan);
        linksList.appendChild(li);
    });

    // Update the topic title
    document.getElementById("topicTitle").textContent = topic;

    // Show the "Open All Tabs" button
    openAllTabsBtn.style.display = "block";
    
    // Attach event listener for opening all tabs
    openAllTabsBtn.onclick = () => openAllTabs(links);
}


function openAllTabs(links) {
    links.forEach(linkObj => {
        window.open(linkObj.url, "_blank");
    });
}


function searchTopics() {
    const topicInput = document.querySelector("input[name='topic']").value.toLowerCase();
    const dateInput = document.querySelector("input[name='date']").value;

    const filteredTopics = topicsData.filter(item =>
        item.topic.toLowerCase().includes(topicInput) && item.date.includes(dateInput)
    );

    display_2_Topics(filteredTopics); // Update table with filtered results
}


function searchEvent(){
document.querySelector("input[name='topic']").addEventListener("input", searchTopics);
document.querySelector("input[name='date']").addEventListener("input", searchTopics);
                        }

function HomeEvent(){

        document.getElementById("Home").addEventListener("click", HomeEventHandler);
        console.log('HomeEvent');
}

function TopicsEvent(){
    document.getElementById("Topics").addEventListener("click", TopicsEventHandler)
    }


function HomeEventHandler(){
    document.getElementById('content'.innerHTML = originalContent);
    console.log('HomeEventHandler');
}


function TopicsEventHandler(){
    fetchHtml('saved_topics.html').then(html => {
        document.getElementById('content').innerHTML = html;
        fetchTopics(); // Load topics from the server
        display_2_Topics(topicsData); // Display topics in the table
        searchEvent(); // set up event listener for search topics
        CloseTopicsEvent(originalContent); // set up event listener for close topics
    
        
    }).catch(error => {
        console.error("Error loading topics:", error);
    });
    
}
                        
SaveTabsEvent();
SaveTopicsEvent();