
export const types = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'brand'] as const;
export type ButtonType = typeof types[number];

export const classTypes = {
    default: 'hover:bg-gray-200 active:bg-gray-300',
    primary: 'text-white bg-blue-600 hover:bg-blue-400 active:bg-blue-700',
    info: 'text-white bg-blue-400 hover:bg-blue-300 active:bg-blue-500',
    success: 'text-white bg-green-400 hover:bg-green-300 active:bg-green-500',
    warning: 'text-white bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500',
    danger: 'text-white bg-red-400 hover:bg-red-300 active:bg-red-500',
    brand: 'text-white bg-brand-400 hover:bg-brand-300 active:bg-brand-500'
} as { [key in ButtonType]: string; };
