// Document management
function loadDocuments() {
    const documents = getStorageData('documents') || [];
    const documentList = document.getElementById('documentList');
    documentList.innerHTML = '';
    
    documents.forEach(doc => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <strong>${doc.title}</strong>
                <span>(${doc.category})</span>
            </div>
            <div>${doc.uploadDate}</div>
        `;
        documentList.appendChild(listItem);
    });
}

function uploadDocument(e) {
    e.preventDefault();
    
    const title = document.getElementById('docTitle').value;
    const category = document.getElementById('docCategory').value;
    const filename = document.getElementById('docFile').value;
    
    if (!title || !filename) return;
    
    const documents = getStorageData('documents') || [];
    const newDocument = {
        id: documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1,
        title,
        category,
        filename,
        uploadDate: new Date().toISOString().split('T')[0]
    };
    
    documents.push(newDocument);
    setStorageData('documents', documents);
    
    loadDocuments();
    document.getElementById('documentForm').reset();
}

// Initialize document form
document.getElementById('documentForm').addEventListener('submit', uploadDocument);
