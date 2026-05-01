const products=[
    {
        id:1,
        name:"Pro Gaming Laptop V2",
        price: "4500₾",
        category:"laptops",
        main_image: "laptop.webp",
        image1:'image1.avif',
        image2:'image2-removebg-preview.png',
        image3:'image3-removebg-preview.png',
        descr:"მაგარი ლეპტოპია"
    },
    {
        id:2,
        name:"Wireless ANC Headphones",
        price:"850₾",
        category: "audio",
        main_image: "headpones-removebg-preview.png",
        image1:'headpone1-removebg-preview.png',
        image2:'headponeimage2-removebg-preview.png',
        image3:'headponeimage3-removebg-preview.png',
        descr:"მაგარი ყურსასმენია"
    },
    {
        id:3,
        name:"iPhone 15 Pro Max",
        price: "3850₾",
        category: "phones",
        main_image:"download-removebg-preview.png",
        image1:'phoneimage1-removebg-preview.png',
        image2:'phoneimage2-removebg-preview.png',
        image3:'phoneimages3-removebg-preview.png',
        descr:"მაგარი აიფონია"
    },
    {
        id:4,
        name:"Ultra Wide Monitor",
        price: "1,500 ₾",
        category: "accessories",
        main_image: "istockphoto-2191351159-612x612-removebg-preview.png",
        image1:'monitorimage1-removebg-preview.png',
        image2:'monitorimage2-removebg-preview.png',
        image3:'monitorimage3-removebg-preview.png',
        descr:"მაგარი მონიტორია"
    }
]
let currentProduct = null;
let selectedCategory="all"
function back_to_min(){
    document.getElementById('detail-main-img').src=currentProduct.main_image
}
function image1_transform_to_main(imgid1){
    const imgSrc=document.getElementById(imgid1).src
    document.getElementById('detail-main-img').src=imgSrc
}
function image2_transform_to_main(imgid2){
    const imgSrc=document.getElementById(imgid2).src
    document.getElementById('detail-main-img').src=imgSrc
}
function image3_transform_to_main(imgid3){
    const imgSrc=document.getElementById(imgid3).src
    document.getElementById('detail-main-img').src=imgSrc
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
    let filtered;
    if (selectedCategory==="all"){
        filtered=products
    }
    else{
        filtered=products.filter(products => products.category===selectedCategory)
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