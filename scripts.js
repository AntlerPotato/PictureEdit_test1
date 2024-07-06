const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const sizeControl = document.getElementById('size');
const roundnessControl = document.getElementById('roundness');
const shadowControl = document.getElementById('shadow');
const backgroundControl = document.getElementById('background');
const clearButton = document.getElementById('clearButton');

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            imagePreview.style.border = 'none'; // Disable border when image is present
            updateImage();
        }
        reader.readAsDataURL(file);
    }
});

clearButton.addEventListener('click', function() {
    imagePreview.innerHTML = 'Drop the image here';
    imagePreview.style.background = '#ddd';
    imagePreview.style.boxShadow = 'none';
    imagePreview.style.border = '2px dashed transparent'; // Reset the border
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
    imagePreview.style.boxShadow = `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.1)`;
    imagePreview.style.background = background;
    imagePreview.style.border = 'none'; // Ensure border is removed when image is present
}

sizeControl.addEventListener('input', updateImage);
roundnessControl.addEventListener('input', updateImage);
shadowControl.addEventListener('input', updateImage);
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
        }
        reader.readAsDataURL(file);
    }
}

imagePreview.addEventListener('dragleave', function() {
    imagePreview.classList.remove('dragover');
});
