// 선택한 항목 삭제하기
function deleteSelectedItems() {
    const selectedItems = document.querySelectorAll('.item-checkbox:checked');
    if (selectedItems.length > 0 && confirm("선택한 상품을 삭제하시겠습니까?")) {
        selectedItems.forEach(item => item.closest('tr').remove());
    }
}

// 관심상품 비우기 기능
function clearWishlist() {
    if (confirm("관심상품을 모두 삭제하시겠습니까?")) {
        document.getElementById('wishlistItems').innerHTML = '';
    }
}

// 개별 삭제 버튼 기능
function confirmDeleteItem(button) {
    if (confirm("이 상품을 삭제하시겠습니까?")) {
        button.closest('tr').remove();
    }
}
