const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const sizeControl = document.getElementById('size');
const roundnessControl = document.getElementById('roundness');
const shadowControl = document.getElementById('shadow');
const backgroundControl = document.getElementById('background');

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function updateImage() {
    const size = sizeControl.value;
    const roundness = roundnessControl.value;
    const shadow = shadowControl.value;
    const background = backgroundControl.value;

    imagePreview.style.width = `${size}%`;
    imagePreview.style.borderRadius = `${roundness}px`;
    imagePreview.style.boxShadow = `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.1)`;
    imagePreview.style.background = background;
}

sizeControl.addEventListener('input', updateImage);
roundnessControl.addEventListener('input', updateImage);
shadowControl.addEventListener('input', updateImage);
backgroundControl.addEventListener('change', updateImage);
