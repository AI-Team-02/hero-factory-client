import './index.css';

/*  마우스커서 커스텀1 ***/
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});


/* 캐릭터 움직임 */
// 눈썹, 눈동자, 입 요소 가져오기
const eyebrows = document.querySelector('.eyebrows img');
const eyes = document.querySelector('.eyes img');
const mouth = document.querySelector('.mouth img');

// 화면 중앙 기준 좌표 설정
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// 마우스 움직임 감지
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 눈썹 움직임: 위아래로만 움직이도록 설정
    const eyebrowsMoveY = (mouseY - centerY) / 40;  // 더 작은 값으로 조정하여 움직임 감소
    eyebrows.style.transform = `translateY(${eyebrowsMoveY}px)`;

    // 눈동자 움직임: 마우스를 따라 좌우 다르게 이동
    let eyesMoveX;
    if (mouseX > centerX) {
        // 마우스가 화면 중앙보다 오른쪽일 때
        eyesMoveX = (mouseX - centerX) / 120;  // 오른쪽으로 적게 움직이도록 설정
    } else {
        // 마우스가 화면 중앙보다 왼쪽일 때
        eyesMoveX = (mouseX - centerX) / 40;  // 왼쪽으로 많이 움직이도록 설정
    }
    const eyesMoveY = (mouseY - centerY) / 60;  // 위아래 움직임은 적게
    eyes.style.transform = `translate(${eyesMoveX}px, ${eyesMoveY}px)`;

    // 입 움직임: 위아래로만 움직이도록 설정
    const mouthMoveY = (mouseY - centerY) / 50;  // 움직임 감소
    mouth.style.transform = `translateY(${mouthMoveY}px)`;

});



/* 스파라이트 시트 모달 윈도우 */
// 모달 관련 요소 가져오기
const modal = document.getElementById("sprite-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close");

// 모든 스프라이트 이미지에 클릭 이벤트 추가
const spriteImages = document.querySelectorAll('.sprite-img');
spriteImages.forEach(img => {
    img.addEventListener('click', function () {
        modalImg.src = this.src; // 클릭한 이미지의 src를 모달에 설정

        // 모달을 먼저 표시한 후에 애니메이션 적용
        modal.style.display = "flex"; // 모달을 먼저 화면에 표시
        setTimeout(() => {
            modal.classList.add('show'); // 애니메이션 클래스 추가
        }, 10); // 약간의 지연을 주어 애니메이션 적용
    });
});

// 모달 창 닫기 (닫기 버튼 클릭 시)
closeModal.onclick = function () {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none"; // 애니메이션이 끝난 후 모달을 숨기기
    }, 500); // 애니메이션 시간 후에 모달을 닫음
}

// 모달 창 닫기 (모달 바탕 또는 이미지를 클릭할 때)
window.onclick = function (event) {
    if (event.target == modal || event.target == modalImg) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none"; // 애니메이션 후 모달 숨기기
        }, 500);
    }
}


/* 네비게이션 모달윈도우 모바일에서 */
const menuBtn = document.getElementById('menu-btn');
const navModal = document.getElementById('nav-modal');

menuBtn.addEventListener('click', () => {
    navModal.classList.toggle('show');
});

navModal.addEventListener('click', (event) => {
    if (event.target === navModal) {
        navModal.classList.remove('show');
    }
});


