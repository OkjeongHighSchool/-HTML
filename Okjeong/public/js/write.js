const writeFrm = document.querySelector("#writeFrm");

// 데이터 기본 틀
class Board {
  constructor(indexNum, subjectStr, writerStr, contentStr, passwordStr) {
    this.index = indexNum;
    this.Subject = subjectStr;
    this.Writer = writerStr;
    this.Realwriter = writerStr;
    this.Content = contentStr;
    this.Password = passwordStr;
    this.date = recordDate();
    this.views = -1;
    this.refresh = false;
    this.anonymous = false;
    this.public = false;
  }

  // 값 설정시 빈 값 체크
  set Subject(value) {
    if (value.length === 0) throw new Error("제목을 입력해주세요.");
    this.subject = value;
  }

  set Writer(value) {
    if (value.length === 0) throw new Error("이름을 입력해주세요.");
    this.writer = value;
  }

  set Password(value) {
    if (value.length === 0 ) throw new Error("비밀번호를 입력해주세요.");
    this.password = value;
  }

  set Content(value) {
    if (value.length === 0) throw new Error("내용을 입력해주세요.");
    this.content = value;
  }
}

// 현재 날짜 반환 함수
const recordDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
  
    mm = (mm > 9 ? "" : 0) + mm;
    dd = (dd > 9 ? "" : 0) + dd;
  
    const arr = [yyyy, mm, dd];
  
    return arr.join("/");
  };
  
  // 글작성 버튼
  const submitHandler = (e) => {
    e.preventDefault();

    const subject = e.target.subject.value;
    const realwriter = e.target.writer.value;
    let writer = e.target.writer.value;
    const content = e.target.content.value;
    const password = e.target.password.value;

    // 익명 및 공개 스위치 상태 확인
    const anonymousSwitch = document.getElementById("anonymousSwitch").checked;
    const publicSwitch = document.getElementById("publicSwitch").checked;

    // 익명
    if (anonymousSwitch){
      writer = "익명";
    }
  
    try {
      // boards 가져오기
      const boardsObj = JSON.parse(localStorage.getItem("boards"));
  
      // 객체 추가
      const index = boardsObj.length;
      const instance = new Board(index, subject, writer, content, password);

      // 스위치 상태 반영
      instance.anonymous = anonymousSwitch;
      instance.public = publicSwitch;

      //이름 저장 (관리자만 볼수있음)
      instance.realwriter = realwriter

      boardsObj.push(instance);
  
      // boards 저장
      const boardsStr = JSON.stringify(boardsObj);
      localStorage.setItem("boards", boardsStr);

      // 페이지 이동
      location.href = "../board/view.html?index=" + index;
    } catch (e) {
      // 예외 발생시 메시지 출력
      alert(e.message);
      console.error(e);
    }
  };
  
  writeFrm.addEventListener("submit", submitHandler);