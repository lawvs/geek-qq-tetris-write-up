// Side Effects

const noop = () => {};

const getAnything = ({ proto = function () {}, name, silent = false }) => {
  const log = (...args) => (silent ? noop : console.log("[Proxy]", ...args));

  return new Proxy(proto, {
    get(target, p, receiver) {
      log(`get ${name}:`, target, p);
      if (p in target) return target[p];
      return getAnything({ name: p, proto: proto[p] });
    },
    set(target, p, v, receiver) {
      log(`set ${name}:`, target, p);
      target[p] = v;
      return true;
    },
    apply(target, thisAr, argArray) {
      log(`apply ${target}`, thisAr, argArray);
      return getAnything({ name: name + "Result" });
    },
  });
};

const mockCanvas = getAnything({ name: "canvas" });

const tetrisGlobal = {
  addEventListener: getAnything({ name: "addEventListener", silent: true }),
};
// mock window
globalThis.window = tetrisGlobal;

export { tetrisGlobal, mockCanvas };
