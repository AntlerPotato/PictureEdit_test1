import React, { useRef, useEffect } from 'react';
import Slider from './Slider';

function ImageEditor({ image }) {
    const canvasRef = useRef(null);
    const [size, setSize] = useState(100);
    const [roundness, setRoundness] = useState(0);
    const [shadow, setShadow] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
            const scale = size / 100;
            const width = img.width * scale;
            const height = img.height * scale;
            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);
            ctx.save();
            // 添加阴影
            ctx.shadowOffsetX = shadow;
            ctx.shadowOffsetY = shadow;
            ctx.shadowBlur = 10;  // 阴影模糊度
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            // 绘制圆角矩形
            if (roundness > 0) {
                ctx.beginPath();
                ctx.moveTo(roundness, 0);
                ctx.lineTo(width - roundness, 0);
                ctx.quadraticCurveTo(width, 0, width, roundness);
                ctx.lineTo(width, height - roundness);
                ctx.quadraticCurveTo(width, height, width - roundness, height);
                ctx.lineTo(roundness, height);
                ctx.quadraticCurveTo(0, height, 0, height - roundness);
                ctx.lineTo(0, roundness);
                ctx.quadraticCurveTo(0, 0, roundness, 0);
                ctx.closePath();
                ctx.clip();
            }
            ctx.drawImage(img, 0, 0, width, height);
            ctx.restore();
        };
    }, [image, size, roundness, shadow]);

    return (
        <div className="editor">
            <canvas ref={canvasRef} />
            <Slider label="Size" value={size} onChange={setSize} />
            <Slider label="Roundness" value={roundness} onChange={setRoundness} />
            <Slider label="Shadow" value={shadow} onChange={setShadow} />
        </div>
    );
}

export default ImageEditor;
