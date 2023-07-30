const API_KEY="a4b47e4e5a29429da9c20e3e467e5858";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
   const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
 
}
function bindData(articles){
    const cardsContainer =document.getElementById('cards-container');
    const newsCardsTemplate = document.getElementById('template-news-cards');

    cardsContainer.innerHTML = '';

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });

}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
});

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {window.open(article.url, "_blank")});

}

function  onNavItemClick(id){
    fetchNews(id);
    const navItems = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItems;
    curselectedNav.classList.add('active');

}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click', () => {
    const  query = searchText.value;
    if (!query) return;
    fetchNews(query);
})
