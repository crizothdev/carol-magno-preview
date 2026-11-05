import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

(function () {
  var config = window.CMAG_FIREBASE_CONFIG;
  if (!config || !config.apiKey || !config.projectId || !config.appId || !config.measurementId) return;

  isSupported().then(function (supported) {
    if (!supported) return;

    var analytics = getAnalytics(initializeApp(config));

    document.addEventListener("click", function (event) {
      var target = event.target instanceof Element ? event.target : event.target.parentElement;
      if (!target) return;
      var link = target.closest("a[href^='https://wa.me/'], a[href^='mailto:'], a[href^='tel:']");
      if (link) {
        var method = link.href.indexOf("wa.me/") !== -1 ? "whatsapp" : (link.href.indexOf("mailto:") === 0 ? "email" : "phone");
        logEvent(analytics, "contact_click", { method: method });
      }

      var project = target.closest("[data-showcase-gallery], .project-card");
      if (project) {
        var title = project.querySelector(".project-card__title, h3");
        var projectName = title ? title.textContent.trim() : project.getAttribute("data-showcase-gallery");
        if (projectName) logEvent(analytics, "select_content", { content_type: "project", item_id: projectName });
      }
    });
  }).catch(function () {
    // Analytics remains optional; unsupported browsers continue to use the site normally.
  });
})();
