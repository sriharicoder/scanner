

async function checkURL() {
    let url = document.getElementById("urlInput").value;
    let loader = document.getElementById("urlLoader");
    let resultDiv = document.getElementById("urlResult");
    
    if (!url) {
        resultDiv.innerHTML = "❌ Please enter a URL.";
        return;
    }

    loader.style.display = "block";
    resultDiv.innerHTML = "";

    try {
        let apiKey = "YOUR_GOOGLE_SAFE_BROWSING_API_KEY";  // Replace with your API key
        let apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
        let data = {
            client: { clientId: "yourcompany", clientVersion: "1.0" },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url: url }]
            }
        };

        let response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        let result = await response.json();
        loader.style.display = "none";

        resultDiv.innerHTML = result.matches ? "🚨 Malicious URL detected!" : "✅ Safe URL.";
    } catch (error) {
        loader.style.display = "none";
        resultDiv.innerHTML = "❌ Error checking URL.";
    }
}

async function checkEmail() {
    let email = document.getElementById("emailInput").value;
    let loader = document.getElementById("emailLoader");
    let resultDiv = document.getElementById("emailResult");

    if (!email) {
        resultDiv.innerHTML = "❌ Please enter an email.";
        return;
    }

    loader.style.display = "block";
    resultDiv.innerHTML = "";

    try {
        let apiKey = "YOUR_LEAKCHECKAPI_KEY";  // Replace with your API key
        let response = await fetch(`https://leakcheck.io/api?key=${apiKey}&check=${email}&type=email`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "User-Agent": "YourAppName"
            }
        });

        let data = await response.json();
        loader.style.display = "none";

        if (data.found) {
            resultDiv.innerHTML = "⚠️ Email found in data breaches!";
        } else {
            resultDiv.innerHTML = "✅ Email is safe.";
        }
    } catch (error) {
        loader.style.display = "none";
        resultDiv.innerHTML = "❌ API request failed.";
    }
}

async function checkIP() {
    let ip = document.getElementById("ipInput").value;
    let loader = document.getElementById("ipLoader");
    let resultDiv = document.getElementById("ipResult");

    if (!ip) {
        resultDiv.innerHTML = "❌ Please enter an IP address.";
        return;
    }

    loader.style.display = "block";
    resultDiv.innerHTML = "";

    try {
        // Correct API endpoint
        let apiUrl = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`; // Example query parameter for past 90 days

        let response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Key": "6d383b203ea4721b099a03b042512b79eadfb4bc2827413900c2e04fce84e2979d0ae99bf416fee5", // Your actual API key here
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            loader.style.display = "none";
            resultDiv.innerHTML = `❌ Failed to fetch IP. Status: ${response.status}`;
            return;
        }

        let data = await response.json();
        loader.style.display = "none";

        if (data.data && data.data.abuseConfidenceScore > 50) {
            resultDiv.innerHTML = `🚨 High-risk IP! (${data.data.abuseConfidenceScore}% confidence)`;
        } else {
            resultDiv.innerHTML = "✅ Safe IP.";
        }
    } catch (error) {
        loader.style.display = "none";
        console.error("Error:", error);
        resultDiv.innerHTML = "❌ Failed to fetch IP details.";
    }
	
}
