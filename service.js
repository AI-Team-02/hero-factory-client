

/* 툴바 */
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let isErasing = false;
let history = [];
let redoStack = [];

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

document.getElementById('pencilButton').addEventListener('click', function() {
    isErasing = false;
    ctx.strokeStyle = '#ffffff'; // 연필 색상
});

document.getElementById('eraserButton').addEventListener('click', function() {
    isErasing = true;
    ctx.strokeStyle = '#070B13'; // 배경색과 동일하게 설정
});

document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('redoButton').addEventListener('click', redo);
document.getElementById('clearButton').addEventListener('click', clearCanvas);


document.getElementById('eraserButton').addEventListener('click', function() {
    isErasing = true;
    ctx.strokeStyle = '#070B13'; // 배경색과 동일하게 설정
    ctx.lineWidth = 20; // 지우개 크기 조절
});









/* 캔버스 */
function draw(event) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 새로운 경로를 시작하기 전에 설정
    ctx.lineCap = 'round'; 
    ctx.lineWidth = 4;

    ctx.lineTo(x, y);  
    ctx.stroke();

    ctx.beginPath();  // 경로를 초기화하고 새롭게 시작
    ctx.moveTo(x, y);  
}

function startDrawing(event) {
    drawing = true;
    // 백그라운드 그리드를 저장하는 대신 처음에만 호출
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // 현재 상태 저장
    redoStack = []; // redo 스택 초기화
    draw(event); 
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // 그리기 종료 시 새로운 경로 초기화
}

function undo() {
    if (history.length > 0) {
        redoStack.push(history.pop());
        if (history.length > 0) {
            ctx.putImageData(history[history.length - 1], 0, 0);
        } else {
            clearCanvas();
        }
    }
}

function redo() {
    if (redoStack.length > 0) {
        const imageData = redoStack.pop();
        history.push(imageData);
        ctx.putImageData(imageData, 0, 0);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history = []; 
    redoStack = []; 
}








// /* 그림판 커서변경 */
// function changeCursor(icon) {
//     document.body.style.cursor = `url(${icon}), auto`;
// }

// // 연필 버튼 클릭 시
// document.getElementById('pencilButton').addEventListener('click', function() {
//     changeCursor('icon/pencil.png'); // 연필 아이콘으로 커서 변경
// });

// // 지우개 버튼 클릭 시
// document.getElementById('eraserButton').addEventListener('click', function() {
//     changeCursor('icon/eraser.png'); // 지우개 아이콘으로 커서 변경
// });

// // 다른 버튼 클릭 시 기본 커서로 변경
// document.getElementById('undoButton').addEventListener('click', function() {
//     document.body.style.cursor = 'auto'; // 기본 커서로 변경
// });
// document.getElementById('redoButton').addEventListener('click', function() {
//     document.body.style.cursor = 'auto'; // 기본 커서로 변경
// });
// document.getElementById('clearButton').addEventListener('click', function() {
//     document.body.style.cursor = 'auto'; // 기본 커서로 변경
// });








/* 글자수 세기 */
const textArea = document.getElementById('user-text');
const charCountDisplay = document.getElementById('charCount');
textArea.addEventListener('input', function() {
    const currentLength = textArea.value.length;
    charCountDisplay.textContent = `${currentLength}/300`; // 0/300 형식으로 출력
});








/*   버튼 초기화     */
function resetToolIcons() {
    document.getElementById('pencilIcon').src = 'icon/pencil.png';
    document.getElementById('eraserIcon').src = 'icon/eraser.png';
    document.getElementById('undoIcon').src = 'icon/undo.png';
    document.getElementById('redoIcon').src = 'icon/redo.png';
    document.getElementById('clearIcon').src = 'icon/clear.png';
}


document.getElementById('pencilButton').addEventListener('mousedown', function() {
    resetToolIcons(); // 모든 아이콘을 기본 상태로 되돌림
    document.getElementById('pencilIcon').src = 'icon/pencil_active.png'; // 연필 아이콘 active 상태로 변경
});

document.getElementById('eraserButton').addEventListener('mousedown', function() {
    resetToolIcons();
    document.getElementById('eraserIcon').src = 'icon/eraser_active.png'; // 지우개 아이콘 active 상태로 변경
});

document.getElementById('undoButton').addEventListener('mousedown', function() {
    resetToolIcons();
    document.getElementById('undoIcon').src = 'icon/undo_active.png'; // 되돌리기 아이콘 active 상태로 변경
});

document.getElementById('redoButton').addEventListener('mousedown', function() {
    resetToolIcons();
    document.getElementById('redoIcon').src = 'icon/redo_active.png'; // 다음으로 아이콘 active 상태로 변경
});

document.getElementById('clearButton').addEventListener('mousedown', function() {
    resetToolIcons();
    document.getElementById('clearIcon').src = 'icon/clear_active.png'; // 모두 지우기 아이콘 active 상태로 변경
});







/* 캠버스 패턴 모눈종이 그리기 */
function drawGrid(ctx, width, height, gridSize) {
    ctx.strokeStyle = '#23252E'; // 모눈선 색상
    ctx.lineWidth = 0.5; // 모눈선 두께

    // 가로선 그리기
    for (let x = gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // 세로선 그리기
    for (let y = gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// 캔버스 초기화 및 모눈 패턴 그리기
function initializeCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 모눈 패턴 그리기
    drawGrid(ctx, canvas.width, canvas.height, 20); // 간격의 모눈
}

// 페이지 로드 후 캔버스 초기화
window.onload = function() {
    initializeCanvas();
};


/* 모눈 계속 보이게 */
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history = [];
    redoStack = [];
    
    // 모눈 패턴을 다시 그린 후 경로 초기화
    drawGrid(ctx, canvas.width, canvas.height, 20);
    
    ctx.beginPath();  // 경로를 초기화하여 직선 문제가 발생하지 않도록 처리

    // 연필 색상 초기화 (흰색으로 설정)
    if (!isErasing) {
        ctx.strokeStyle = '#ffffff'; // 연필 기본 색상 설정
    }
}






/* 로딩중------------------- */
document.querySelector('.created_btn').addEventListener('click', function() {
    const instructionText = document.querySelector('.image-container > span'); // 안내 문구 선택
    const loadingAnimation = document.getElementById('loading-animation');
    const generatedImage = document.getElementById('generated-image');
    
    // 안내 문구 숨기기
    instructionText.style.display = 'none';
    
    // 로딩 애니메이션 표시
    loadingAnimation.style.display = 'block';
    generatedImage.style.display = 'none';  // 이미지는 숨기기

    // 4초 후 로딩 애니메이션을 숨기고 이미지 표시
    setTimeout(function() {
        loadingAnimation.style.display = 'none';  // 로딩 애니메이션 숨기기
        generatedImage.style.display = 'block';   // 이미지 표시
    }, 7000);  // 4초 후 이미지 표시
});





/********************************오버시 나오는 바텀*************************** */

const generatedImage = document.getElementById('generated-image');
const bottomButtons = document.querySelector('.bottom-image-buttons');
const loadingAnimation = document.getElementById('loading-animation'); // 로딩 애니메이션 요소

// 이미지가 생성될 때만 마우스 오버 이벤트 활성화
document.querySelector('.created_btn').addEventListener('click', function() {
    // 이미지와 버튼을 숨기고 로딩 애니메이션을 표시
    generatedImage.style.display = 'none';
    bottomButtons.style.opacity = '0'; // 버튼 숨기기
    bottomButtons.style.pointerEvents = 'none'; // 클릭 불가 상태
    loadingAnimation.style.display = 'block'; // 로딩 애니메이션 표시

    // 로딩이 완료된 후 이미지 표시 및 로딩 애니메이션 제거
    setTimeout(function() {
        loadingAnimation.style.display = 'none'; // 로딩 애니메이션 숨기기
        generatedImage.style.display = 'block'; // 이미지가 생성됨
        
        // 마우스 오버 이벤트 활성화 (이미지 생성 후)
        generatedImage.addEventListener('mouseover', function() {
            bottomButtons.style.opacity = '1'; // 마우스 오버 시 버튼 표시
            bottomButtons.style.pointerEvents = 'auto'; // 클릭 가능하게
        });

        bottomButtons.addEventListener('mouseover', function() {
            bottomButtons.style.opacity = '1';
            bottomButtons.style.pointerEvents = 'auto';
        });

        // 이미지와 버튼에서 마우스가 나가면 버튼 숨기기
        generatedImage.addEventListener('mouseout', function() {
            bottomButtons.style.opacity = '0';
            bottomButtons.style.pointerEvents = 'none';
        });

        bottomButtons.addEventListener('mouseout', function() {
            bottomButtons.style.opacity = '0';
            bottomButtons.style.pointerEvents = 'none';
        });
    }, 3000); // 예: 3초 후에 로딩 완료
});


/* 이미지 생성되고 마우스 오버하면 대충 나오는 버튼 끝 **********/


/*****************************************************끝 */

/*  저장 */
document.getElementById('download-button').addEventListener('click', function(event) {
    event.preventDefault(); // 페이지 리로드 방지
    const generatedImage = document.getElementById('generated-image');

    // 이미지가 로드되었는지 확인
    if (generatedImage.style.display !== 'none' && generatedImage.src) {
        // 새 창을 열고 이미지 다운로드 링크 제공
        const newWindow = window.open(generatedImage.src);
        newWindow.focus(); // 새 창에서 이미지 표시
    } else {
        alert("저장할 이미지가 없습니다. 이미지를 먼저 생성하세요.");
    }
});
    










