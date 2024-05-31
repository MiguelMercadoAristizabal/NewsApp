document.addEventListener("DOMContentLoaded", () => {
  const allBtn = document.getElementById("all-btn");
  const politicsBtn = document.getElementById("politics-btn");
  const technologyBtn = document.getElementById("technology-btn");
  const sportsBtn = document.getElementById("sports-btn");
  const healthBtn = document.getElementById("health-btn");
  const scienceBtn = document.getElementById("science-btn");
  const entertainmentBtn = document.getElementById("entertainment-btn");
  const articles = document.getElementById("articles");

  const searchInput = document.getElementById("search");

  const baseUrl = "http://localhost:3000/api/news/";

  // Función para cargar noticias por categoría
  const fetchNewsByCategory = (category) => {
    fetch(baseUrl + category)
      .then((response) => {
        console.log("entro");
        console.log(response);
        return response.json();
      })
      .then((data) => {
        articles.innerHTML = "";
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((article) => {
            console.log(article.url_to_image);
            if (
              article.title !== "[Removed]" &&
              article.url_to_image !== null &&
              article.description !== null
            ) {
              const div = document.createElement("div");
              div.classList.add("article");
              let imageElement = "";
              if (article.url_to_image) {
                imageElement = `<img src="${article.url_to_image}" alt="${article.title}">`;
              }
              div.innerHTML = `
                ${imageElement}
                <h2>${article.title}</h2>
                <p>${article.description || ""}</p>
                <p>Source: ${article.source_name}</p>
                <p>Author: ${article.author || "Unknown"}</p>
                <p>Published at: ${article.published_at}</p>
                <a href="${article.url}" target="_blank">Read more</a>
              `;
              articles.appendChild(div);
            }
          });
        } else {
          articles.innerHTML = "<p>No articles found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        articles.innerHTML = "<p>Error fetching news.</p>";
      });
  };

  searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=8ebd159424cc4cebba3b9b95024a39b4`
      );
      const data = await response.json();
      if (data.status === "ok") {
        // Process the response data, e.g., display the results on the page
        displayArticles(data.articles);
      } else {
        console.error("Error:", data.message);
      }
    } else {
      articles.innerHTML = "";
    }
  });

  function displayArticles(articles) {
    const articlesSection = document.getElementById('articles');
    articlesSection.innerHTML = '';
    articles.forEach(article => {
      if (
        article.title !== "[Removed]" &&
        article.urlToImage !== null &&
        article.description !== null
      ) {
        const div = document.createElement("div");
        div.classList.add("article");
        let imageElement = "";
        if (article.urlToImage) {
          imageElement = `<img src="${article.urlToImage}" alt="${article.title}">`;
        }
        div.innerHTML = `
          ${imageElement}
          <h2>${article.title}</h2>
          <p>${article.description || ""}</p>
          <p>Source: ${article.source.name}</p>
          <p>Author: ${article.author || "Unknown"}</p>
          <p>Published at: ${new Date(article.publishedAt).toLocaleString()}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        articlesSection.appendChild(div);
      }
    });
  }

  // Event listeners para los botones de categoría
  allBtn.addEventListener("click", () => {
    fetchNewsByCategory("all");
  });

  politicsBtn.addEventListener("click", () => {
    fetchNewsByCategory("politics");
  });

  technologyBtn.addEventListener("click", () => {
    fetchNewsByCategory("technology");
  });

  sportsBtn.addEventListener("click", () => {
    fetchNewsByCategory("sports");
  });

  healthBtn.addEventListener("click", () => {
    fetchNewsByCategory("health");
  });

  scienceBtn.addEventListener("click", () => {
    fetchNewsByCategory("science");
  });

  entertainmentBtn.addEventListener("click", () => {
    fetchNewsByCategory("entertainment");
  });
});
