/**
 * Copyright 2024 AAfwan
 * @license Apache-2.0
 * Web component to display UN Sustainable Development Goals (SDGs).
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

// Define the `aafwan-sdg` web component
export class AafwanSdg extends DDDSuper(LitElement) {
  // Define the custom tag name for the web component
  static get tag() {
    return "aafwan-sdg";
  }

  // Constructor initializes default properties
  constructor() {
    super();
    this.goal = "circle"; // Default to SDG logo
    this.width = 200; // Default width in pixels
    this.colorOnly = false; // Whether to display color blocks only
  }

  // Define reactive properties with data types
  static get properties() {
    return {
      goal: { type: String }, // Accepts numbers 1-17, "all", or "circle"
      label: { type: String }, // Alt text for accessibility
      width: { type: Number }, // Width of the component
      colorOnly: { type: Boolean }, // Boolean for color-only mode
    };
  }

  // Define CSS styles scoped to the component
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        /* Set width and background color dynamically */
        img,
        .wrapper {
          width: var(--width, 200px); /* Dynamic width */
          background-color: var(--goal-color, white); /* Dynamic color */
          display: block; /* Ensure proper display */
        }

        .color.wrapper {
          height: var(--width, 200px); /* Make it square */
        }

        div {
          padding: 0;
          margin: 0;
        }
      `,
    ];
  }

  // Generate the label dynamically based on the current goal
  getLabel() {
    if (!this.label) {
      // Return the SDG label if it's not already defined
      if (Number.isInteger(Number(this.goal))) {
        const SDGLabelList = [
          "No Poverty",
          "Zero Hunger",
          "Good Health and Well-being",
          "Quality Education",
          "Gender Equality",
          "Clean Water and Sanitation",
          "Affordable and Clean Energy",
          "Decent Work and Economic Growth",
          "Industry, Innovation, and Infrastructure",
          "Reduced Inequalities",
          "Sustainable Cities and Communities",
          "Responsible Consumption and Production",
          "Climate Action",
          "Life Below Water",
          "Life on Land",
          "Peace, Justice, and Strong Institutions",
          "Partnerships for the Goals",
        ];
        return SDGLabelList[this.goal - 1]; // Return corresponding SDG title
      } else if (this.goal === "all") {
        return "UN Sustainable Development Goals";
      } else if (this.goal === "circle") {
        return "UN Sustainable Development Goals Logo";
      } else {
        return ""; // Fallback for undefined goals
      }
    } else {
      return this.label; // Return custom label if provided
    }
  }

  // Generate the image source dynamically based on the goal
  getImgSrc() {
    return new URL(`../lib/svg/${this.goal}.svg`, import.meta.url).href; // Build image path
  }

  // Render the web component's HTML structure
  render() {
    return html`
      ${this.colorOnly
        ? html`
            <!-- Render a colored block if colorOnly is true -->
            <div
              class="color wrapper"
              style="--width: ${this.width}px; --goal-color: var(--un-sdg-color-${this.goal})"
              label="${this.getLabel()} color only"
            ></div>
          `
        : html`
            <!-- Render an image if colorOnly is false -->
            <div
              class="svg wrapper"
              style="--width: ${this.width}px; --goal-color: var(--un-sdg-color-${this.goal})"
            >
              <img
                src=${this.getImgSrc()}
                alt=${this.getLabel()}
                loading="lazy"
                fetchpriority="low"
                width=${this.width}
              />
            </div>
          `}
    `;
  }

  /**
   * HAX Properties Integration
   * Reference for HAX systems to interact with this component.
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

// Register the custom element globally
globalThis.customElements.define(AafwanSdg.tag, AafwanSdg);
