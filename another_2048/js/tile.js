export default class Tile {
  #titleElement;
  #x;
  #y;
  #value;

  constructor(tileCotainer, value = Math.random() > .5 ? 2 : 4) {
    this.#titleElement = document.createElement("div");
    this.#titleElement.classList.add("tile");
    tileCotainer.append(this.#titleElement);
    this.value = value;
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    this.#value = v;
    this.#titleElement.textContent = v;
    const power = Math.log2(v);
    const backgroundLightness = 100 - power * 9;   // decrease light with more power
    this.#titleElement.style.setProperty(
      "--background-lightness",
      `${backgroundLightness}%`
    );
    this.#titleElement.style.setProperty(
      "--text-lightness",
      `${backgroundLightness <= 50 ? 90 : 10}%`
    );
  }

  set x(x) {
    this.#x = x;
    this.#titleElement.style.setProperty("--x", x);
  }

  set y(y) {
    this.#y = y;
    this.#titleElement.style.setProperty("--y", y);
  }

  remove() {
    this.#titleElement.remove();
  }

  waitForTransition(animation=false) {
    return new Promise(resolve => {
      this.#titleElement.addEventListener(
        animation ? "animationend" : "transitionend",
        resolve,
        {once: true}
      );
    });
  }
}