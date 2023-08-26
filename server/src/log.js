const { createConsola } = require("consola");
/**
 * Logging über log.info(), log.warn(), log.error()
 * Hierdurch kann das Logging später z.B. auf Winston umgestellt werden, so dass
 * (auch) in eine Datei geloggt wird.
 */
const log = createConsola({
  fancy: true,
  formatOptions: {
    columns: 80,
    colors: true,
    date: true,
  },
});

module.exports = log;
