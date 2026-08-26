export function downloadPalette(colors) {
    const palette = {
        colors: colors.map(c => ({
            hex: c.hex,
            rgb: c.rgb,
            hsl: c.hsl,
            percentage: c.percentage,
        })),
    };

    const blob = new Blob([JSON.stringify(palette, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.json';
    a.click();
    URL.revokeObjectURL(url);
}
