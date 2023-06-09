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
                  <div id=${item.id} class="checkpd disable"><img src="./assets/icon/check.png" alt="check"/></div>
              </div>
              
             
          
          `;
      });
      productBlock.innerHTML = htmls.join(" ");
    });
}

setTimeout(() => {
  const $$ = document.querySelectorAll.bind(document);
  const $ = document.querySelector.bind(document);

  const hiddeCheck = $$(".checkpd");
  const addToCartBtn = $$(".cart-btn");
  const cartItemsContainer = $("#list-cart");
  const textCart = $(".cart__text");

  for (let i of addToCartBtn) {
    i.addEventListener("click", (e) => {
      var checkid = e.target.id;

      textCart.classList.add("disable");
      for (let z of hiddeCheck) {
        let q = z.id; // lấy id của nut btn check
        if (q === checkid) {
          // nếu như id của btn check === id của sản phẩm thì thực hiện hành vi
          z.classList.remove("disable");

          i.classList.add("disable");
        }
      }

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
          //hàm xóa sản phẩm trong cart khi click vào thùng rác
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

            //truyền thêm evetn cho icon thùng rác khi click

           var halderemobe = function handlechangBtnCheck() {
              for (let w of reMoveProduct) {
                w.addEventListener("click", () => {
                  (function handleRestartbtnCheck() {
                    // hàm xử lí hanhg vi click icon rác thì thay đổi nút btn
                    for (let r of hiddeCheck) {
                      // lặp qa từng icon check
                      let g = r.id; // lấy id của nut btn check
                      if (g === checkid) {
                        // nếu như id của btn check === id của sản phẩm thì thực hiện hành vi
                        r.classList.add("disable");

                        i.classList.remove("disable");
                      }
                    }
                  })();
                });
              } // lấy từng btn trash của sảm phẩm để xóa khi
            }
            halderemobe();
          }
        };
        handleRemove();
        //update pd
        let currentValue = 0;
        const incr = $$(".increase-js");
        const decr = $$(".decrease-js");
        const resultP = $$(".result-js");
        // ham  tang số luong khi click  -+

        for (let m of incr) {
          m.addEventListener("click", () => {
            currentValue++;
            resultP.forEach((element) => {
              element.textContent = currentValue;
            });
          });
        }
        // ham  giảm số luong khi click  -
        for (let n of decr) {
          n.addEventListener("click", () => {
            currentValue--;
            resultP.forEach((element) => {
              element.textContent = currentValue;
            });

            if (currentValue === 0 || currentValue <= 0) {
              handleRemove();
              
              
            } else if (currentValue === 0) {
              currentValue = 1;
            }
          });
        }
      }, 150);
    });
  }
}, 100);
