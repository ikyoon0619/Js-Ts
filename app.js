const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response)

}

// 글 목록 화면 보여주기
function newsFeed() {
  const newsFeed = getData(NEWS_URL)
  const newsList = [];

  newsList.push('<ul>');

  for (let i = 0; i < 10; i++) {
    newsList.push(`
    <li>
      <a href='#${newsFeed[i].id}'>
      ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `);
  }
  newsList.push('</ul>')

  container.innerHTML = newsList.join('');

}

// 글 내용 보여주기
function newsDetail() {
  const id = location.hash.substr(1)

  const newsContent = getData(CONTENT_URL.replace('@id', id))

  container.innerHTML = `
      <h1>${newsContent.title}</h1>
      <div>
        <a href="#">목록으로</a>
      </div>
    `;
}

function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  }
}

// hashchange 이벤트 발생 시 글 내용 보여주기
window.addEventListener('hashchange', router);

router();