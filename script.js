let files = [];


// Load files
function loadFiles() {

    const savedFiles = localStorage.getItem("cloudFiles");

    if (savedFiles) {
        files = JSON.parse(savedFiles);
    }

    renderFiles();
}


// Upload file
function uploadFile() {

    const fileInput = document.getElementById("fileInput");

    const file = fileInput.files[0];

    if (!file) {
        showMessage("Please select a file.");
        return;
    }

    const newFile = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type || "Unknown",
        date: new Date().toLocaleDateString()
    };

    files.push(newFile);

    saveFiles();

    fileInput.value = "";

    showMessage("File uploaded successfully!");

    renderFiles();
}


// Save files
function saveFiles() {

    localStorage.setItem(
        "cloudFiles",
        JSON.stringify(files)
    );
}


// Render files
function renderFiles(filteredFiles = files) {

    const fileList =
        document.getElementById("fileList");

    fileList.innerHTML = "";

    if (filteredFiles.length === 0) {

        fileList.innerHTML =
            `<div class="empty">No files found.</div>`;

        updateStats();

        return;
    }

    filteredFiles.forEach(file => {

        const card = document.createElement("div");

        card.className = "file-card";

        card.innerHTML = `
            <div class="file-info">
                <h3>📄 ${file.name}</h3>
                <p>
                    ${formatSize(file.size)}
                    • ${file.date}
                </p>
            </div>

            <div class="file-actions">

                <button class="download"
                    onclick="downloadFile(${file.id})">
                    ⬇️ Download
                </button>

                <button class="delete"
                    onclick="deleteFile(${file.id})">
                    🗑️ Delete
                </button>

            </div>
        `;

        fileList.appendChild(card);
    });

    updateStats();
}


// Delete file
function deleteFile(id) {

    files = files.filter(file => file.id !== id);

    saveFiles();

    renderFiles();

    showMessage("File deleted.");
}


// Download demo file
function downloadFile(id) {

    const file = files.find(file => file.id === id);

    if (!file) return;

    const content =
        `Cloud File Storage Manager\n\nFile Name: ${file.name}\nFile Size: ${formatSize(file.size)}\nUploaded: ${file.date}`;

    const blob = new Blob(
        [content],
        { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = file.name + ".txt";

    link.click();

    URL.revokeObjectURL(url);
}


// Search
function searchFiles() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = files.filter(file =>
        file.name.toLowerCase().includes(search)
    );

    renderFiles(filtered);
}


// Update statistics
function updateStats() {

    document.getElementById("fileCount")
        .textContent = files.length;

    const totalSize =
        files.reduce(
            (total, file) => total + file.size,
            0
        );

    document.getElementById("storage")
        .textContent = formatSize(totalSize);
}


// Format size
function formatSize(bytes) {

    if (bytes < 1024) {
        return bytes + " B";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}


// Message
function showMessage(message) {

    const element =
        document.getElementById("message");

    element.textContent = message;

    setTimeout(() => {
        element.textContent = "";
    }, 2500);
}


// Start
loadFiles();