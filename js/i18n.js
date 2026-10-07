const i18n = {
  lang: "es",
  translations: {},

  async load(lang) {
    const res = await fetch(`locales/${lang}.json`);
    this.translations = await res.json();
    this.lang = lang;
  },

  async changeLanguage(lang) {
    const langSelect = document.getElementById("langSelect")
    await this.load(lang);
    localStorage.setItem("lang", lang);
    this.apply();
    langSelect.value = lang;
  },

  t(key) {
    return this.translations[key] || key;
  },

  apply(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = this.t(key);
    });
  },

  init() {

    if ( localStorage.getItem("lang")){
      const saved = localStorage.getItem("lang") || "es";
      return this.changeLanguage(saved);
    }else{
      console.log(navigator.language)
      const defLanguage = navigator.language.startsWith("es") ? "es" : "en";
      return this.changeLanguage(defLanguage);
    }
  }
};

window.i18n = i18n;