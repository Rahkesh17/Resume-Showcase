const reports = window.powerBiReports || [];
const reportsGrid = document.querySelector("#reports-grid");
const pdfShowcaseGrid = document.querySelector("#pdf-showcase-grid");
const reportCount = document.querySelector("#report-count");

function createLink(href, label, className = "") {
  if (!href) return "";
  const classAttribute = className ? ` class="${className}"` : "";
  return `<a href="${href}"${classAttribute} target="_blank" rel="noreferrer">${label}</a>`;
}

function renderReports() {
  reportCount.textContent = reports.length;

  reportsGrid.innerHTML = reports
    .map((report, index) => {
      const tags = report.tools.map((tool) => `<li>${tool}</li>`).join("");
      const insights = report.insights.map((insight) => `<li>${insight}</li>`).join("");
      const pdfLink = createLink(report.pdfUrl, "Open PDF");
      const liveLink = createLink(report.liveUrl, "Open in Power BI");

      return `
        <article class="report-card">
          <div class="report-placeholder" role="img" aria-label="${report.title} preview card">
            <span>${String(index + 1).padStart(2, "0")}</span>
          </div>
          <div class="report-body">
            <ul class="tag-list" aria-label="Tools used">${tags}</ul>
            <h3>${report.title}</h3>
            <p>${report.summary}</p>
            <ul class="insights">${insights}</ul>
            <div class="card-links">
              ${pdfLink}
              ${liveLink}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPdfShowcase() {
  pdfShowcaseGrid.innerHTML = reports
    .map((report, index) => {
      return `
        <article class="pdf-showcase-card" id="${report.id}">
          <div class="pdf-showcase-header">
            <div>
              <p class="eyebrow">Dashboard ${index + 1}</p>
              <h3>${report.title}</h3>
            </div>
            <div class="pdf-actions">
              ${createLink(report.pdfUrl, "Open PDF", "button secondary")}
              ${createLink(report.liveUrl, "Open in Power BI", "button secondary")}
            </div>
          </div>
          <iframe
            class="pdf-frame"
            title="${report.title} PDF preview"
            src="${report.pdfUrl}"
            loading="lazy"
          ></iframe>
        </article>
      `;
    })
    .join("");
}

renderReports();
renderPdfShowcase();
