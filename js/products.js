document.addEventListener("DOMContentLoaded", () => {
    GetProducts();
    GetTypes();
    GetCar();
  
});
 let html = '';
 let productId=0;
 const GetProducts = async () => {
    try {
        const response = await fetch(`http://localhost:3000/product`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                const container = document.querySelector('#productsContainer');

                let html = '';

                data.forEach(product => {
                    if (product.ofert === 1 && product.qualification === 1) {
                        html += `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">En oferta</div>
                                <img class="card-img-top" src="${product.rutaimg}" alt="${product.name}" />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="fw-bolder">${product.name}</h5>
                                        <div class="d-flex justify-content-center small text-warning mb-2">
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                        </div>
                                        <span class="text-muted text-decoration-line-through">₡${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="openModal(${product.id})">Agregar</a></div>
                                </div>
                            </div>
                        </div>
                        `;
                    } else if(product.ofert === 1){
                        html += `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">En oferta</div>
                                <img class="card-img-top" src="${product.rutaimg}" alt="${product.name}" />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="fw-bolder">${product.name}</h5>
                                        <span class="text-muted text-decoration-line-through">₡${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="openModal(${product.id})">Agregar</a></div>
                                </div>
                            </div>
                        </div>
                        `;
                    } else {    
                        html += `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <img class="card-img-top" src="${product.rutaimg}" alt="${product.name}" />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="fw-bolder">${product.name}</h5>
                                        ₡${product.price.toFixed(2)}
                                    </div>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="openModal(${product.id})">Agregar</a></div>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                });

                container.innerHTML += html;

            } else {
               console.log("");
            }
        } else {
         console.log("");
        }
    } catch (error) {
        console.log("");
       
    }
};

function openModal() {
    $('#numberModal').modal('show');
}

function agregarProducto() {
    const cantInput = document.getElementById('numberInput').value;
    const cant = parseInt(cantInput); 
    if (isNaN(cant)) {
        showModal("Por favor, ingrese un valor numérico válido para la cantidad.");
        return;
    }
    $('#numberModal').modal('hide');
    const data = { cant, productId }; 
    sendData(data);
}
const sendData = (data) => {
    fetch('http://localhost:3000/car/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showModal("Se agregaron los datos de usuario correctamente");
        } else {
            showModal("No se pudo registrar los datos");
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        showModal("No se pudo registrar los datos");
    });
};


const GetTypes = async () => {
    try {
        const response = await fetch(`http://localhost:3000/type`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                
                const container = document.querySelector('#productsContainer');
                let priceTotal =0;
                data.forEach(type => {
                    
                    if(type.new===1){
                        html += `
                        <div class="col mb-5">
                        <div class="card h-100">
                        
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Nuevo</div>
                           
                            <img class="card-img-top" src="${type.rutaimg}" alt="..." />
                          
                            <div class="card-body p-4">
                                <div class="text-center">
                                   
                                    <h5 class="fw-bolder">${type.name}</h5>
                                   
                                    <span class="text-muted text-decoration-line-through">${type.price_range}</span>

                                </div>
                            </div>
                          
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="./pages/products.html?id=${type.id}">Ver opciones</a></div>
                            </div>
                        </div>
                    </div>
                    `;
                       
                    }else if(type.qualification===1){
                        html += `
                        <div class="col mb-5">
                        <div class="card h-100">
                           
                            <img class="card-img-top" src="${type.rutaimg}" alt="..." />
                         
                            <div class="card-body p-4">
                                <div class="text-center">
                                   
                                    <h5 class="fw-bolder">${type.name}</h5>
                                   
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                   ${type.price_range}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="./pages/products.html?id=${type.id}">Ver opciones</a></div>
                            </div>
                        </div>
                    </div>
                    `;
                    }else{
                    html += `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <img class="card-img-top" src="${type.rutaimg}" alt="${type.name}" />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="fw-bolder">${type.name}</h5>
                                        <p>₡${type.price_range}</p>
                                    </div>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="./pages/products.html?id=${type.id}">Ver opciones</a></div>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                });

                container.innerHTML += html;

            } else {
               console.log("");
            }
        } else {
         console.log("");
        }
    } catch (error) {
        console.log("");
       
    }
};
function openModal(id) {
    productId =id;
    const modal = document.getElementById('numberModal');
    modal.classList.add('show');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('numberModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}
function showModal(message) {
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    $('#myModal').modal('show');
}
document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById("cartButton");
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));

    cartButton.addEventListener("click", function() {
        cartModal.toggle();
    });
});
const GetCar = async () => {
    try {
        const response = await fetch(`http://localhost:3000/car`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                document.getElementById('car-size').textContent = data.length ;
                storedData = data;
                console.log(storedData);
                const container = document.querySelector('.carrito-items');
                container.innerHTML = '';

               
              
                // Loop through each item in the carrito and render its product
                data.forEach(car => {
                    GetProduct(car.productId, container, car.cant);
                });

               
               
            } else {
              console.log("error no se de que mae pero tengo sue;o");
            }
        } else {
           console.log('oh no ');
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
       
    }
};
let totalPrice = 0;

const GetProduct = async (id, container, cant) => {
    try {
        const response = await fetch(`http://localhost:3000/product?id=${encodeURIComponent(id)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
               
                data.forEach(product => {
                    
                    renderProduct(product, container, cant);
                 totalPrice += product.price * cant;
               
                    
                });
                   
                document.getElementById('totalPrice').textContent = "Precio Total:"+totalPrice ;
                
            } else {
                console.log(`No se encontró ningún producto con el ID ${id}`);
            }
        } else {
            console.log(`Error al obtener el producto con el ID ${id} desde el servidor.`);
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
    }
};

function renderProduct(product, container,cant) {
    let html = '';

    if (product.ofert === 1 && product.qualification === 1) {
        html += `
        <div class="col mb-5">
            <div class="card h-100">
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">En oferta</div>
                <img class="card-img-top" src="${product.rutaimg}" alt="${product.name}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${product.name}</h5>
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <span class="text-muted text-decoration-line-through">₡${product.price.toFixed(2)}</span>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><p>Cantidad: ${cant}</p></div>
                </div>
            </div>
        </div>
        `;
    } else if (product.ofert === 1) {
        html += `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">En oferta</div>
                                <img class="card-img-top" src="${product.rutaimg}" alt="${product.name}" />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="fw-bolder">${product.name}</h5>
                                        <span class="text-muted text-decoration-line-through">₡${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><p>Cantidad: ${cant}</p></div>
                                </div>
                            </div>
                        </div>
                        `;
    } else {
        html += `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <img class="card-img-top" src="${product.rutaimg}" alt="${product.name}" />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="fw-bolder">${product.name}</h5>
                                        ₡${product.price.toFixed(2)}
                                    </div>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><p>Cantidad: ${cant}</p></div>
                                </div>
                            </div>
                        </div>
                        `;
    }
    
    container.innerHTML += html;
}
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const { card, date,cvv,name} = getFormData();
    if(!validateCard(card)){
        showModal("la tarjeta de credito esta mal ");
    }else if(!validateFecth(date)){
        showModal("la fecha esta mal");
    }else if(!validateCVV(cvv)){
        showModal("El CVV esta mal");
    }else if(!validateName(name)){
        showModal("El nombre esta mal");
    }else {

        var encryptedCard =CryptoJS.SHA256(card).toString();
        var encryptedCVV =CryptoJS.SHA256(cvv).toString();
       console.log({name,date,encryptedCVV,encryptedCard});
        sendDataCard({encryptedCard,encryptedCVV,date,name});
    }
   
    $('#paymentModal').modal('hide');
});
const sendDataCard = (data) => {
    console.log(JSON.stringify(data));
    fetch('http://localhost:3000/card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showModal("Datos registrados");
        } else {
            showModal("Datos no resgistrados");
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
       
    });
};
const getFormData = () => {
    const name = document.getElementById("cardholderName").value.trim();
    const card= document.getElementById("cardNumber").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const date = document.getElementById("expirationDate").value.trim();
    return { card, date,cvv,name};
};
const validateCard =(cardNumber)=>{
    cardNumber = cardNumber.replace(/\s/g, '').split('').reverse().join('');

    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let digit = parseInt(cardNumber[i]);
        if ((i % 2) === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return (sum % 10) === 0;
}
const validateFecth=(date)=>{
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    const [month, year] = date.split('/').map(str => parseInt(str, 10));

    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
        return true; // Expiration date is valid
    } else {
        return false; // Expiration date is invalid
    }
}
const validateCVV=(cvv)=>{
    return expRegCVV = /^[0-9]{3}$/.test(cvv);

}
const validateName=(name)=>{  
const nameRegex = /^[a-zA-Z\s']+$/;
const minLength = 10;
const maxLength = 50;
if (name.length < minLength || name.length > maxLength) {
    return false; 
}
return nameRegex.test(name);
}
