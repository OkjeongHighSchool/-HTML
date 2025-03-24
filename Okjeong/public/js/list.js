let boardsStr = localStorage.getItem("boards");

// localStorage 초기값 지정
if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  localStorage.setItem("boards", listStr);
  boardsStr = listStr;
}

const boardsObj = JSON.parse(boardsStr);
const itemsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil(boardsObj.length / itemsPerPage);

// 페이지 그룹 관련 변수
const pagesPerGroup = 10; // 한 그룹당 페이지 개수
let currentGroup = 0; // 현재 페이지 그룹

// 최신 글이 맨 앞에 오도록 역순으로 정렬된 배열 생성
const reversedBoards = [...boardsObj].reverse(); // 최신 글이 앞에 오도록 배열 뒤집기

// 페이지 데이터 가져오기
function getPaginatedItems(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return reversedBoards.slice(start, end);
}

// 테이블 렌더링
function renderTable() {
  const tbody = document.querySelector("tbody");
  let newRows = "";

  getPaginatedItems(currentPage).forEach((item, i) => {
    const number = (currentPage - 1) * itemsPerPage + i + 1;
    newRows += `
    <tr>
      <td>${number}</td>
      <td><a href="../board/view.html?index=${item.index}">${item.subject}</a></td>
      <td>${item.writer}</td>
      <td>${item.date}</td>
      <td>${item.views}</td>
    </tr>
    `;
  });

  tbody.innerHTML = newRows;
  renderPagination();
}

// 페이지네이션 렌더링
function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // `<<` 버튼
  if (currentGroup > 0) {
    pagination.innerHTML += `<span onclick="prevPageGroup()">&laquo;</span>`;
  }

  // `<`
  if (currentPage > 1) {
    pagination.innerHTML += `<span onclick="prevPage()">&lt;</span>`;
  }

  // 페이지 번호 추가
  for (let i = startPage; i <= endPage; i++) {
    pagination.innerHTML += `
      <span onclick="goToPage(${i})" class="${currentPage === i ? 'active' : ''}">${i}</span>
    `;
  }

  // `>`
  if (currentPage < totalPages) {
    pagination.innerHTML += `<span onclick="nextPage()">&gt;</span>`;
  }

  // `>>` 버튼
  if (endPage < totalPages) {
    pagination.innerHTML += `<span onclick="nextPageGroup()">&raquo;</span>`;
  }
}

// `<<` 이전 그룹 이동
function prevPageGroup() {
  if (currentGroup > 0) {
    currentGroup--;
    currentPage = currentGroup * pagesPerGroup + 1; // 그룹 첫 번째 페이지로 이동
    renderTable();
  }
}

// `>>` 다음 그룹 이동
function nextPageGroup() {
  if ((currentGroup + 1) * pagesPerGroup < totalPages) {
    currentGroup++;
    currentPage = currentGroup * pagesPerGroup + 1; // 그룹 첫 번째 페이지로 이동
    renderTable();
  }
}

// 페이지 이동 함수
function goToPage(page) {
  currentPage = page;
  currentGroup = Math.floor((currentPage - 1) / pagesPerGroup); // 그룹 자동 조정
  renderTable();
}

// 이전 페이지 이동
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    currentGroup = Math.floor((currentPage - 1) / pagesPerGroup); // 그룹 자동 조정
    renderTable();
  }
}

// 다음 페이지 이동
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    currentGroup = Math.floor((currentPage - 1) / pagesPerGroup); // 그룹 자동 조정
    renderTable();
  }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", renderTable);