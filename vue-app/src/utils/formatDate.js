function formatDate(value) {
    let d = new Date(value);
    if (value) return d.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
};

function monthYear(value) {
    let d = new Date(value);
    if (value) return d.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });
};

export { formatDate, monthYear };
