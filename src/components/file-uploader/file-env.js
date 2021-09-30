const JsdomEnvironment = require('jest-environment-jsdom');

/** See jsdom/jsdom#1272 */
class EnvWithSyntheticFileList extends JsdomEnvironment {
    async setup() {
        await super.setup();
        this.global.jsdomUtils = require('jsdom/lib/jsdom/living/generated/utils');
        this.global.jsdomFileList = require('jsdom/lib/jsdom/living/generated/FileList');
    }
}

module.exports = EnvWithSyntheticFileList;
