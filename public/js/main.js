document.addEventListener("DOMContentLoaded", () => {
  const allBtn = document.getElementById("all-btn");
  const politicsBtn = document.getElementById("politics-btn");
  const technologyBtn = document.getElementById("technology-btn");
  const sportsBtn = document.getElementById("sports-btn");
  const healthBtn = document.getElementById("health-btn");
  const scienceBtn = document.getElementById("science-btn");
  const entertainmentBtn = document.getElementById("entertainment-btn");
  const searchInput = document.getElementById("search");

  const articles = document.getElementById("articles");
  const baseUrl = "http://localhost:3000/api/news/";
  let currentArticles = [];
  let currentPage = 1;
  const articlesPerPage = 6;

  const fetchNewsByCategory = (category) => {
    fetch(baseUrl + category)
      .then((response) => response.json())
      .then((data) => {
        currentArticles = data.filter(article => 
          article.title !== "[Removed]" &&
          article.url_to_image !== null &&
          article.description !== null
        );
        currentPage = 1;
        displayArticles();
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        articles.innerHTML = "<p>Error fetching news.</p>";
      });
  };

  const displayArticles = () => {
    articles.innerHTML = "";
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = Math.min(startIndex + articlesPerPage, currentArticles.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const article = currentArticles[i];
      const div = document.createElement("div");
      div.classList.add("article");
      let imageElement = article.url_to_image ? `<img src="${article.url_to_image}" alt="${article.title}">` : "";
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

    displayPagination();
  };

  const displayPagination = () => {
    const totalPages = Math.ceil(currentArticles.length / articlesPerPage);
    const paginationDiv = document.createElement("div");
    paginationDiv.classList.add("pagination");

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.classList.add("pagination-button");
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayArticles();
      }
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.disabled = currentPage === totalPages;
    nextButton.classList.add("pagination-button");
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayArticles();
      }
    });

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    pageInfo.classList.add("page-info");

    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(pageInfo);
    paginationDiv.appendChild(nextButton);

    articles.appendChild(paginationDiv);
  };

  // Modificar la función de búsqueda
  searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=8ebd159424cc4cebba3b9b95024a39b4`
      );
      const data = await response.json();
      if (data.status === "ok") {
        currentArticles = data.articles.filter(article => 
          article.title !== "[Removed]" &&
          article.urlToImage !== null &&
          article.description !== null
        );
        currentPage = 1;
        displayArticles();
      } else {
        console.error("Error:", data.message);
      }
    } else {
      articles.innerHTML = "";
    }
  });

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
