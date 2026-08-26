import { rgbToHex, rgbToHsl, formatRgb, formatHsl } from './colorConverter';

const MAX_ANALYSIS_SIZE = 250;
const KMEANS_ITERATIONS = 10;

function getPixelData(imageElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let { width, height } = imageElement;

    if (width > MAX_ANALYSIS_SIZE || height > MAX_ANALYSIS_SIZE) {
        const scale = MAX_ANALYSIS_SIZE / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imageElement, 0, 0, width, height);

    return ctx.getImageData(0, 0, width, height).data;
}

function initCentroids(pixels, k) {
    const centroids = [];
    const step = Math.floor(pixels.length / k);

    for (let i = 0; i < k; i++) {
        const idx = (i * step) * 4;
        centroids.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]]);
    }

    return centroids;
}

function distance(a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

function kMeans(pixels, k) {
    let centroids = initCentroids(pixels, k);
    const assignments = new Int32Array(pixels.length / 4);

    for (let iter = 0; iter < KMEANS_ITERATIONS; iter++) {
        const sums = Array.from({ length: k }, () => [0, 0, 0]);
        const counts = new Int32Array(k);

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];

            if (a < 128) continue;

            let minDist = Infinity;
            let bestCluster = 0;

            for (let c = 0; c < k; c++) {
                const d = distance([r, g, b], centroids[c]);
                if (d < minDist) {
                    minDist = d;
                    bestCluster = c;
                }
            }

            const idx = i / 4;
            assignments[idx] = bestCluster;
            sums[bestCluster][0] += r;
            sums[bestCluster][1] += g;
            sums[bestCluster][2] += b;
            counts[bestCluster]++;
        }

        for (let c = 0; c < k; c++) {
            if (counts[c] > 0) {
                centroids[c] = [
                    Math.round(sums[c][0] / counts[c]),
                    Math.round(sums[c][1] / counts[c]),
                    Math.round(sums[c][2] / counts[c]),
                ];
            }
        }
    }

    const counts = new Int32Array(k);
    for (let i = 0; i < assignments.length; i++) {
        counts[assignments[i]]++;
    }

    const totalPixels = pixels.length / 4;
    const results = [];

    for (let c = 0; c < k; c++) {
        if (counts[c] === 0) continue;

        const [r, g, b] = centroids[c];
        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);
        const percentage = parseFloat(((counts[c] / totalPixels) * 100).toFixed(1));

        results.push({
            hex,
            r, g, b,
            rgb: formatRgb(r, g, b),
            hsl: formatHsl(hsl.h, hsl.s, hsl.l),
            percentage,
        });
    }

    results.sort((a, b) => b.percentage - a.percentage);
    return results;
}

export function extractColors(imageElement, numColors) {
    const pixels = getPixelData(imageElement);
    return kMeans(pixels, numColors);
}
