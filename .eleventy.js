const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {
  // Copiar archivos estáticos directamente a la carpeta de salida
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("imagenes");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("fondo.jpg");
  eleventyConfig.addPassthroughCopy("config.yml"); // Añadido: Copiar config.yml

  // Configurar la colección de la galería
  eleventyConfig.addCollection("galleryItems", function(collectionApi) {
    const galleryPath = path.join(__dirname, '_data', 'gallery');
    const files = fs.readdirSync(galleryPath);
    const items = [];

    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(galleryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        items.push(data);
      }
    });
    return items;
  });

  // Añadir el filtro jsonify para Nunjucks
  eleventyConfig.addNunjucksFilter("jsonify", function(value) {
    return JSON.stringify(value, null, 2);
  });

  // Añadir un filtro para renderizar Markdown
  eleventyConfig.addFilter("markdown", function(value) {
    const md = new markdownIt();
    return md.render(value);
  });

  // Debugging: Log global data to see if site_content is loaded
  eleventyConfig.addGlobalData("debugData", async () => {
    const siteContentPath = path.join(__dirname, '_data', 'site_content.md');
    if (fs.existsSync(siteContentPath)) {
      const fileContent = fs.readFileSync(siteContentPath, 'utf8');
      const { data } = matter(fileContent);
      console.log("Eleventy: site_content.md data loaded:", data);
      return data;
    } else {
      console.log("Eleventy: _data/site_content.md not found.");
      return {};
    }
  });

  // Configurar la carpeta de entrada y salida
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};