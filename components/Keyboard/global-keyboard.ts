"use client";

export interface HighlightEvent extends Event {
  key: string;
}

export class GlobalKeyboard extends EventTarget {
  keys = [
    ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace"],
    ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "enter"],
    ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "rshift"],
    ["ctrl", "alt", "space", "alt gr", "rctrl"],
  ];
  animationDuration = 125;
  animatedClass = "highlight";

  animationInterval: NodeJS.Timeout | null = null;

  highlightKey(key: string) {
    const event = new Event("highlight") as HighlightEvent;
    event.key = this._convertSyntheticKeyToRealKey(key);

    this.dispatchEvent(event);
  }

  startAnimation() {
    if (this.animationInterval) {
      return;
    }

    this.animationInterval = setInterval(() => {
      const key = this.keys.flat()[Math.floor(Math.random() * this.keys.flat().length)];
      this.highlightKey(key);
    }, this.animationDuration);
  }

  stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  _convertSyntheticKeyToRealKey(syntheticKey: string): string {
    switch (syntheticKey) {
      case "Control":
        return "ctrl";
      case " ":
        return "space";
      case "CapsLock":
        return "caps";
      default:
        return syntheticKey.toLowerCase();
    }
  }
}

export const globalKeyboard = new GlobalKeyboard();
