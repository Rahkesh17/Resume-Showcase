const reports = window.powerBiReports || [];
const reportsGrid = document.querySelector("#reports-grid");
const accessGrid = document.querySelector("#access-grid");
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
      const liveLink = createLink(report.liveUrl, "Open Live Report");

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
            <div class="card-links">${liveLink}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAccessLinks() {
  accessGrid.innerHTML = reports
    .map((report, index) => {
      return `
        <article class="access-card" id="${report.id}">
          <p class="eyebrow">Report ${index + 1}</p>
          <h3>${report.title}</h3>
          <p>${report.summary}</p>
          ${createLink(report.liveUrl, "Open in Power BI", "button primary")}
        </article>
      `;
    })
    .join("");
}

renderReports();
renderAccessLinks();
