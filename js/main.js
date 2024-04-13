
//Botones
const allBtn = document.getElementById("all-btn");
const politicsBtn = document.getElementById("politics-btn");
const technologyBtn = document.getElementById("technology-btn");
const sportsBtn = document.getElementById("sports-btn");
const healthBtn = document.getElementById("health-btn");
const scienceBtn = document.getElementById("science-btn")
const entertainmentBtn = document.getElementById("entertainment-btn")

//Articulo
const articles = document.getElementById("articles");


//ApiKey
const apiKey = "dd3967facd6849a8942e769b33b7c8d4";

//Url
const baseUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us&category=`;


//Se llama la funcion principal
// fetchArticles(categories.all)

//Categories
const categories = {
  all: "",
  politics: "politics",
  business: "business",
  entertainment: "entertainment",
  health: "health",
  science: "science",
  sports: "sports",
  technology: "technology",
};

allBtn.addEventListener("click", () => {
  fetchArticles(categories.all);
});

politicsBtn.addEventListener("click", () => {
  fetchArticles(categories.politics);
});

technologyBtn.addEventListener("click", () => {
  fetchArticles(categories.technology);
});

sportsBtn.addEventListener("click", () => {
  fetchArticles(categories.sports);
});

healthBtn.addEventListener("click", () =>{
  fetchArticles(categories.health)
})

scienceBtn.addEventListener("click", () =>{
  fetchArticles(categories.science)
})

entertainmentBtn.addEventListener("click", () =>{
  fetchArticles(categories.entertainment)
})

const fetchArticles = (category) => {
  const url = category ? `${baseUrl}${category}` : baseUrl;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      articles.innerHTML = "";
      data.articles.forEach((article) => {
        const div = document.createElement("div");
        div.classList.add("article");
        div.innerHTML = `
        <img src=${article.urlToImage} alt="">
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Leer más</a>
        `;
        if (article.title != "[Removed]" && article.urlToImage !=  null){
          articles.appendChild(div);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      articles.innerHTML = "<p>Error fetching articles.</p>";
    });
};
