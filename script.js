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
const copy_products=structuredClone(products);
let currentProduct = null;
let selectedCategory="all"
let mimdinare_fasi=5000
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
function filterProducts(){
    let filtered=products;

    if (selectedCategory!=="all"){
         filtered=products.filter(products => products.category===selectedCategory)
    }

    filtered=filtered.filter(p =>{
        productis_fasi=parseFloat(p.price.replace(/[₾,\s]/g, ""))
        return productis_fasi <= mimdinare_fasi
    })
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
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
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
const slct=document.getElementById('sort-products')
if (slct){
slct.addEventListener('change',function (){
    const value=this.value
    if (value == "low"){
        let selected_low
        selected_low=copy_products.sort((a, b) => a.price.replace(/[₾,\s]/g, "") -b.price.replace(/[₾,\s]/g, ""))
        infosGamotana(selected_low)
    }
    if (value=='high'){
        let selected_high
        selected_high=copy_products.sort((a, b)=> b.price.replace(/[₾,\s]/g, "") -a.price.replace(/[₾,\s]/g, ""))
        infosGamotana(selected_high)
    }
    if (value == "default"){
        infosGamotana()
    }
});
}

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