let wishlist = [];

let Pounds = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

let Euro = new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// mount event
window.onload = function () {
    // base64 encode
    // Products.map(product => {
    //     var encoded = btoa(JSON.stringify(product));

    //     return {
    //         ...product,
    //         "Product Link": `${window.location.origin}?product=${encoded}`
    //     };
    // });

    wishlist = JSON.parse(localStorage.getItem('wishlist')) ?? [];
    const url = new URL(window.location.href);
    const productBase64 = url.searchParams.get('product');

    if (productBase64) {
        // base64 decode
        const product = JSON.parse(atob(productBase64));

        if (typeof product === 'object' && product['Unique Number']) {
            const isProductExist = wishlist.findIndex((item) => item.id === product['Unique Number']);
            // if doesn't exist
            if (isProductExist === -1) {
                wishlist = [product, ...wishlist];
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
            }
        }
    }

    renderWishlist();
}

function handleRemove(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
}

function renderWishlist() {
    let grid = document.querySelector('.grid');
    grid.innerHTML = '';

    wishlist.forEach((product) => {
        grid.innerHTML += `<div class="item">
            <img src="assets/imgs/${product['Image Name']}" alt="${product['Product Name']}" />
            <h5>${product['Product Name']}</h5>
            <h5>${Euro.format(product['Price EU'])}</h5>
            <div class="x-btn" onClick='handleRemove("${product['Unique Number']}")'>
                <i class="fa fa-times"></i>
            </div>
        </div>`
    });
}