import cp from 'child_process';
import {defaults} from 'lodash';

/**
 * Launch a shell command in a child process
 * @param {string} cmd
 * @param {Array<string>} args
 * @param {Object} options
 * @returns {Promise}
 */
export default function spawn(cmd, args, options) {
  return new Promise((resolve, reject) => {
    if (!cmd) {
      return reject(new Error(`\`cmd\` is required`));
    }

    console.info(`Running \`${cmd} ${args.join(` `)}\` in ${process.cwd()}`);
    const child = cp.spawn(cmd, args, defaults(options), {
      // At some point, this'll need to be node-version dependent
      std: [`pipe`, `pipe`, `pipe`]
    });

    let data = ``;
    if (child.stderr) {
      child.stderr.on(`data`, (d) => {
        data += d;
        process.stderr.write(d.toString());
      });
    }

    if (child.stdout) {
      child.stdout.on(`data`, (d) => {
        process.stdout.write(d.toString());
      });
    }

    child.on(`close`, (code) => {
      if (code) {
        const e = new Error(code);
        e.data = data;
        return reject(e);
      }
      return resolve();
    });

    if (options && options.detached) {
      child.unref();
      /* eslint no-param-reassign: [0] */
      options.child = child;
    }

    return null;
  });
}
