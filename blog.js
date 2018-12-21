let blogs = undefined;
let txtSearch;
let blogTemplate;
let searchResults;
let dp = new DOMParser();
const isIterable = (object) =>
  object != null && typeof object[Symbol.iterator] === 'function';

document.addEventListener('DOMContentLoaded', (_) => {
  txtSearch = document.querySelector('.search-form > .search-txt');
  if (fetch) {
    fetch('/blog/bloginfo.json')
      .then((data) => data.json())
      .then((jsonData) => (blogs = jsonData.blogs));
    fetch('/blog/template.html').then((data) =>
      data.text().then((data) => (blogTemplate = data))
    );
  }
});

function addSearchResult(blogJSON) {
  if (blogTemplate === undefined) {
    setTimeout((_) => search(blogJSON), 100);
    return;
  }
  let blogHTML = blogTemplate;
  blogHTML = blogHTML
    .replace('$PATH$', `'${blogJSON.url}'`)
    .replace('$TITLE$', blogJSON.name)
    .replace('$DATE$', blogJSON.date);
  let elem = dp.parseFromString(blogHTML, 'text/xml');
  elem = elem.documentElement;
  let topicHTMLString = '<ul>';
  for (let topic of blogJSON.topics) {
    topicHTMLString += `<li>${topic}</li>`;
  }
  topicHTMLString += '</ul>';
  let topics = dp.parseFromString(topicHTMLString, 'text/xml');
  elem.append(topics.documentElement);
  if (!searchResults) searchResults = document.querySelector('.search-results');
  searchResults.innerHTML += elem.outerHTML;
}

const searchElem = (elem, searchString) =>
  elem.toLowerCase && elem.toLowerCase().includes(searchString);

function search() {
  if (blogs === undefined) {
    setTimeout(search, 100);
    return;
  }
  let searchStrings = txtSearch.value.toLowerCase().split(' ');
  let blogMatches = new Set();
  for (let searchString of searchStrings) {
    for (let blog of blogs) {
      for (let key in blog) {
        let elem = blog[key];
        if (isIterable(elem)) {
          for (let subelem of elem) {
            if (searchElem(subelem, searchString)) blogMatches.add(blog);
          }
        } else {
          if (searchElem(elem, searchString)) blogMatches.add(blog);
        }
      }
    }
  }
  if (searchResults) {
    searchResults.innerHTML = '';
  }
  for (let match of blogMatches) {
    addSearchResult(match);
  }
}
