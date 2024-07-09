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
const qualityControl = document.getElementById('quality');
const clearButton = document.getElementById('clearButton');
const downloadButton = document.getElementById('downloadButton');

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
    const scale = parseInt(qualityControl.value); // 获取选定的清晰度等级
    const config = {
        width: imagePreview.clientWidth * scale,
        height: imagePreview.clientHeight * scale,
        style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${imagePreview.clientWidth}px`,
            height: `${imagePreview.clientHeight}px`
        },
        scale: scale,
        dpi: window.devicePixelRatio * scale // 设备像素比
    };

    domtoimage.toPng(imagePreview, config)
        .then(function(dataUrl) {
            const img = new Image();
            img.src = dataUrl;
            const a = document.createElement('a');
            a.href = img.src;
            a.download = 'edited-image.png';
            a.click();
        })
        .catch(function(error) {
            console.error('oops, something went wrong!', error);
        });
});
