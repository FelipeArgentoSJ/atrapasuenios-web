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
    return collectionApi.getFilteredByGlob("./_data/gallery/*.md");
  });

  // Añadir el filtro jsonify para Nunjucks
  eleventyConfig.addNunjucksFilter("jsonify", function(value) {
    return JSON.stringify(value, null, 2);
  });

  // Configurar la carpeta de entrada y salida
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
