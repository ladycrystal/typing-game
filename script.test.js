import "./script.js";

/**
 * @jest-environment jsdom
 */

describe("startGame", () => {
  let quoteElement, messageElement, typedValueElement, startButton;

  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `
            <div>
                <span id="quote"></span>
                <span id="message"></span>
                <input id="typed-value" />
                <button id="start"></button>
                <button id="reset"></button>
            </div>
        `;

    // Re-import script.js to re-bind DOM elements and listeners
    jest.resetModules();
    require("./script.js");

    quoteElement = document.getElementById("quote");
    messageElement = document.getElementById("message");
    typedValueElement = document.getElementById("typed-value");
    startButton = document.getElementById("start");
  });

  test("should display a quote and highlight the first word", () => {
    startButton.click();

    // The quote should be set and contain spans
    expect(quoteElement.innerHTML).toMatch(/<span class="word">.*<\/span>/);

    // The first word should have the highlight class
    const firstWord = quoteElement.querySelector(".word");
    expect(firstWord.classList.contains("highlight")).toBe(true);
  });

  test("should clear previous messages and input", () => {
    messageElement.textContent = "Old message";
    typedValueElement.value = "old input";

    startButton.click();

    expect(messageElement.textContent).toBe("");
    expect(typedValueElement.value).toBe("");
  });

  test("should focus the input field", () => {
    // Spy on focus
    const focusSpy = jest.spyOn(typedValueElement, "focus");
    startButton.click();
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test("should reset currentWordIndex and words", () => {
    // Simulate previous state
    window.currentWordIndex = 5;
    window.words = ["foo", "bar"];
    startButton.click();
    expect(window.currentWordIndex).toBe(0);
    expect(Array.isArray(window.words)).toBe(true);
    expect(window.words.length).toBeGreaterThan(0);
  });
});
