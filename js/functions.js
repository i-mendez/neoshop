cargar_slides();
cargar_productos();

/**
 * TODO: Desarrollar el código del slider
 */

function cargar_slides() {
  var div_slider = document.getElementById("slider");

  //TODO: llamada ajax para extraer datos Json
  var objXMLHttpRequest = new XMLHttpRequest();
  objXMLHttpRequest.onreadystatechange = function () {
    if (
      objXMLHttpRequest.readyState === 4 &&
      objXMLHttpRequest.status === 200
    ) {
      var obj = JSON.parse(this.responseText);
      var slide = obj.data;

      
      slide.forEach(function (slides, indice, array) {
        //TODO: carga de  contenido slides
        div_slider.innerHTML += `<div class="gallery" id="g${slides.id}">
        
        <button id="back"> << </button>

        <h2 class="title">${slides.title}</h2>
        <a href="${slides.button_link}"> ${slides.button_text}</a>

        <button id="forth">  >> </button>
      </div>`;
      //TODO: los botones para psar la imagen manualmente estan sin programar
      });
      //TODO: carga de background y propiedades de slides
      slide.forEach(function (slides, indice, array) {
        document.getElementById(
          `g${slides.id}`
        ).style.background = `url('${slides.bg_image}')`;
        document.getElementById(
          `g${slides.id}`
        ).style.backgroundSize = `100% 190%`;
        document.getElementById(
          `g${slides.id}`
        ).style.backgroundRepeat = `no-repeat`;

        document.getElementById(
          `g${slides.id}`
        ).style.backgroundPosition = `50% 55%`;
      });
      //TODO: llamada funcion slide
      show_slides();

     
    }
  };
 
  objXMLHttpRequest.open("GET", "./api/slides.json");
  objXMLHttpRequest.send();

  var index = 0;

  function show_slides() {
    //TODO: extraemos todas las propiedades de todos los div creados para cada slide
    colecion_slides = document.getElementsByClassName("gallery");

    //TODO: los recorremos y ocultamos
    for (i = 0; i < colecion_slides.length; i++) {
      colecion_slides[i].style.display = "none";
    }
    
    //TODO: controlamos las vueltas
    if (index > colecion_slides.length - 1) {
      index = 0;
    }
    index++;
    
    //TODO: visualizamos el div según su id
    var id = colecion_slides[index - 1].id;
    $(`#${id}`).fadeIn('slow');
    // colecion_slides[index - 1].style.display = "block";
    setTimeout(show_slides, 4000);
  }
}

/**
 * TODO: Desarrollar el código para cargar productos por Ajax
 */

function cargar_productos() {
  //TODO:llamadda ajax para extraer datos Json
  var objXMLHttpRequest = new XMLHttpRequest();
  objXMLHttpRequest.onreadystatechange = function () {
    if (
      objXMLHttpRequest.readyState === 4 &&
      objXMLHttpRequest.status === 200
    ) {
      var obj = JSON.parse(this.responseText);
      var datos = obj.data;
      // TODO: Carga de productos
      var info = `<h1>Productos</h1> <div class='catalog'>`;
      var div_products = document.getElementById("products");
      datos.forEach(function (producto, indice, array) {
        info += `<div class='product'>
        <div class='bg_product' id='p${producto.id}'></div>
            <div class='info_product'>
                <div class='name_product'> ${producto.name} </div>
                <div class='price_product'>${producto.price} </div>

            </div>
            <a class='button' href='${producto.button_link}' > ${producto.button_text} </a>
            </div>`;
        // TODO: carga de CTAS
        if (producto.id == 4) {
          info += `<div class='cta cta1'></div>`;
        } else if (producto.id == 7) {
          info += `<div class='cta cta2'></div>`;
        }
      });

      info += `</div>`;
      // TODO: carga del contenido en HTML
      div_products.innerHTML = info;
      //TODO: adsignacion de Background y propiedades para productos
      datos.forEach(function (producto, indice, array) {
        document.getElementById(
          `p${producto.id}`
        ).style.background = `url('${producto.image}')`;
        document.getElementById(
          `p${producto.id}`
        ).style.backgroundSize = `100% 170%`;
        document.getElementById(
          `p${producto.id}`
        ).style.backgroundPosition = `50% 55%`;
      });
    }
  };

  objXMLHttpRequest.open("GET", "./api/products.json");
  objXMLHttpRequest.send();
}
