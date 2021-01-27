export const types = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'brand'] as const;
export type ButtonType = typeof types[number];

export const typeClasses = {
    default: 'hover:bg-gray-200 bg-gray-300 disabled:bg-gray-300',
    primary: 'text-white bg-blue-600 hover:bg-blue-400 disabled:bg-blue-600',
    info: 'text-white bg-blue-400 hover:bg-blue-300 disabled:bg-blue-400',
    success: 'text-white bg-green-400 hover:bg-green-300 disabled:bg-green-400',
    warning: 'text-white bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400',
    danger: 'text-white bg-red-400 hover:bg-red-300 disabled:bg-red-400',
    brand: 'text-white bg-brand-400 hover:bg-brand-300 disabled:bg-brand-400'
} as { [key in ButtonType]: string; };
