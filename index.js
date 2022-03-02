document.getElementById('error').style.display = 'none'
const main = document.getElementById('main');
const searchButton = () => {
    const input = document.getElementById('input-value')
    const errorMessege = document.getElementById('error');
    inputText = input.value;
    input.value = '';

    if (parseFloat(inputText) < 0) {

        errorMessege.innerText = "Sorry not available ";
        input.value = '';
        main.innerHTML = '';


    }

    else {
        main.innerHTML = '';


        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`

        fetch(url)
            .then(res => res.json())
            .then(data => phoneDisplay(data.data.slice(0, 20)))
    }
}
// for (const phone of info) 
const phoneDisplay = info => {
    console.log(info);
    /* error handler */
    if (info.length == 0) {
        document.getElementById('error').style.display = 'block'


    }



    info.forEach(phone => {
        document.getElementById('error').style.display = 'none'
        // console.log(phone.slug);
        const div = document.createElement('div');
        div.className = ('col-lg-4 mt-5 mb-5 rounded-start');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
  <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-3" alt="...">
  <div class="card-body">
    <h5 class="card-title fw-bold">${phone.phone_name}</h5>
    <h4 class='card-title'>${phone.brand}</h4>
    <button onclick="phoneDetails('${phone.slug}')" class=" fw-bold btn btn-warning">See Details</button>
  </div>
</div>
        `;
        main.appendChild(div)
    })



}


const phoneDetails = id => {


    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))


}


const displayPhoneDetails = data => {
    console.log(data);
    const rate = () => {
        const newName = data.mainFeatures.sensors.map(sensor => sensor)
        return newName;
    }




    const onePhone = document.getElementById('one-phone');
    const div = document.createElement('div');
    main.innerHTML = "";
    div.classList.add('card');
    div.innerHTML = `
    
      <img src="${data.image}" class="card-img-top w-50 mx-auto mt-5 mb-5" alt="...">
      <div class="card-body">
        <h5 class="card-title fw-bold">${data.name}</h5>
        <p class="card-text">${data.releaseDate}</p>
        <p class="card-title fw-bold">${data.brand}</p>
        <p class="card-text"><span class="fw-bold">Model Name:</span>   ${data.name}</p>
        <p class="card-text"><span class="fw-bold"> Storage: </span>    ${data.mainFeatures.storage}</p>
        <p class="card-text"> <span class="fw-bold"> Display Size: </span>     ${data.mainFeatures.displaySize}</p>
        <p class="card-text"><span class="fw-bold">Slug:</span> ${data.slug}</p>
        <span class="card-text  my-2" > <span class="fw-bold"> Sensors: </span>  ${data.mainFeatures.sensors
        }</span>
         <p class="card-text">Others info: WLAN; ${data?.others?.WLAN || "Info will provide soon"},Bluetooth;${data?.others?.Bluetooth || "Info will provide soon"} </p>
        <p>${rate()}</p>
       
      </div>
    

        `;
    onePhone.appendChild(div);

}