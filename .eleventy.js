module.exports = function(eleventyConfig) {
  // Copiar archivos estáticos directamente a la carpeta de salida
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("imagenes");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("fondo.jpg");

  // Configurar la colección de la galería
  eleventyConfig.addCollection("galleryItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_data/gallery/*.md");
  });

  // Crear un archivo de datos global para la galería
  eleventyConfig.addGlobalData("galleryData", async () => {
    const galleryItems = eleventyConfig.getCollection("galleryItems");
    const data = galleryItems.map(item => ({
      title: item.data.title,
      image: item.data.image,
      description: item.data.description
    }));
    return JSON.stringify(data, null, 2);
  });

  // Configurar la carpeta de entrada y salida
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};