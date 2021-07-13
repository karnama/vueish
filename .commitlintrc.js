/**
 * @type {import('@commitlint/types').UserConfig}
 */
module.exports = {
    extends: ['@commitlint/config-conventional'],

    rules: {
        'scope-enum': [
            2,
            'always',
            [
                // add scopes as required
                'avatar',
                'badge',
                'button',
                'button-group',
                'button-toggle',
                'checkbox',
                'dropdown',
                'file-input',
                'file-uploader',
                'input',
                'loader-linear',
                'loader-spinner',
                'modal',
                'panel',
                'pill',
                'radio',
                'range-slider',
                'select',
                'table',
                'textarea',
                'toggle',
                'transitions',
                'tooltip',
                'outer-html',
                'click-away',
                'intersect',
                'deps',
                'dev-deps'
            ]
        ],
    }
};
