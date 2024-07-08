const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const sizeControl = document.getElementById('size');
const sizeValue = document.getElementById('sizeValue');
const sizeHint = document.getElementById('sizeHint');
const roundnessControl = document.getElementById('roundness');
const roundnessValue = document.getElementById('roundnessValue');
const roundnessHint = document.getElementById('roundnessHint');
const shadowControl = document.getElementById('shadow');
const shadowValue = document.getElementById('shadowValue');
const shadowHint = document.getElementById('shadowHint');
const backgroundControl = document.getElementById('background');
const clearButton = document.getElementById('clearButton');
const downloadButton = document.getElementById('downloadButton');

let currentShadow = '0px 0px 0px rgba(0,0,0,0)'; // 初始值，无阴影

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            imagePreview.style.border = 'none'; // Disable border when image is present
            updateImage();
            downloadButton.disabled = false; // Enable download button
        }
        reader.readAsDataURL(file);
    }
});

clearButton.addEventListener('click', function() {
    location.reload(); // Refresh the page
});

function updateImage() {
    const img = imagePreview.querySelector('img');
    if (!img) return;

    const size = sizeControl.value;
    const roundness = roundnessControl.value;
    const shadow = shadowControl.value;
    const background = backgroundControl.value;

    img.style.width = `${size}%`;
    img.style.borderRadius = `${roundness}px`;
    img.style.boxShadow = `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.4)`; // Updated shadow depth
    imagePreview.style.background = background;

    sizeValue.value = size;
    roundnessValue.value = roundness;
    shadowValue.value = shadow;

    currentShadow = `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.4)`; // 保存当前阴影值
}

sizeControl.addEventListener('input', function() {
    sizeValue.value = sizeControl.value;
    updateImage();
});

roundnessControl.addEventListener('input', function() {
    roundnessValue.value = roundnessControl.value;
    updateImage();
});

shadowControl.addEventListener('input', function() {
    shadowValue.value = shadowControl.value;
    updateImage();
});

sizeValue.addEventListener('focus', function() {
    sizeHint.style.display = 'block';
});

sizeValue.addEventListener('blur', function() {
    sizeHint.style.display = 'none';
});

sizeValue.addEventListener('input', function() {
    const value = parseInt(sizeValue.value);
    if (value >= 10 && value <= 100) {
        sizeControl.value = value;
        updateImage();
    }
});

roundnessValue.addEventListener('focus', function() {
    roundnessHint.style.display = 'block';
});

roundnessValue.addEventListener('blur', function() {
    roundnessHint.style.display = 'none';
});

roundnessValue.addEventListener('input', function() {
    const value = parseInt(roundnessValue.value);
    if (value >= 0 && value <= 50) {
        roundnessControl.value = value;
        updateImage();
    }
});

shadowValue.addEventListener('focus', function() {
    shadowHint.style.display = 'block';
});

shadowValue.addEventListener('blur', function() {
    shadowHint.style.display = 'none';
});

shadowValue.addEventListener('input', function() {
    const value = parseInt(shadowValue.value);
    if (value >= 0 && value <= 40) {
        shadowControl.value = value;
        updateImage();
    }
});

backgroundControl.addEventListener('change', updateImage);

function handleDragOver(e) {
    e.preventDefault();
    imagePreview.classList.add('dragover');
}
function handleDrop(e) {
    e.preventDefault();
    imagePreview.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            imagePreview.style.border = 'none'; // Disable border when image is present
            updateImage();
            downloadButton.disabled = false; // Enable download button
        }
        reader.readAsDataURL(file);
    }
}

function handleDragEnter() {
    imagePreview.classList.add('dragover');
}

function handleDragLeave() {
    imagePreview.classList.remove('dragover');
}

imagePreview.addEventListener('dragover', handleDragOver);
imagePreview.addEventListener('drop', handleDrop);
imagePreview.addEventListener('dragenter', handleDragEnter);
imagePreview.addEventListener('dragleave', handleDragLeave);

downloadButton.addEventListener('click', function() {
    html2canvas(imagePreview, {
        backgroundColor: null,
        useCORS: true, // Allow cross-origin images to be used
        scale: window.devicePixelRatio, // Use device pixel ratio for better quality
        logging: true, // Enable logging for debugging
        onclone: (document) => {
            const clonedPreview = document.getElementById('imagePreview');
            const img = clonedPreview.querySelector('img');
            if (img) {
                img.style.border = 'none';
                img.style.margin = '0';
                img.style.boxShadow = currentShadow; // 使用保存的阴影值
            }
            clonedPreview.style.border = 'none';
            clonedPreview.style.padding = '0';
            clonedPreview.style.margin = '0';
            clonedPreview.style.boxShadow = 'none';
        },
        removeContainer: true // Ensure container is removed after render
    }).then((canvas) => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'edited-image.png';
        a.click();
    });
});
