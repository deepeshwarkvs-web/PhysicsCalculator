const formulaLibrary = [
  // Velocity
  {
    name: "velocity",
    label: "velocity",
    equation: "v = u + at",
    definition:
      "Calculates the final velocity of an object moving with constant acceleration.",
    vars: ["v", "u", "a", "t"],
    category: "motion",
    class: "9",
    xAxisLabel: "Time (s)",
    requires: ["u", "a", "t"],
    yAxisLabel: "Velocity",
    aliases: {
      v: ["final velocity", "v"],
      u: ["initial velocity", "u"],
      a: ["acceleration", "a"],
      t: ["time", "t"],
    },
    unitMap: {
      v: "m/s",
      u: "m/s",
      a: "m/s²",
      t: "s",
    },
    state: [
      { name: "v", negative: true },
      { name: "u", negative: true },
      { name: "a", negative: true },
      { name: "t", negative: false },
    ],
    labels: {
      v: "Final Velocity (v)",
      u: "Initial Velocity (u)",
      a: "Acceleration (a)",
      t: "Time (t)",
    },
    graphConfig: {
      v: {
        x: "t",
        yLabel: "Velocity",
        unit: "m/s",
      },

      u: {
        x: "t",
        yLabel: "Initial Velocity",
        unit: "m/s",
      },

      a: {
        x: "t",
        yLabel: "Acceleration",
        unit: "m/s²",
      },

      t: {
        x: "v",
        yLabel: "Time",
        unit: "s",
      },
    },
    solve: {
      v: (x) => x.u + x.a * x.t,
      u: (x) => x.v - x.a * x.t,
      a: (x) => (x.v - x.u) / x.t,
      t: (x) => (x.v - x.u) / x.a,
    },
    getSteps: {
      v: (v, res) =>
        `v = u + at <br> v = ${v.u} + ${v.a} * ${v.t} <br> v = ${res} m/s`,
      u: (v, res) =>
        `u = v - at <br> u = ${v.v} - (${v.a} * ${v.t}) <br> u = ${res} m/s`,
      a: (v, res) =>
        `a = (v - u) / t <br> a = (${v.v} - ${v.u}) / ${v.t} <br> a = ${res} m/s²`,
      t: (v, res) =>
        `t = (v - u) / a <br> t = (${v.v} - ${v.u}) / ${v.a} <br> t = ${res} s`,
    },
    generateGraph: (vals) => {
      let points = [];
      for (let i = 0; i <= 20; i++) {
        points.push({ x: i, y: Number(vals.u) + Number(vals.a) * i });
      }
      return points;
    },
  },
  // Work
  {
    name: "work",
    label: "work",
    equation: "W = F x s",
    definition:
      "The measure of energy transfer that occurs when an object is moved over a distance by an external force.",
    vars: ["W", "F", "s"],
    category: "energy",
    class: "10",
    xAxisLabel: "Displacement (m)",
    requires: ["F", "s"],
    aliases: {
      W: ["work", "W"],
      F: ["force", "F"],
      s: ["distance", "displacement", "s"],
    },
    yAxisLabel: "Work",
    unitMap: {
      W: "J",
      F: "N",
      s: "m",
    },
    graphConfig: {
      W: {
        x: "s",
        yLabel: "Work",
        unit: "J",
      },

      F: {
        x: "s",
        yLabel: "Force",
        unit: "N",
      },

      s: {
        x: "F",
        yLabel: "Displacement",
        unit: "m",
      },
    },
    state: [
      { name: "W", negative: true },
      { name: "F", negative: true },
      { name: "s", negative: true },
    ],
    labels: { W: "Work Done (W)", F: "Force (F)", s: "Displacement (s)" },
    solve: {
      W: (x) => x.F * x.s,
      F: (x) => x.W / x.s,
      s: (x) => x.W / x.F,
    },
    getSteps: {
      W: (v, res) => `W = F * s <br> W = ${v.F} * ${v.s} <br> W = ${res} J`,
      F: (v, res) => `F = W / s <br> F = ${v.W} / ${v.s} <br> F = ${res} N m`,
      s: (v, res) => `s = W / F <br> s = ${v.W} / ${v.F} <br> s = ${res} m`,
    },
    generateGraph: (vals) => {
      let points = [];
      for (let i = 0; i <= 20; i++) {
        points.push({ x: i, y: Number(vals.F) * i });
      }
      return points;
    },
  },
];

const special_words = [
  "is",
  "for",
  "while",
  "+",
  "-",
  "*",
  "/",
  "(",
  ")",
  ":",
  "=",
];

export { formulaLibrary, special_words };
