class HtmlSanitizer {
  static encodeHTML(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
}

export default HtmlSanitizer;