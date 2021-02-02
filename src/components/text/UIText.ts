/**
 * Assert the key from the KeyboardEvent
 * was of an allowed type.
 */
export function onlyNumber(event: KeyboardEvent): void {
    const pattern = new RegExp('(?=\\d|\\.|(Backspace)|(ArrowLeft)|(ArrowRight)|(Delete))');

    if (!pattern.test(event.key)) {
        event.preventDefault();
    }
}
