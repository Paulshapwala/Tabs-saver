chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
        let links = tabs.map(tab => ({ title: tab.title, url: tab.url }));
        
        fetch("http://localhost:5000/save_links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ links: links })
        }).then(response => response.json())
          .then(data => console.log("Links saved:", data))
          .catch(error => console.error("Error:", error));
    });
});
