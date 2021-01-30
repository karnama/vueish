/**
 * localStorage wrapper utility to manage values safely.
 */
export default class LocalCache {
    /**
     * The string value to be added to every keys to avoid clash.
     *
     * @private
     */
    private prefix = '';

    /**
     * The class constructor.
     *
     * @param namespace
     *
     * @return {LocalCache}
     */
    public constructor(namespace = '') {
        this.namespace = namespace;

        return this;
    }

    /**
     * The get method.
     *
     * @param key
     * @param defaultValue
     *
     * @return {*}
     */
    public get<T extends any>(key: string, defaultValue?: T): T | undefined {
        try {
            let value = JSON.parse(localStorage.getItem(this.prefix + key) as string);

            // returns null if not defined
            if (value === null || value === undefined) {
                value = defaultValue;
            }

            return value;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(
                '"' + key + '" cannot be parsed to a Javascript type: \n'
                + String(localStorage.getItem(this.prefix + key))
            );
            this.remove(key);

            return;
        }
    }

    /**
     * Set the value in local storage
     *
     * @param {String} key
     * @param {*} value
     *
     * @return {LocalCache}
     */
    public set(key: string, value: any): this {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));

        return this;
    }


    /**
     * Merge the value with existing value.
     *
     * @param {String} key
     * @param {*} value
     *
     * @return {LocalCache}
     */
    public add(key: string, value: any): this {
        let storedValue = this.get(key);

        if (!storedValue) {
            this.set(key, value);

            return this;
        }

        if (Array.isArray(storedValue)) {
            if (!Array.isArray(value)) {
                value = [value];
            }

            storedValue.push(...value);
        } else if (storedValue === Object(storedValue) && value === Object(value)) {
            storedValue = Object.assign(storedValue, value);
        } else {
            // default to Javascript's type coercion
            storedValue += value;
        }

        this.set(key, storedValue);
        return this;
    }

    /**
     * Remove the value from localStorage.
     *
     * @param {String} key
     *
     * @return {LocalCache}
     */
    public remove(key: string): this {
        localStorage.removeItem(this.prefix + key);
        return this;
    }

    /**
     * Determines whether the key exists or not.
     *
     * @param {String} key
     *
     * @return {Boolean}
     */
    public has(key: string): boolean {
        return !!this.get(key);
    }

    /**
     * The fluent setter for the namespace
     * @param namespace
     */
    public set namespace(namespace: string) {
        if (typeof namespace !== 'string') {
            throw new Error('Invalid type for namespace. Expected string got ' + typeof namespace);
        }

        this.prefix = namespace + '_';
    }
}
