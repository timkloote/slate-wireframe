(function () {
  "use strict";

  const partRows = document.querySelector(".part_rows_container");

  // In production, Slate renders each configured portal module as a `.part`
  // inside `.part_rows_container`. The inventory stands in for that server-side
  // output so this wireframe can reproduce the same starting DOM locally.
  const modules = Array.isArray(window.SLATE_MODULES)
    ? [...window.SLATE_MODULES].sort((a, b) => a.order - b.order)
    : [];
  const hiddenModuleOrders = new Set([1, 2, 3]);
  const leftColumnOverrides = new Set([
    67,  // Payment - Enrollment Deposit
    68,  // Payment - App Fee
    107, // Checklist Standard
    128, // NU Online Cert to Degree Form
    129, // Performance Based Matric Form
    131  // Galante Grad Cert App form
  ]);
  const heightClasses = [
    "wireframe-height-compact",
    "wireframe-height-standard",
    "wireframe-height-medium",
    "wireframe-height-tall",
    "wireframe-height-extra-tall"
  ];

  if (!modules.length) {
    partRows.innerHTML = '<p class="wireframe-error">Unable to load the Slate module inventory.</p>';
    return;
  }

  // First reproduce Slate's flat output. No column wrappers exist yet; every
  // module is a direct sibling and carries its real `part_<uuid>` HTML ID.
  const fragment = document.createDocumentFragment();
  modules.forEach(function (module) {
    if (hiddenModuleOrders.has(module.order)) return;
    const section = document.createElement("div");
    // Use the proposed inventory class with a small set of wireframe decisions
    // above. Unassigned modules safely fall back to dashboard full width.
    const layoutClass = leftColumnOverrides.has(module.order)
      ? "col-left"
      : module.cssClasses.trim() || "full-width";
    const heightClass = heightClasses[(module.order * 7) % heightClasses.length];
    section.className = `part wireframe-module ${layoutClass} ${heightClass}`;
    section.id = module.moduleId;
    section.dataset.moduleOrder = module.order;
    section.dataset.moduleStatus = module.status;
    section.dataset.moduleId = module.moduleId;

    const content = document.createElement("div");
    content.className = "wireframe-module-content";
    const name = document.createElement("h2");
    name.className = "wireframe-module-name";
    name.textContent = module.name;
    const id = document.createElement("code");
    id.className = "wireframe-module-id";
    id.textContent = module.moduleId || "No module ID listed";
    const status = document.createElement("span");
    const isActive = module.status === "Active";
    status.className = `wireframe-module-status ${isActive ? "is-active" : "is-inactive"}`;
    status.textContent = module.status || "Unknown";
    content.append(name, id, status);
    section.append(content);
    fragment.append(section);
  });

  partRows.append(fragment);

  // Everything below represents the script that would run from the Slate DOM
  // module. It creates structure that cannot be entered around parts in Slate's
  // editor, then moves the already-rendered `.part` elements into that structure.
  const dashboard = document.createElement("div");
  dashboard.className = "container-fluid bodybackground wireframe-dashboard";
  dashboard.setAttribute("aria-label", "Slate modules in proposed grid layout");
  const dashboardFullWidth = document.createElement("div");
  dashboardFullWidth.className = "wireframe-dashboard-full-width";
  const grid = document.createElement("div");
  grid.className = "wireframe-grid";
  const left = document.createElement("div");
  left.className = "wireframe-column wireframe-column-left";
  const right = document.createElement("div");
  right.className = "wireframe-column wireframe-column-right";

  const renderedModules = [...partRows.querySelectorAll(":scope > .part")];

  // Header and Scripts remain direct children of Slate's part container so they
  // can span the browser. The DOM part owns the generated dashboard and remains
  // immediately above Scripts at the bottom of the rendered page.
  const header = renderedModules.find((module) => module.dataset.moduleOrder === "4");
  const dom = renderedModules.find((module) => module.dataset.moduleOrder === "132");
  const footer = renderedModules.find((module) => module.dataset.moduleOrder === "133");

  renderedModules.forEach(function (module) {
    if (module === header || module === dom || module === footer) return;

    // append() moves an existing node; it does not copy it. This preserves each
    // part's ID, classes, content, event handlers, and Slate-rendered state.
    if (module.classList.contains("col-left")) {
      left.append(module);
    } else if (module.classList.contains("col-right")) {
      right.append(module);
    } else if (module.classList.contains("full-width")) {
      dashboardFullWidth.append(module);
    } else {
      dashboardFullWidth.append(module);
    }
  });

  grid.append(left, right);

  // Dashboard-level full-width parts live inside the centered 1600px wrapper,
  // above the uninterrupted 66/33 column grid.
  if (dashboardFullWidth.children.length) dashboard.append(dashboardFullWidth);
  dashboard.append(grid);
  if (dom) {
    // Make the generated wrapper a child of the DOM part, matching the legacy
    // portal pattern. Retain the wireframe's DOM label after it for visibility.
    const domLabel = dom.querySelector(".wireframe-module-content");
    dom.replaceChildren(dashboard);
    if (domLabel) dom.append(domLabel);
  } else {
    // Development fallback: keep the preview usable if the DOM part is removed
    // from a future inventory export.
    partRows.insertBefore(dashboard, footer || null);
  }
}());
