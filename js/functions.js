
/**
 * Form validation Alert Function
 */

const msgAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex align-items-center justify-content-between my-2">${msg}<button data-bs-dismiss="alert" class="ms-2 btn-close"></button></p>`;
}

/**
 * 
 * Numaric checker 
 */
const numCheck = (num) => {
    let pattern = /^[0-9]{1,}$/;
    return pattern.test(num);
}


/**
 * Set values LS
 */

const createLSData = (key, value) => {

    // init val
    let data = [];

    // check key exist or not
    if ( localStorage.getItem(key) ){
        data = JSON.parse( localStorage.getItem(key) );
    }

    // now push data to LS
    data.push(value);

    // Set data 
    localStorage.setItem( key, JSON.stringify(data) );

}

/**
 * get all LS Data
 */

const readLSdata = (key) => {

    if ( localStorage.getItem(key) ){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
    
}

/**
 * update our ls data
 */

const updateLSdata = (key, array) => {

    localStorage.setItem(key, JSON.stringify(array))
}