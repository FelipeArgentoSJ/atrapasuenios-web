document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.getElementById('galeriaContenedor');
  const modal = document.getElementById('modal');
  const modalImagen = document.getElementById('modalImagen');
  const modalDescripcion = document.getElementById('modalDescripcion');
  const cerrar = document.querySelector('.cerrar');

  const descripciones = [
    "Atrapasueños 01 - Inspirado en la naturaleza.",
    "Atrapasueños 02 - Sueños de luna llena.",
    "Atrapasueños 03 - Espíritu del bosque.",
    "Atrapasueños 04 - Viento tribal.",
    "Atrapasueños 05 - Noche serena.",
    "Atrapasueños 06 - Alas de libertad.",
    "Atrapasueños 07 - Corazón bohemio.",
    "Atrapasueños 08 - Energía solar.",
    "Atrapasueños 09 - Paz interior.",
    "Atrapasueños 10 - Susurros del alma.",
    "Atrapasueños 11 - Espíritu soñador."
  ];

  for (let i = 1; i <= 11; i++) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');
    tarjeta.innerHTML = `
      <img src="imagenes/${String(i).padStart(2, '0')}.jpg" alt="Atrapasueños ${i}" />
      <div class="tarjeta-descripcion">
        <h3>Atrapasueños ${i}</h3>
        <p>${descripciones[i - 1]}</p>
      </div>
    `;
    tarjeta.addEventListener('click', () => abrirModal(i));
    galeria.appendChild(tarjeta);
  }

  function abrirModal(indice) {
    modalImagen.src = `imagenes/${String(indice).padStart(2, '0')}.jpg`;
    modalImagen.style.transform = 'scale(1)';
    modalDescripcion.textContent = descripciones[indice - 1];
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