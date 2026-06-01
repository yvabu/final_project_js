const products=[
    {
        id:1,
        name:"Pro Gaming Laptop V2",
        price: "4500₾",
        category:"laptops",
        main_image: "images/laptop.webp",
        image1:'images/image1.avif',
        image2:'images/image2-removebg-preview.png',
        image3:'images/image3-removebg-preview.png',
        descr:"მაგარი ლეპტოპია",
        garantia:'5 წლიანი ოფიციალური'
    },
    {
        id:2,
        name:"Wireless ANC Headphones",
        price:"800₾",
        category: "audio",
        main_image: "images/headpones-removebg-preview.png",
        image1:'images/headpone1-removebg-preview.png',
        image2:'images/headponeimage2-removebg-preview.png',
        image3:'images/headponeimage3-removebg-preview.png',
        descr:"მაგარი ყურსასმენია",
        garantia:'3 წლიანი ოფიციალური'

    },
    {
        id:3,
        name:"iPhone 15 Pro Max",
        price: "3850₾",
        category: "phones",
        main_image:"images/download-removebg-preview.png",
        image1:'images/phoneimage1-removebg-preview.png',
        image2:'images/phoneimage2-removebg-preview.png',
        image3:'images/phoneimages3-removebg-preview.png',
        descr:"მაგარი აიფონია",
        garantia:'1 წლიანი ოფიციალური'
    },
    {
        id:4,
        name:"Ultra Wide Monitor",
        price: "1500 ₾",
        category: "accessories",
        main_image: "images/istockphoto-2191351159-612x612-removebg-preview.png",
        image1:'images/monitorimage1-removebg-preview.png',
        image2:'images/monitorimage2-removebg-preview.png',
        image3:'images/monitorimage3-removebg-preview.png',
        descr:"მაგარი მონიტორია",
        garantia:'2,5 წლიანი ოფიციალური'

    }
]
const mitanis_fasebi=[
    {
        tbilisi: 10,
        rustavi: 15,
        qutaisi: 20,
        zugdidi: 25,
        batumi:  30,
        sxva_qalaqebi: 35
    }
]
let currentProduct = null;
let selectedCategory="all"
let mimdinare_fasi=5000
let mtn_price=10
const promokodi='techstore123'
let discount=0
let selectedQuantity=1
function back_to_min(){
    document.getElementById('detail-main-img').src=currentProduct.main_image
}
function image1_transform_to_main(imgid1){
    const imgSrc=document.getElementById(imgid1).src
    document.getElementById('detail-main-img').src=imgSrc
    document.getElementsByClassName('product-thumb')[0].classList.add('active')
    document.getElementsByClassName('product-thumb')[1].classList.remove('active')
}
function image2_transform_to_main(imgid2){
    const imgSrc=document.getElementById(imgid2).src
    document.getElementById('detail-main-img').src=imgSrc
    document.getElementsByClassName('product-thumb')[0].classList.remove('active')
    document.getElementsByClassName('product-thumb')[2].classList.remove('active')
    document.getElementsByClassName('product-thumb')[1].classList.add('active')
}
function image3_transform_to_main(imgid3){
    const imgSrc=document.getElementById(imgid3).src
    document.getElementById('detail-main-img').src=imgSrc
    document.getElementsByClassName('product-thumb')[0].classList.remove('active')
    document.getElementsByClassName('product-thumb')[1].classList.remove('active')
    document.getElementsByClassName('product-thumb')[2].classList.add('active')
}

const filterButtons=document.querySelectorAll('.filter-btn')
filterButtons.forEach(button =>{
    button.addEventListener('click',function (){
        selectedCategory=this.dataset.category

        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        filterProducts()
    })
})
const slct=document.getElementById('sort-products')
if (slct){
    slct.addEventListener('change',function (){
        filterProducts()
    })
}

function filterProducts(){
    let filtered=products;

    if (selectedCategory!=="all"){
         filtered=products.filter(products => products.category===selectedCategory)
    }

    filtered=filtered.filter(p =>{
        productis_fasi=parseFloat(p.price.replace(/[₾,\s]/g, ""))
        return productis_fasi <= mimdinare_fasi
    })

     const value=slct.value
    if (value === "low") {
            filtered.sort((a, b) => {
                return parseFloat(a.price.replace(/[₾,\s]/g, "")) - parseFloat(b.price.replace(/[₾,\s]/g, ""));
            });
        } else if (value === "high") {
            filtered.sort((a, b) => {
                return parseFloat(b.price.replace(/[₾,\s]/g, "")) - parseFloat(a.price.replace(/[₾,\s]/g, ""));
            });
    }


    infosGamotana(filtered)
}

function infosGamotana(filteredProducts=products) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return; // უსაფრთხოებისთვის, თუ გვერდზე grid არ არის

    productGrid.innerHTML = "";
    filteredProducts.forEach(product => {
        const productHTML = `
           <div class="product-card" onclick="location.href='product-details.html?id=${product.id}'" style="cursor: pointer;">
             <div class="product-card-image">
               <img src="${product.main_image}" alt="${product.name}">  
             </div> 
             
             <div class="product-card-body">
               <span class="product-card-category">${product.category}</span>
               <h3 class="product-card-name">${product.name}</h3>  
             </div>
             
             <div class="product-card-footer">
                <div>
                  <span class="price-current" style="margin-left: 10px">${product.price}</span>
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id},'${product.name}','${product.price}','${product.main_image}')">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>   
                     </svg>
                </button>
             </div>         
           </div>
           `;
        productGrid.innerHTML += productHTML;
    });
}
function loadProductDetails(){
    const srch=new URLSearchParams(window.location.search)
    const productId= srch.get('id')

    if (productId){
        const product=products.find(p=> p.id==productId)
        if (product){
          const tname=document.getElementById('detail-name')
          const tprace=document.getElementById('detail-price')
          const tdesc=document.getElementById('detail-description')
          const timage=document.getElementById('detail-main-img')
          const timage1=document.getElementById('img1')
          const timage2=document.getElementById('img2')
          const timage3=document.getElementById('img3')
          const garant=document.getElementById('garanty')
          currentProduct=product
          if (tname){
              tname.innerText=product.name
          }
          if (tprace){
              tprace.innerText=product.price
          }
          if (tdesc){
              tdesc.innerText=product.descr
          }
          if (timage){
              timage.src=`${product.main_image}`
          }
          if (timage1){
              timage1.src=`${product.image1}`
          }
          if (timage2){
              timage2.src=`${product.image2}`
          }
          if (timage3){
              timage3.src=`${product.image3}`
          }
          if (garant){
              garant.innerText=product.garantia
          }

        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    infosGamotana();      // გაეშვება მთავარ გვერდზე
    loadProductDetails(); // გაეშვება დეტალების გვერდზე
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('cat');

    if (categoryFromUrl) {
        selectedCategory = categoryFromUrl;

        // ვიზუალურად ვააქტიურებთ შესაბამის ღილაკს Sidebar-ში
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            if (btn.dataset.category === categoryFromUrl) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        filterProducts(); // გავუშვათ ფილტრაცია
    } else {
        infosGamotana(); // თუ პარამეტრი არაა, გამოჩნდეს ყველა
    }

    loadProductDetails();
});
function burger_menu(){
    const body = document.body;
    const burgerBtn = document.getElementById('burger-menu');
    navigacia=document.getElementById('nav-links')
    if (navigacia.style.display=='block'){
        navigacia.style.display='none'
    }
    else{
        navigacia.style.display='block'
    }
    navigacia.classList.toggle('active');

    if (navigacia.classList.contains('active')) {
    // როცა მენიუ იხსნება
    body.style.overflow = 'hidden'; // საიტის სქროლვა ითიშება
    burgerBtn.innerText = '✕';       // ბურგერი ხდება X
    burgerBtn.style.color = 'var(--accent)';
  } else {
    // როცა მენიუ იხურება
    body.style.overflow = 'auto';   // საიტის სქროლვა ბრუნდება
    burgerBtn.innerText = '☰';       // ბურგერი ბრუნდება
    burgerBtn.style.color = '';
  }
}

function fasebis_chveneba(){
  document.getElementById('delivery-modal').style.display='flex'
  document.body.overflow='hidden'
}
function closeDeliveryModal(){
    document.getElementById('delivery-modal').style.display='none'
}
const card=document.getElementById('delivery-modal')
window.onclick=function(event){
    if (event.target == card){
        closeDeliveryModal()
    }
}
window.onkeydown=function (event){
    if (event.key=='Escape'){
        closeDeliveryModal()
    }
}
// დალაგება ფასების მიხედვით


const price_filtr=document.getElementById('price-filter')
const prc_limit=document.getElementById('price-limit')

if (price_filtr && prc_limit){
price_filtr.addEventListener('input',(event)=>{
    mimdinare_fasi=parseFloat(event.target.value)
    prc_limit.textContent=`${mimdinare_fasi} ₾`
    filterProducts()

});
}

function toggleCartModal(){
 const cartmodal=document.getElementById('cart-modal')
 const cartoveraly=document.getElementById('cart-overlay')

 if (cartmodal && cartoveraly){
     cartmodal.classList.toggle('open')
     cartoveraly.classList.toggle('open')
 }

}
document.addEventListener("DOMContentLoaded", () => {
   const kalatabtn = document.querySelector('.cart-btn');

   if (kalatabtn){
       kalatabtn.addEventListener('click', (event) => {
           event.preventDefault();
           toggleCartModal();
       });
   }
});

// წამოვიღოთ კალათა მეხსიერებიდან
let cart = JSON.parse(localStorage.getItem('tech_store_cart')) || [];

// 1. პროდუქტის კალათაში დამატება
function addToCart(id, name, price, image){
    // ფასიდან მოვაშოროთ ლარის ნიშანი და ჰარდ კოდირებული სფეისები
    let pric = typeof price === 'string' ? parseFloat(price.replace(/[₾,\s]/g, '')) : parseFloat(price);

    const arsebuli_producti = cart.find(item => item.id === id);
    if (arsebuli_producti){
        arsebuli_producti.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: pric,
            image: image,
            quantity: 1
        });
    }

    // შევინახოთ მეხსიერებაში
    localStorage.setItem('tech_store_cart', JSON.stringify(cart));

    // განვაახლოთ ვიზუალი და გამოვაჩინოთ კალათა
    updateCartUI();
    toggleCartModal();
}

// 2. კალათიდან ნივთის სრულად წაშლა
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('tech_store_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartPage();
}

// 3. რაოდენობის შეცვლა (+ და - ღილაკები)
function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    localStorage.setItem('tech_store_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartPage();
}

// 4. კალათის ვიზუალის ეკრანზე დახატვა
function updateCartUI() {
    const cartItemsModal = document.getElementById('cart-items-modal');
    const cartCountBadge = document.getElementById('cart-count');
    const modalTotalPrice = document.getElementById('modal-total-price');

    if (!cartItemsModal) return;

    if (cart.length === 0) {
        cartItemsModal.innerHTML = `
            <div class="cart-empty" style="text-align: center; padding: 40px 20px;">
                <p style="color: var(--text-secondary);">კალათა ცარიელია</p>
            </div>
        `;
        if (cartCountBadge) cartCountBadge.textContent = '0';
        if (modalTotalPrice) modalTotalPrice.textContent = '0.00 ₾';
        return;
    }

    let itemsHTML = '';
    let total = 0;
    let totalItemsCount = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItemsCount += item.quantity;

        itemsHTML += `
            <div class="cart-item" style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);">
                <div style="flex: 1;">
                    <h4 style="font-size: 14px; margin-bottom: 4px; color: var(--text-primary); max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</h4>
                    <span style="color: var(--accent); font-weight: 600; font-size: 13px;">${item.price.toFixed(2)} ₾</span>
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
                        <button onclick="changeQuantity(${item.id}, -1)" style="background: var(--bg-elevated); color: white; border: none; padding: 2px 8px; cursor: pointer; border-radius: 4px;">-</button>
                        <span style="font-size: 13px;">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" style="background: var(--bg-elevated); color: white; border: none; padding: 2px 8px; cursor: pointer; border-radius: 4px;">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: transparent; color: var(--red); border: none; cursor: pointer; font-size: 18px; margin-left: auto;">×</button>
            </div>
        `;
    });

    cartItemsModal.innerHTML = itemsHTML;
    if (cartCountBadge) cartCountBadge.textContent = totalItemsCount;
    if (modalTotalPrice) modalTotalPrice.textContent = total.toFixed(2) + ' ₾';
}

// გვერდის ჩატვირთვისას ავტომატურად განახლდეს კალათის UI
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

// ფუნქცია დეტალების გვერდიდან კალათაში დასამატებლად
function addToCartFromDetails() {

    if (!currentProduct) {
        console.error("პროდუქტის მონაცემები ვერ მოიძებნა!");
        return;
    }

    let pric = parseFloat(
        currentProduct.price.replace(/[₾,\s]/g, '')
    );

    const arsebuli_producti = cart.find(
        item => item.id === currentProduct.id
    );

    if (arsebuli_producti) {

        arsebuli_producti.quantity += selectedQuantity;

    } else {

        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: pric,
            image: currentProduct.main_image,
            quantity: selectedQuantity
        });

    }

    localStorage.setItem(
        'tech_store_cart',
        JSON.stringify(cart)
    );

    updateCartUI();

    toggleCartModal();

    // სურვილისამებრ რაოდენობის განულება
    selectedQuantity = 1;

    const qtyDisplay = document.getElementById('product-qty');

    if (qtyDisplay) {
        qtyDisplay.textContent = '1';
    }
}

// ფუნქცია სპეციალურად cart.html-ის დიდი ცხრილის შესავსებად
function renderCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const subtotalPrice = document.getElementById('subtotal-price');
    const totalItems = document.getElementById('cart-total-items');
    const prdprice=document.getElementById("prod-price")
    const miwfasi=document.getElementById("miwod-fasi")
    const daklebuli_procenti=document.getElementById("daklebuli-procenti")

    // თუ ამ გვერდზე (მაგალითად მთავარზე ხარ) ეს ელემენტი არ არსებობს, ფუნქცია გაჩერდეს
    if (!cartItemsContainer) return;

    // თუ კალათა ცარიელია
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 50px 0; color: var(--text-secondary);">
                <h2>შენი კალათა ცარიელია</h2>
                <a href="shop.html" style="color: var(--accent); text-decoration: underline; display: inline-block; margin-top: 15px;">მაღაზიაში დაბრუნება</a>
            </div>
        `;

        subtotalPrice.textContent = '0 ₾';
        totalPrice.textContent = '0 ₾';
        totalItems.textContent = '0 ნივთი';
        prdprice.textContent='0 ₾'
        miwfasi.textContent='0 ₾'
        daklebuli_procenti.textContent='0 ₾'
        return;
    }

    let tableHTML = '';
    let subtotal = 0;
    let itemCount = 0;
    let totalprice=0
    let prfasi=0
    let mw_fasi=0
    let discraod=0

    cart.forEach(item => {
        // თითოეული პროდუქტის საერთო ჯამი (ფასი გამრავლებული რაოდენობაზე)
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        itemCount += item.quantity;
        let discountAmount=subtotal *discount;
        let finalsubtotal=subtotal - discountAmount
        totalprice=finalsubtotal + mtn_price
        prfasi =itemTotal
        mw_fasi=mtn_price
        discraod=discountAmount


        tableHTML += `
            <div class="cart-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr; align-items: center; padding: 15px 0; border-bottom: 1px solid var(--border);">
                
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm);">
                    <span style="font-weight: 500; color: var(--text-primary);">${item.name}</span>
                </div>

                <div style="color: var(--text-primary);">${item.price.toFixed(2)} ₾</div>

                <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="changeQuantity(${item.id}, -1)" style="background: var(--bg-elevated); color: white; border: none; padding: 4px 10px; cursor: pointer; border-radius: 4px;">-</button>
                        <span style="font-weight: 600; color: var(--text-primary);">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" style="background: var(--bg-elevated); color: white; border: none; padding: 4px 10px; cursor: pointer; border-radius: 4px;">+</button>
                    </div>
                </div>

                <div style="color: var(--accent); font-weight: 600;">${itemTotal.toFixed(2)} ₾</div>

                <div>
                    <button onclick="removeFromCart(${item.id})" style="background: transparent; color: #ff4a4a; border: none; font-size: 20px; cursor: pointer;">×</button>
                </div>

            </div>
        `;
    });

    cartItemsContainer.innerHTML = tableHTML;

    subtotalPrice.textContent = subtotal.toFixed(2) + ' ₾';
    totalPrice.textContent =totalprice.toFixed(2)  + ' ₾'
    totalItems.textContent = `${itemCount} ნივთი`;
    prdprice.textContent=prfasi.toFixed(2) + '₾'
    miwfasi.textContent=mw_fasi.toFixed(2) + '₾'
    daklebuli_procenti.textContent=(discount * 100) +'%'


}
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
     const mitanis_fasi=document.getElementById('sort-products_price')

    if (mitanis_fasi){
        mitanis_fasi.addEventListener('change', function (){
            value=this.value
            if (value=='tbilisi'){
                mtn_price= mitanis_fasebi[0].tbilisi
            }
            if (value=='rustavi'){
                mtn_price=mitanis_fasebi[0].rustavi
            }
            if (value=='qutaisi'){
                mtn_price=mitanis_fasebi[0].qutaisi
            }
            if (value=='zugdidi'){
                mtn_price=mitanis_fasebi[0].zugdidi
            }
            if (value=='batumi'){
                mtn_price=mitanis_fasebi[0].batumi
            }
            if (value=='sxvaqal'){
                mtn_price=mitanis_fasebi[0].sxva_qalaqebi
            }

            renderCartPage();
        })
    }
});
function prm_kodi(){
    let inpt=document.getElementById('promokod').value
    if (inpt=== promokodi){
        if (discount>0){
            alert("პრომოკოდი უკვე აქტიურია!")
            return
        }
        alert("პრომო კოდი სწორია,თქვენ სარგებლობთ 40%-იანი ფასდაკლებით")
        discount=0.4

    }
    else {
        alert("პრომოკოდი არასწორია,ვერ ისარგებლებთ ფასდაკლებით")
        discount=0
    }
    renderCartPage();
}
document.addEventListener('DOMContentLoaded', () => {

    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const qtyDisplay = document.getElementById('product-qty');

    if (minusBtn && plusBtn && qtyDisplay) {

        minusBtn.addEventListener('click', () => {
            if (selectedQuantity > 1) {
                selectedQuantity--;
                qtyDisplay.textContent = selectedQuantity;
            }
        });

        plusBtn.addEventListener('click', () => {
            selectedQuantity++;
            qtyDisplay.textContent = selectedQuantity;
        });

    }
});
const searchinput=document.getElementById("search-input")
if (searchinput){
    searchinput.addEventListener("input",function (){
        searchvalue=this.value.toLowerCase().trim()
        filteredprdcts=products.filter(products =>{
            return(
                products.name.toLowerCase().includes(searchvalue)||
                products.category.toLowerCase().includes(searchvalue)||
                products.descr.toLowerCase().includes(searchvalue)
            )
        });
        infosGamotana(filteredprdcts);
    })
}