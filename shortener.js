document.querySelector('.navbar_toggle').addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('show_nav');
});

// link shortener
document
  .querySelector(".shortener")
  .addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form from submitting and reloading the page

    let result = document.getElementById("result");
    let inputUrl = document.getElementById("url-input").value;
    const apiUrl = "https://api.tinyurl.com/create";
    const apiKey = "I4uK5LKSykGq6PrERh7YlXSklpzJiaiU3oFsyY9T4ZOvijFTnkNCYxSutbzZ";

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: inputUrl,
        domain: "tinyurl.com", // Optional, you can specify another domain if needed
      }),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        const shortUrl = data.data.tiny_url;
        result.innerHTML = `Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a> <button id="copy-btn">Copy</button>`;

        // Add event listener to the copy button
        const copyBtn = document.getElementById("copy-btn");
        copyBtn.addEventListener("click", function () {
          navigator.clipboard.writeText(shortUrl).then(
            function () {
              alert("URL copied to clipboard!");
            },
            function (err) {
              console.error("Could not copy text: ", err);
            }
          );
        });
      } else {
        result.innerHTML = `Error: ${
          data.errors ? data.errors[0].message : data.message
        }`;
      }
    } catch (error) {
      console.error(error);
      result.innerHTML = "An error occurred while shortening the URL.";
    }
  });
