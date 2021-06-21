import type { Ref } from 'vue';
import { ref, readonly, watch, computed } from 'vue';
import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity';
import { isString } from '../utils';

export interface Schema<R = Ref> {
    [key: string]: {
        $value: R;
        rules: (Rule<any> | RuleName)[];
        messages?: { [key in RuleName]?: string; };
    };
}

export type Errors = Record<string, string[]>;
export type FailClosure = (msg: string) => void;
/**
 * Return true on passing validation false on failure.
 */
export type Rule<T> = (
    val: DeepReadonly<UnwrapNestedRefs<T>>,
    fail: FailClosure,
    context: DeepReadonly<UnwrapNestedRefs<Schema>>
) => void;

// with arguments (size, gt, lt, gte, lte, in, notIn, same, requiredIf, requiredWith requiredUnless)
export type RuleName =
    'array'
    | 'object'
    | 'number'
    | 'boolean'
    | 'required'
    | 'email'
    | 'url'
    | 'image'
    | 'file'
    | 'uuid';

/**
 * Normally rules that handle multiple types, they can handle the below types hence all messages are required.
 */
export interface ErrorMessageTypes {
    string: string;
    number: string;
    array: string;
    file: string;
}

// todo - make messages translatable
const messages: Record<RuleName, string | ErrorMessageTypes> = {
    required: ':value: is required.'
};

/**
 * Get the correct error message for the given rule.
 */
const getErrorMessage = (rule: RuleName, type?: keyof ErrorMessageTypes): string => {
    const message = messages[rule];

    if (typeof message === 'string') {
        return message;
    }

    if (!type) {
        throw new Error('Unable to determine what message to use. No `type` given.');
    }

    if (!message[type]) {
        throw new Error('Message for the type: \'' + type + '\' has not been defined for the rule: \'' + rule + '\'.');
    }

    return message[type];
};

// todo - make it tree shakeable by only importing used ones
const availableRules: Record<RuleName, Rule<unknown>> = {
    /**
     * Value is defined and has value.
     */
    required: (val, fail) => {
        if (isString(val) && !val.length || val === undefined) {
            fail(getErrorMessage('required'));
        }
    }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useValidator = (schema: Schema) => {
    const errors = ref<Errors>({});
    const hasErrors = computed(() => !!Object.keys(errors.value).length);
    const rOSchema = readonly(schema);

    const getErrorsFor = (key: string) => errors.value[key] ?? [];
    const validate = (schema: DeepReadonly<UnwrapNestedRefs<Schema>>) => {
        const newErrors: Record<string, string[]> = {};

        Object.keys(schema).forEach(key => {
            const fail: FailClosure = (msg) => {
                msg = msg.replace(':value:', key);
                newErrors[key] ? newErrors[key].push(msg) : newErrors[key] = [msg];
            };

            schema[key].rules.forEach(rule => {
                typeof rule === 'string'
                    ? availableRules[rule](schema[key].$value, fail, schema)
                    : rule(schema[key].$value, fail, schema);
            });
        });

        errors.value = newErrors;
    };

    watch(() => rOSchema, scm => validate(scm), { immediate: false, deep: true });

    return {
        errors,
        hasErrors,
        getErrorsFor
    };
};
