# Slate CRM Module Wireframe

## Purpose

This project is a low-fidelity wireframe for the Northeastern Team. It provides a visual overview of the Slate CRM modules currently represented in the portal inventory, including:

- Which modules are active or inactive
- The order in which modules appear
- The proposed layout placement for each module
- The approximate page structure that will need to be built directly in Slate CRM

The wireframe is intended to support early discussion, scope framing, and rough effort estimation. It is not a finished design or a production Slate implementation.

## What the Wireframe Shows

The page reproduces the module inventory as a simple visual layout:

- Full-width modules span the dashboard area.
- Left-column and right-column modules are grouped into the proposed two-column layout.
- The header and other page-level modules remain outside the dashboard grid.
- Each visible module includes its name, Slate module ID, and active/inactive status.
- Styling and block heights are intentionally approximate so the overall page composition can be reviewed quickly.

Some inventory entries are hidden from the visual preview because they represent supporting styles or scripts rather than visible page modules.

## Project Files

- `index.html` - Entry point for the wireframe.
- `data/modules.js` - Exported Slate module inventory used by the preview.
- `js/wireframe.js` - Builds the preview DOM and applies the proposed layout grouping.
- `css/wireframe.css` - Wireframe presentation styles.

## How to View

Open `index.html` in a browser. No build step or server is required for the current static preview.

## Source and Editing Notes

`data/modules.js` is generated from `slate-module-inventory.xlsx`. Update the source inventory and regenerate the file when module names, statuses, IDs, or ordering change. Do not manually edit the generated inventory unless a temporary wireframe-only adjustment is needed.

The layout decisions in `js/wireframe.js` are proposed framing for discussion. They should be validated with the Northeastern Team before being treated as final Slate CRM configuration requirements.

## Out of Scope

This wireframe does not define:

- Final visual design or responsive behavior
- Production HTML, CSS, or JavaScript
- Slate CRM configuration steps or automation logic
- Module content, business rules, permissions, or integrations
- Final implementation estimates or delivery dates

## Intended Next Step

Use the wireframe with the Northeastern Team to confirm the module inventory, active/inactive status, layout placement, and any exceptions. Those decisions can then be translated into a detailed Slate CRM implementation plan and estimate.
