//Восстановить порядок книг
function sortBooks() {
  const mainBook = document.querySelector(".books");
  const books = mainBook.querySelectorAll(".book");
  const booksSorted = [];
  books.forEach(function (curBook) {
    const h2 = curBook.querySelector("h2");
    const idBook = +h2.textContent.trim().match(/\d+/)[0];
    booksSorted.push({
      id: idBook,
      book: curBook,
    });
    curBook.remove();
  });
  booksSorted.sort(function (a, b) {
    if (a.id < b.id) {
      return -1;
    }
  });
  for (const curBook of booksSorted) {
    console.log(curBook);
    mainBook.append(curBook.book);
  }
}
sortBooks();
//Заменить картинку заднего фона на другую из папки image
document.querySelector("body").style.backgroundImage =
  "url(./image/you-dont-know-js.jpg)";
//Исправляю Книгу 3
const bookTitles = document.querySelectorAll(".book h2 a");
bookTitles[2].textContent = "Книга 3. This и прототипы объектов";
//Удаляю рекламу
document.querySelector(".adv").remove();
//Восстановить порядок книг
const bookUls = document.querySelectorAll(".book ul");
function sortElemsWithinBook(tempUl) {
  const liElems = tempUl.querySelectorAll("li");
  const tempLis = Array.from(liElems).map((t) => t.textContent);
  let sortedLis = [];
  sortedLis.push(tempLis[1]);
  sortedLis.push(tempLis[0]);
  const restPart = tempLis.slice(2, tempLis.length);
  restPart.sort();
  sortedLis = sortedLis.concat(restPart);

  liElems.forEach(function (el) {
    el.remove();
  });
  for (let el of sortedLis) {
    const newEl = document.createElement("li");
    newEl.textContent = el;
    tempUl.append(newEl);
  }
}
sortElemsWithinBook(bookUls[1]);
sortElemsWithinBook(bookUls[4]);
//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное ме

const ch8ElemLis = bookUls[5].querySelectorAll("ul li");
// //ch8Elem.textContent = "Глава 8: За пределами ES6";
const ch8liNew = document.createElement("li");
ch8liNew.textContent = "Глава 8: За пределами ES6";
ch8ElemLis[ch8ElemLis.length - 1].before(ch8liNew);
