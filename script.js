document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.getElementById('galeriaContenedor');
  const modal = document.getElementById('modal');
  const modalImagen = document.getElementById('modalImagen');
  const modalDescripcion = document.getElementById('modalDescripcion');
  const cerrar = document.querySelector('.cerrar');

  // Cargar datos de la galería desde el archivo JSON
  fetch('/_data/gallery.json')
    .then(response => response.json())
    .then(data => {
      // Acceder a la propiedad 'images' que contiene la lista de imágenes
      data.images.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <div class="tarjeta-descripcion">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `;
        tarjeta.addEventListener('click', () => abrirModal(item.image, item.description));
        galeria.appendChild(tarjeta);
      });
    })
    .catch(error => console.error('Error al cargar la galería:', error));

  function abrirModal(imagenSrc, descripcion) {
    modalImagen.src = imagenSrc;
    modalImagen.style.transform = 'scale(1)';
    modalDescripcion.textContent = descripcion;
    modal.style.display = 'flex';
  }

  cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  let currentScale = 1;

  modalImagen.addEventListener("wheel", (e) => {
    e.preventDefault();
    const scaleStep = 0.1;
    currentScale += e.deltaY < 0 ? scaleStep : -scaleStep;
    currentScale = Math.max(0.5, Math.min(3, currentScale));
    modalImagen.style.transform = `scale(${currentScale})`;
  });

});

// Botón "Volver al inicio"
const btnVolverArriba = document.getElementById("btnVolverArriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnVolverArriba.style.display = "block";
  } else {
    btnVolverArriba.style.display = "none";
  }
});

btnVolverArriba.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Menú hamburguesa (si es necesario)
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}