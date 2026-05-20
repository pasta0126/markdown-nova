// Stub for zola-slug. Build with wasm-pack for real Zola slug support.
// Falls back to basic lowercase-hyphen slugification.
function slugify(input) {
    return input
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/--+/g, '-')
        .replace(/^-|-$/g, '');
}

module.exports = { slugify };
