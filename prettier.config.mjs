export default {
    plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
        {
            files: '*.svelte',
            options: {
                parser: 'svelte',
            },
        },
    ],
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
};
