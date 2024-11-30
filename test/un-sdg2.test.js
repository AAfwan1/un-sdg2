import { html, fixture, expect } from '@open-wc/testing';
import "../un-sdg2.js";

describe("UnSdg2 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <un-sdg2
        title="title"
      ></un-sdg2>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
