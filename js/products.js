document.addEventListener("DOMContentLoaded", () => {
    GetTypes();
   GetProducts();
  
});
 let html = '';
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
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Agregar</a></div>
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
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Agregar</a></div>
                            </div>
                        </div>
                    </div>
                    `;
                    }else{    
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
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Agregar</a></div>
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

const GetTypes = async () => {
    try {
        const response = await fetch(`http://localhost:3000/type`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                const container = document.querySelector('#productsContainer');
                data.forEach(type => {

                    if(type.new===1){
                        html += `
                        <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="${type.rutaimg}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    
                                    <h5 class="fw-bolder">${type.name}</h5>
                                  
                                    ₡${type.price_range}
                                </div>
                            </div>
                            
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Agregar</a></div>
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
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Ver opciones</a></div>
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
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Ver opciones</a></div>
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