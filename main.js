// Tải dữ liệu từ tệp JSON
const courseApi = "shopshoes.json";
const productBlock = document.getElementById("list-product");

(function start() {
  getCourses();
})();

//functionsc

function getCourses() {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      var product = data.shoes;

      var htmls = product.map(function (item) {
        return `
           
             <div class="product__img" style="background-color:${item.color} ;"> <img src=${item.image} alt='hinh san pham'/></div>
              <h4>${item.name}</h4>  
              <p class="product__des">${item.description}</p>  
             
              <div class="product__pricart">
                  <p class="product__pri">$${item.price}</p>  
                  <button id=${item.id} class="cart-btn" >Add to cart</button>
              </div>
              
             
          
          `;
      });
      productBlock.innerHTML = htmls.join(" ");
    });
}

setTimeout(() => {
  const $$ = document.querySelectorAll.bind(document);
  const $ = document.querySelector.bind(document);

  const addToCartBtn = $$(".cart-btn");
  const cartItemsContainer = $("#list-cart");
  const textCart = $(".cart__text");

  for (let i of addToCartBtn) {
    i.addEventListener("click", (e) => {
      var checkid = e.target.id;
      textCart.classList.add("disable");

      // Gọi API và lấy dữ liệu
      fetch(courseApi)
        .then((response) => response.json())
        .then((Data) => {
          const Rdata = Data.shoes;

          // Hiển thị dữ liệu ra ngoài trình duyệt
          let htmls = Rdata.map((item) => {
            return `
        
            <div class="cart__item disable" id=${item.id}>

            
                <div class="cart__img" style="background-color:${item.color} ;">
                <img src=${item.image} alt='hinh san pham'/>
                </div>
                  
                <div class="cart__info">
                      <h4>${item.name}</h4>  
                       <p class="product__pri">$${item.price}</p>  
                      <div class="info--icon">
                        <p class="decrease-js">-</p>
                        <p class="result-js">1</p>
                        <p class="increase-js" >+</p>
                        <div class="icon--remove">
                          <img src="./assets/icon/trash.png"/>
                        </div>
                      </div>
                </div>
         
            
            </div>
              
     
        `;
          });

          cartItemsContainer.innerHTML = htmls.join("");
        })
        .catch((error) => console.error(error));
      setTimeout(() => {
        const handleRemove = function () {
          const addListCart = $$(".cart__item");
          const reMoveProduct = $$(".icon--remove");

          for (let j of addListCart) {
            var k = j.id; // id của sản phẩm trong cart
            if (k === checkid) {
              // nếu như id trong cart === id của nút btn theo sản phẩm thì hiện thị sản phẩm theo đó
              j.classList.toggle("disable");
            }
            for (let p of reMoveProduct) // lấy từng btn trash của sảm phẩm để xóa khi
              p.addEventListener("click", handleRemove);
          }
        };
        handleRemove();
        //update pd
        let currentValue = 0;
        const incr = $$(".increase-js");
        const decr = $$(".decrease-js");
        const resultP = $$(".result-js");

        for (let m of incr) {
          m.addEventListener("click", () => {
            currentValue++;
            resultP.forEach((element) => {
              element.textContent = currentValue;
            });
          });
        }

        for (let n of decr) {
          n.addEventListener("click", () => {
            currentValue--;
            resultP.forEach((element) => {
              element.textContent = currentValue;
            });

            if (currentValue === 0 || currentValue <= 0) {
              handleRemove();
            }

            else if (currentValue === 0) {
              currentValue = 1;
            }
          });
        }
      }, 150);
    });
  }
}, 100);
