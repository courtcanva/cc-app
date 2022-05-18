module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      1,
      "always",
      ["ci", "chore", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"],
    ],
  },
};
