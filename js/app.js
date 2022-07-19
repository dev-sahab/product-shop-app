// get elements

const add_product_form = document.getElementById('add_product_form');
const product_update_form = document.getElementById('product_update_form');
const msg = document.querySelector('.msg');
const update_msg = document.querySelector('.update_msg');
const single_product = document.querySelector('.single_product');
const shop_modal = document.getElementById('shop_modal');
const productList = document.getElementById('product_list');






// get all products

const getAllProducts = () => {

    // get all LS Data
    const data = readLSdata('product');

    
    // init val
    let list = '';

    // Check LS data exist
    if ( !data || data.length == 0) {
        list = `
            <tr>
                <td colspan="7" class='text-center'>No Product Data Found</td>
            </tr>
        `;
    }

    // show all data to list
    if ( data && data.length > 0) {

        let total_amount = 0;
        // loop for data
        data.map((item, index) => {
            total_amount += (item.price * item.quantity);
            list += `
            <tr>
                <td class="text-center">${index + 1}</td>
                <td><img src="${item.photo}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity}</td>
                <td>
                    <a href="#shop_single_modal" product-index="${index}" data-bs-toggle="modal" class="btn btn-info btn-sm product-view"><i class="fas fa-eye"></i></a>
                    
                    <a href="#edit_modal" data-bs-toggle="modal" product-index="${index}" class="btn btn-warning btn-sm product-edit"><i class="fas fa-edit"></i></a>

                    <a href="" product-index="${index}" class="btn btn-danger btn-sm product-remove"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
            `;
        });

        // add table row for tatal ammount
        list += `
            <tr>
                <td colspan="6" class="text-end">Total Amount = ${total_amount} BDT</td>
                <td></td>
            </tr>
        `

    }

            // now inner HTML to product list
            productList.innerHTML = list;

}

getAllProducts();



//  Submit product form

add_product_form.onsubmit = (e) => {

    e.preventDefault();

    // get form data form formData object
    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());

    
    // form validation
    if ( !name || !price || !quantity || !photo ) {
        msg.innerHTML = msgAlert('All fields are required');
    }
    else if(numCheck(price) == false){
        msg.innerHTML = msgAlert('Price is not valid, It will be "0-9"', 'warning');
    }
    else if(numCheck(quantity) == false){
        msg.innerHTML = msgAlert('Quantity is not valid, It will be "0-9"', 'warning');
    } 
    else {

        createLSData('product', productData)


        msg.innerHTML = msgAlert('Product Added', 'success');
        e.target.reset();
        getAllProducts();
    }

}


// single product show

productList.onclick = (e) => {

    e.preventDefault();

    // single product show
    if( e.target.classList.contains('product-view')){

        // get product index
        let index = e.target.getAttribute('product-index');
        let data = readLSdata('product');

        // get data key
        let {name, price, photo, quantity} = data[index];

        single_product.innerHTML = `
            <img src="${photo}" alt="">
            <h2>${name}</h2>
            <p>Price: ${price}</p>
        `;

    }


    // single product edit
    if (e.target.classList.contains('product-edit')){
        // get product index
        let index = e.target.getAttribute('product-index');
        let data = readLSdata('product');

        // get data key
        let {name, price, photo, quantity} = data[index];

        //value set
        product_update_form.innerHTML = `

            <div class="my-3">
                <label>Index</label>
                <input class="form-control mt-2" type="text" name="index"  value="${index}">
            </div>
            <div class="my-3">
                <label>Name</label>
                <input class="form-control mt-2" type="text" name="name" placeholder="Product Name" value="${name}">
            </div>
            <div class="my-3">
                <label>Price</label>
                <input class="form-control mt-2" type="text" name="price" placeholder="Product Price" value="${price}">
            </div>
            <div class="my-3">
                <label>Quantity</label>
                <input class="form-control mt-2" type="text" name="quantity"  placeholder="Product Quantity"  value="${quantity}">
            </div>
            <div class="my-3">
                <label>Photo</label>
                <img style="width: 100%; height: 160px; object-fit: cover;" src="${photo}">
                <input class="form-control mt-2" type="text" name="photo" placeholder="Product Photo URL" value="${photo}">
            </div>
            <div class="mt-4">
                <input class="btn btn-primary w-100" type="submit" name="submit" value="Update Product">
            </div>
        `
    }

    // prodcut remove
    if (e.target.classList.contains('product-remove')){

        // get product index
        let index = e.target.getAttribute('product-index');
        let data = readLSdata('product');

        // remove data from index
        data.splice(index, 1);

        updateLSdata('product', data);
        getAllProducts();

    }
    
}

// product update form submit
product_update_form.onsubmit = (e) => {

    e.preventDefault();

    //get form data
    const form_data = new FormData(e.target);
    const {name, price, quantity, photo, index} = Object.fromEntries(form_data.entries());

    // get all data
    let allData = readLSdata('product');


    allData[index] = {name, price, quantity, photo};

    console.log(allData);

    // udate data
    updateLSdata('product', allData);
    getAllProducts();

    // update message show
    update_msg.innerHTML = msgAlert('Product Data Updated', 'success')

}

