var MAX_INITIAL_QUANTITY = 100;
var PRODUCTS = [
    {
        id: 1,
        name: 'Màn hình',
        price: 2000000,
        quantity: 100
    },
    {
        id: 2,
        name: 'Bàn phím',
        price: 500000,
        quantity: 150
    },
    {
        id: 3,
        name: 'Chuột',
        price: 450000,
        quantity: 58
    },
    {
        id: 4,
        name: 'Tai nghe',
        price: 650000,
        quantity: 52
    },
    {
        id: 5,
        name: 'Dây sạc',
        price: 250000,
        quantity: 27
    },
    {
        id: 6,
        name: 'Lót chuột',
        price: 350000,
        quantity: 58
    },
]
var CARTS = [];

if (document.state == 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function initData() {
    var productElement = document.querySelector('#product tbody');
    function getProductTemplate(product) {
        return `
            <tr>
                <th class="table-id">
                    <span class="shop-item-id">${product.id}</span>
                </th>
                <th class="table-name">
                    <span class="shop-item-title">${product.name}</span>
                </th>
                <th class="table-price">
                    <span class="shop-item-price">${product.price}</span>
                </th>
                <th class="table-quantity">
                    <span class="shop-item-quantity">${product.quantity}</span>
                </th>
                <th class="table-function">
                    <button class="btn btn-primary shop-item-button" type="button" data-id="${product.id}">Thêm</button>
                </th>
            </tr>
        `
    }
    productElement.innerHTML = '';
    var productsTemplate = '';
    PRODUCTS.forEach(function (product) {
        productsTemplate += getProductTemplate(product);
    });
    productElement.innerHTML = productsTemplate

    var buttonAdd = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < buttonAdd.length; i++) {
        var button = buttonAdd[i]
        button.addEventListener('click', onAddProduct, false)
    }
}
function init() {
    initData()
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', onClickPurchase)
}

function onAddProduct() {
    var targetProduct = PRODUCTS.find(product => product.id.toString() === this.getAttribute('data-id'))

    addToCart(targetProduct)
    getTotal()
}

function onRemoveProduct(event) {
    var buttonClicked = event.target
    console.log(buttonClicked.getAttribute('data-id'))
    var filteredCarts = CARTS.filter(p => p.id.toString() !== buttonClicked.getAttribute('data-id'))
    CARTS = filteredCarts;
    buttonClicked.parentElement.parentElement.remove()
    getTotal()
}



function onClickPurchase() {
    if (CARTS.length > 0) {
        alert('Cám ơn bạn đã mua hàng')
        var cartItems = document.getElementById('cart_items')
        cartItems.innerHTML = '';
        CARTS.length = 0;
        getTotal()
    } else {
        alert('Vui lòng chọn sản phẩm')
    }
}

function addToCart(targetProduct) {
    if (!targetProduct) {
        return
    }
    var existProduct = CARTS.some(pCart => pCart.id === targetProduct.id)
    if (existProduct) {
        CARTS.map(function (item) {
            if (item.id === targetProduct.id) {
                item.quantity += 1
                var currentInput = document.getElementById('cart_item_' + item.id);
                if (parseInt(currentInput.value) < parseInt(currentInput.getAttribute('max'))) {
                    currentInput.value = parseInt(currentInput.value) + 1
                    getTotal();
                } else {
                    alert('So luong san pham con lai khong du ')
                }
            }
        })
    } else {
        var cartItems = document.getElementById('cart_items')

        function getProductCartRowTemplate(p) {
            var cartRow = document.createElement('div')
            cartRow.classList.add('cart-row')
            cartRow.innerHTML = `
                    <div class="cart-item cart-column">
                        <span class="cart-item-id">${p.id}</span>
                    </div>

                    <div class="cart-item cart-column">
                        <span class="cart-item-title">${p.name}</span>
                    </div>

                    <span class="cart-price cart-column">${p.price}</span>
                    <div class="cart-quantity cart-column"></div>
                `

            var cartRowQuantity = cartRow.querySelector('.cart-quantity')

            var quantityInput = document.createElement('input')
            quantityInput.classList.add('cart-quantity-input')
            quantityInput.id = 'cart_item_' + p.id
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.max = p.quantity;
            quantityInput.addEventListener('change', function () {
                var newQuantity = event.target.value
                console.log("getProductCartRowTemplate -> newQuantity", newQuantity)
                CARTS.map(pCart => {
                    if (pCart.id === p.id) {
                        if (isNaN(event.target.value) || event.target.value <= 0) {
                            alert('So luong san pham khong hop le')
                            event.target.value = 1
                            pCart.quantity = 1
                        } else if (event.target.value > p.quantity) {

                            alert('So luong san pham con lai khong du ')
                            event.target.value = p.quantity;
                            pCart.quantity = p.quantity;
                        } else {
                            pCart.quantity = parseInt(newQuantity)
                        }
                    }
                })
                getTotal()
            }, false)

            var btnDel = document.createElement('button')
            btnDel.classList.add('btn', 'btn-danger', 'cart-remove')
            btnDel.type = 'button';
            btnDel.innerText = 'Xóa'
            btnDel.addEventListener('click', function () {
                console.log('Delete', p.id)
                var filteredCarts = CARTS.filter(pCart => pCart.id !== p.id)
                CARTS = filteredCarts;
                btnDel.parentElement.parentElement.remove()
                getTotal()
            }, false)

            cartRowQuantity.append(quantityInput)
            cartRowQuantity.append(btnDel)

            return cartRow;
        }

        cartItems.append(getProductCartRowTemplate(targetProduct))
        var newCartItem = Object.assign({}, targetProduct)
        newCartItem.quantity = 1;
        CARTS.push(newCartItem);
        getTotal();
    }
}

function getTotal() {
    var total = 0;
    CARTS.map(product => {
        total += (product.price * product.quantity)
    })
    document.getElementsByClassName('cart-total-price')[0].innerText = total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

