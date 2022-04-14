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
                'label',
                'loader-linear',
                'loader-spinner',
                'modal',
                'panel',
                'radio',
                'range-slider',
                'select',
                'skeleton',
                'table',
                'textarea',
                'toggle',
                'pagination',
                'transitions',
                'tooltip',
                'outer-html',
                'click-away',
                'intersect',
                'deps',
                'deps-dev'
            ]
        ],
    }
};
