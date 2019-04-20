
export function FirstLineIndentButton() {
    return {
        install(editor) {
            editor.addButton('first_line_indent', {
                icon: 'first-indent',
                title: '首行缩进',
                onclick: function () {
                    editor.undoManager.transact(function () {
                        editor.execCommand('mceToggleFormat', false, 'first_line_indent');
                    });
                },

                onpostrender: function () {
                    var btn = this;
                    editor.on('init', function () {
                        editor.formatter.formatChanged('first_line_indent', function (state) {
                            btn.active(state);
                        });
                    });
                }
            });
        }
    }
}

export function BodyMarginButton() {
    return {
        install(editor) {
            var _value = { format: 'body_margin', value: "0" };
            const values = [
                { text: '默认', value: { format: 'body_margin', value: '0' }, },
                { text: '8px', value: { format: 'body_margin', value: '8px' }, },
                { text: '16px', value: { format: 'body_margin', value: '16px' }, },
                { text: '32px', value: { format: 'body_margin', value: '32px' }, },
                { text: '48px', value: { format: 'body_margin', value: '48px' }, },
            ].map(item => {
                return {
                    text: item.text,
                    onclick: function () {
                        _value = item.value;
                        active(_value);
                    }
                }
            })
            function active(_value) {
                const value = _value || {};
                editor.undoManager.transact(function () {
                    editor.formatter.apply('wrapper_margin', { value: value.value }, editor.contentDocument.body);
                });
            }

            editor.addButton('body_margin', {
                type: 'splitbutton',
                title: '两侧边距',
                icon: 'page-margin',
                onclick: function () {
                    active(_value);
                },
                menu: values
            });
        }
    }
}

export function MarginTopButton() {
    return {
        install(editor) {
            var _value = { format: 'margin_top', value: "auto" };
            function active(_value) {
                const value = _value || {};
                editor.undoManager.transact(function () {
                    editor.formatter.apply(value.format, { value: value.value });
                });
            }
            const values = [
                { text: '默认', value: { format: 'margin_top', value: 'auto' }, },
                { text: '5px', value: { format: 'margin_top', value: '5px' }, },
                { text: '10px', value: { format: 'margin_top', value: '10px' }, },
                { text: '15px', value: { format: 'margin_top', value: '15px' }, },
                { text: '20px', value: { format: 'margin_top', value: '20px' }, },
                { text: '25px', value: { format: 'margin_top', value: '25px' }, },
            ].map(item => {
                return {
                    text: item.text,
                    onclick: function () {
                        _value = item.value;
                        active(_value);
                    }
                }
            })

            editor.addButton('margin_top', {
                type: 'splitbutton',
                title: '段前距',
                icon: 'margin-top',
                onclick: function () {
                    active(_value);
                },
                menu: values
            });
        }
    }
}
export function MarginButtomButton() {
    return {
        install(editor) {
            var _value = { format: 'margin_bottom', value: "auto" };
            function active(_value) {
                const value = _value || {};
                editor.undoManager.transact(function () {
                    editor.formatter.apply(value.format, { value: value.value });
                });
            }
            const values = [
                { text: '默认', value: { format: 'margin_bottom', value: 'auto' }, },
                { text: '5px', value: { format: 'margin_bottom', value: '5px' }, },
                { text: '10px', value: { format: 'margin_bottom', value: '10px' }, },
                { text: '15px', value: { format: 'margin_bottom', value: '15px' }, },
                { text: '20px', value: { format: 'margin_bottom', value: '20px' }, },
                { text: '25px', value: { format: 'margin_bottom', value: '25px' }, },
            ].map(item => {
                return {
                    text: item.text,
                    onclick: function () {
                        _value = item.value;
                        active(_value);
                    }
                }
            })

            editor.addButton('margin_bottom', {
                type: 'splitbutton',
                title: '段后距',
                icon: 'margin-bottom',
                onclick: function () {
                    active(_value);
                },
                menu: values
            });
        }
    }
}
export function LineHeightButton() {
    return {
        install(editor) {
            var _value = { format: 'line_height', value: "auto" };
            function active(_value) {
                const value = _value || {};
                editor.undoManager.transact(function () {
                    editor.formatter.apply(value.format, { value: value.value });
                });
            }
            const values = [
                { text: '默认', value: { format: 'line_height', value: 'normal' }, },
                { text: '1倍', value: { format: 'line_height', value: '1' }, },
                { text: '1.5倍', value: { format: 'line_height', value: '1.5' }, },
                { text: '1.75倍', value: { format: 'line_height', value: '1.75' }, },
                { text: '2倍', value: { format: 'line_height', value: '2' }, },
                { text: '3倍', value: { format: 'line_height', value: '3' }, },
                { text: '4倍', value: { format: 'line_height', value: '4' }, },
                { text: '5倍', value: { format: 'line_height', value: '5' }, },
            ].map(item => {
                return {
                    text: item.text,
                    onclick: function () {
                        _value = item.value;
                        active(_value);
                    }
                }
            })

            editor.addButton('line_height', {
                type: 'splitbutton',
                title: '行间距',
                icon: 'line-height',
                onclick: function () {
                    active(_value);
                },
                menu: values
            });
        }
    }
}
export function LetterSpacingButton() {
    return {
        install(editor) {

            var _value = { format: 'letter_spacing', value: "auto" };
            const values = [
                { text: '默认', value: { format: 'letter_spacing', value: 'normal' }, },
                { text: '0px', value: { format: 'letter_spacing', value: '0px' }, },
                { text: '0.25px', value: { format: 'letter_spacing', value: '0.25px' }, },
                { text: '0.5px', value: { format: 'letter_spacing', value: '0.5px' }, },
                { text: '1px', value: { format: 'letter_spacing', value: '1px' }, },
                { text: '2px', value: { format: 'letter_spacing', value: '2px' }, },
                { text: '3px', value: { format: 'letter_spacing', value: '3px' }, },
                { text: '4px', value: { format: 'letter_spacing', value: '4px' }, },
                { text: '5px', value: { format: 'letter_spacing', value: '5px' }, },
            ].map(item => {
                return {
                    text: item.text,
                    onclick: function () {
                        _value = item.value;
                        active(_value);
                    }
                }
            })
            function active(_value) {
                const value = _value || {};
                editor.undoManager.transact(function () {
                    editor.formatter.apply(value.format, { value: value.value });
                });
            }

            editor.addButton('letter_spacing', {
                type: 'splitbutton',
                title: '字间距',
                icon: 'letter-spacing',
                onclick: function () {
                    active(_value);
                },
                menu: values
            });
        }
    }
}