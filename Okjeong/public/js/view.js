const boardsStr = localStorage.getItem("boards");
const boardsObj = JSON.parse(boardsStr);

const idx = location.search;
const index = idx.split("=")[1];
const board = boardsObj[index];

const beforeUrl = document.referrer;

// 조회수
if (!board.refresh) {
  board.views++;
  board.refresh = true;
  const viewCountStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", viewCountStr);
} else {
  if (beforeUrl === " ") {
    board.views++;
    const viewCountStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", viewCountStr);
  }
}

// 데이터 출력
const viewFrm = document.querySelectorAll("#viewFrm > div");

for (let i = 0; i < viewFrm.length; i++) {
  const id = viewFrm[i].id;
  viewFrm[i].innerHTML += " " + board[id];
}

// 수정 버튼
const modifyBtn = document.querySelector("#modify");

const modifyBtnHandler = (e) => {
  location = "../board/modify.html" + idx;
};

modifyBtn.addEventListener("click", modifyBtnHandler);

// 삭제 버튼
const deleteBtn = document.querySelector("#delete");

const deleteBtnHandler = (e) => {
  boardsObj.splice(index, 1);
  for (let i = 0; i < boardsObj.length; i++) {
    boardsObj[i].index = i;
  }

  const setBoardsStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", setBoardsStr);
  location.href = "../board/list.html";
};

deleteBtn.addEventListener("click", deleteBtnHandler);
