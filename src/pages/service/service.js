import './service.css';

/* 초기 설정 */
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let isErasing = false;
let history = [];
let redoStack = [];

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

/* 이벤트 리스너 */
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

document.getElementById('pencilButton').addEventListener('click', () => {
    isErasing = false;
    ctx.strokeStyle = '#fff'; // 연필 색상 흰색
});

document.getElementById('eraserButton').addEventListener('click', () => {
    isErasing = true;
    ctx.strokeStyle = '#000'; // 배경색과 동일하게 설정
    ctx.lineWidth = 20; // 지우개 크기 설정
});

document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('redoButton').addEventListener('click', redo);
document.getElementById('clearButton').addEventListener('click', clearCanvas);

/* 그리기 기능 */
function draw(event) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineCap = 'round'; 
    ctx.lineWidth = 4;

    ctx.lineTo(x, y);  
    ctx.stroke();

    ctx.beginPath();  
    ctx.moveTo(x, y);  
}

function startDrawing(event) {
    drawing = true;
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // 현재 상태 저장
    redoStack = []; // redo 스택 초기화
    draw(event); 
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // 경로 초기화
}

/* Undo/Redo 기능 */
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

/* 캔버스 초기화 */
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000'; // 배경 검은색으로 채우기
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    history = []; 
    redoStack = [];
    ctx.beginPath();  // 경로 초기화
    ctx.strokeStyle = isErasing ? '#000' : '#fff'; // 연필/지우개 색상 설정
}

/* 캔버스 초기화 */
function initializeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#000'; // 초기 배경 검은색 설정
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    pencilButton.click();
}

window.onload = initializeCanvas;

/* 텍스트 글자수 세기 */
const textArea = document.getElementById('user-text');
const charCountDisplay = document.getElementById('charCount');
textArea.addEventListener('input', () => {
    const currentLength = textArea.value.length;
    charCountDisplay.textContent = `${currentLength}/300`; // 글자수 표시
});

/* 버튼 아이콘 초기화 */
function resetToolIcons() {
    document.getElementById('pencilIcon').src = '/assets/icon/pencil.png';
    document.getElementById('eraserIcon').src = '/assets/icon/eraser.png';
    document.getElementById('undoIcon').src = '/assets/icon/undo.png';
    document.getElementById('redoIcon').src = '/assets/icon/redo.png';
    document.getElementById('clearIcon').src = '/assets/icon/clear.png';
}

/* 각 버튼별 아이콘 설정 */
document.getElementById('pencilButton').addEventListener('mousedown', () => {
    resetToolIcons();
    document.getElementById('pencilIcon').src = '/assets/icon/pencil_active.png';
});

document.getElementById('eraserButton').addEventListener('mousedown', () => {
    resetToolIcons();
    document.getElementById('eraserIcon').src = '/assets/icon/eraser_active.png';
});

document.getElementById('undoButton').addEventListener('mousedown', () => {
    resetToolIcons();
    document.getElementById('undoIcon').src = '/assets/icon/undo_active.png';
});

document.getElementById('redoButton').addEventListener('mousedown', () => {
    resetToolIcons();
    document.getElementById('redoIcon').src = '/assets/icon/redo_active.png';
});

document.getElementById('clearButton').addEventListener('mousedown', () => {
    resetToolIcons();
    document.getElementById('clearIcon').src = '/assets/icon/clear_active.png';
});

const generatedImage = document.getElementById('generated-image');
const instructionText = document.querySelector('.image-container > span');
const loadingAnimation = document.getElementById('loading-animation');

/* 이미지 저장 */
document.getElementById('download-button').addEventListener('click', (event) => {
    event.preventDefault(); 

    if (generatedImage.style.display !== 'none' && generatedImage.src) {
        const newWindow = window.open(generatedImage.src);
        newWindow.focus(); 
    } else {
        alert("저장할 이미지가 없습니다. 이미지를 먼저 생성하세요.");
    }
});

/* 이미지 로딩 애니메이션 */
document.querySelector('.created_btn').addEventListener('click', async () => {
    // 기존 캔버스 내용을 Blob으로 변환
    const scatchImgBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    // Blob을 512x512 크기로 리사이즈
    const resizedBlob = await resizeImageTo512(scatchImgBlob);

    const formatData = new FormData();
    formatData.append('image', resizedBlob, 'scatch.png');
    formatData.append('prompt', document.getElementById('user-text').value);

    try {
        instructionText.style.display = 'none';
        loadingAnimation.style.display = 'block';
        generatedImage.style.display = 'none'; 
    
        const response = await fetch('http://192.168.0.141:28000/generate-image', {
            method: 'POST', 
            body: formatData
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        // response.blob()는 비동기 함수이므로 await로 처리해야 함
        const responseBlob = await response.blob(); // await 추가
        const responseImgUrl = URL.createObjectURL(responseBlob);
    
        // 로딩 애니메이션 종료 후 이미지 표시
        loadingAnimation.style.display = 'none';
        generatedImage.src = responseImgUrl;
        generatedImage.style.display = 'block';
        
    } catch (e) {
        console.error('Error', e);
        loadingAnimation.style.display = 'none'; // 오류 발생 시에도 로딩 애니메이션 숨김
        instructionText.style.display = 'block'; // 오류 시 안내 텍스트 다시 표시
    }    
});

function resizeImageTo512(blob) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);
        img.src = url;

        img.onload = () => {
            // 512x512 크기의 새로운 캔버스 생성
            const resizedCanvas = document.createElement('canvas');
            resizedCanvas.width = 512;
            resizedCanvas.height = 512;
            const resizedCtx = resizedCanvas.getContext('2d');

            // 기존 이미지를 512x512 크기로 리사이즈하여 새로운 캔버스에 그리기
            resizedCtx.drawImage(img, 0, 0, 512, 512);

            // 리사이즈된 캔버스를 Blob으로 변환
            resizedCanvas.toBlob(resizedBlob => {
                resolve(resizedBlob);  // 변환된 Blob 반환
                URL.revokeObjectURL(url);  // 메모리 해제
            }, 'image/png');
        };

        img.onerror = () => {
            reject(new Error("이미지 로딩 중 오류 발생"));
        };
    });
}

/* 이미지에 마우스 오버 시 버튼 표시 */
const bottomButtons = document.querySelector('.bottom-image-buttons');
generatedImage.addEventListener('mouseover', () => {
    bottomButtons.style.opacity = '1';
    bottomButtons.style.pointerEvents = 'auto';
});

generatedImage.addEventListener('mouseout', () => {
    bottomButtons.style.opacity = '0';
    bottomButtons.style.pointerEvents = 'none';
});
