/*****옵션기능***************** */
document.addEventListener("DOMContentLoaded", function() {
    const colorSelectBox = document.getElementById('color-select-box');
    const selectedOptionsContainer = document.getElementById('selected-options-container');
    const productTitle = document.querySelector('.product-title').textContent;
    const totalPrice = document.getElementById('total-price');
    const totalQuantity = document.getElementById('total-quantity');

    colorSelectBox.addEventListener('change', function() {
        const selectedOption = colorSelectBox.value;
        if (selectedOption !== "- [필수] 옵션을 선택해 주세요 -") {
            const existingOption = selectedOptionsContainer.querySelector(`[data-option="${selectedOption}"]`);
            if (existingOption) {
                const quantityInput = existingOption.querySelector(".quantity-selector");
                quantityInput.value = parseInt(quantityInput.value) + 1;
            } else {
                addOption(selectedOption);
            }
            colorSelectBox.value = "- [필수] 옵션을 선택해 주세요 -";
            updateTotal();
        }
    });

    function addOption(optionText) {
        selectedOptionsContainer.style.display = "block";
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        optionItem.setAttribute("data-option", optionText);

        optionItem.innerHTML = `
            <span>${productTitle} - ${optionText}</span>
            <div>
                <input type="number" value="1" min="1" class="quantity-selector">
                <span class="remove-option" onclick="removeOption(this)">✖</span>
                <span class="option-price" data-price="63000">63,000원</span>
            </div>
        `;
        selectedOptionsContainer.appendChild(optionItem);
        optionItem.querySelector('.quantity-selector').addEventListener('change', updateTotal);
    }

    window.removeOption = function(element) {
        element.closest('.option-item').remove();
        if (selectedOptionsContainer.querySelectorAll('.option-item').length === 0) {
            selectedOptionsContainer.style.display = "none";
        }
        updateTotal();
    };

    function updateTotal() {
        const quantityInputs = selectedOptionsContainer.querySelectorAll('.quantity-selector');
        let totalQuantityValue = 0;
        let totalPriceValue = 0;
        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value, 10) || 0;
            const pricePerItem = parseInt(input.closest('.option-item').querySelector('.option-price').getAttribute("data-price"));
            totalQuantityValue += quantity;
            totalPriceValue += quantity * pricePerItem;
        });
        totalQuantity.textContent = `(${totalQuantityValue}개)`;
        totalPrice.textContent = `${totalPriceValue.toLocaleString()}원`;
        if (totalQuantityValue === 0) {
            totalQuantity.textContent = `(0개)`;
            totalPrice.textContent = `0원`;
        }
    }
});






/*************** 관심상품 등록  */
document.addEventListener("DOMContentLoaded", function() {
    const wishlistModal = document.getElementById("wishlistModal");
    const continueShoppingBtn = document.getElementById("continueShopping");
    const closeBtn = document.querySelector(".modal .close");
    const heartButton = document.querySelector(".heart-button"); // 관심상품 등록 버튼


    heartButton.addEventListener("click", function() {
        wishlistModal.style.display = "block";
    });

 
    continueShoppingBtn.addEventListener("click", function() {
        wishlistModal.style.display = "none";
    });


    closeBtn.addEventListener("click", function() {
        wishlistModal.style.display = "none";
    });


    window.addEventListener("click", function(event) {
        if (event.target === wishlistModal) {
            wishlistModal.style.display = "none";
        }
    });
});






/*********************** 구매하기 모달창 ****************************** */
document.addEventListener("DOMContentLoaded", function() {
    var purchaseModal = document.getElementById("purchaseModal");
    var buyButton = document.getElementById("buyButton");
    var closePurchaseButton = document.querySelector(".close-purchase");

    buyButton.onclick = function() {
        purchaseModal.style.display = "block";
    };

    closePurchaseButton.onclick = function() {
        purchaseModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == purchaseModal) {
            purchaseModal.style.display = "none";
        }
    };
});



/* 구매하기  모달 플러스 마이너스 기능 */
document.addEventListener('DOMContentLoaded', function() {
    const quantityIncreaseButton = document.querySelector('.quantity-increase');
    const quantityDecreaseButton = document.querySelector('.quantity-decrease');
    const quantityInput = document.querySelector('.quantity-input');
    const totalPriceElement = document.querySelector('.total-price'); // 총 가격을 표시할 요소

    quantityIncreaseButton.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
        updateTotalPrice(quantityInput.value);
    });

    quantityDecreaseButton.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
            updateTotalPrice(quantityInput.value);
        }
    });

    function updateTotalPrice(quantity) {
        const unitPrice = 48000; // 단가 설정
        const totalPrice = unitPrice * quantity;
        totalPriceElement.textContent = `${totalPrice.toLocaleString()}원 (${quantity}개)`;
    }
});



/********이미지 변경************* */
document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.querySelector('.product-image img'); // 큰 이미지
    const thumbnails = document.querySelectorAll('.thumbnail-images img'); // 썸네일 이미지들

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src; // 썸네일의 src를 큰 이미지로 설정
        });
    });
});

/**** 작은이미지 */
document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.product-image img');

    // 초기 상태: 첫 번째 썸네일 선택
    thumbnails[0].classList.add('selected');
    mainImage.src = thumbnails[0].src;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // 기존 선택된 썸네일에서 selected 클래스 제거 (여러 번 클릭 시 오류 방지)
            thumbnails.forEach(img => img.classList.remove('selected'));

            // 클릭된 썸네일에 selected 클래스 추가
            this.classList.add('selected');

            // 메인 이미지 업데이트
            mainImage.src = this.src;
        });
    });
});
