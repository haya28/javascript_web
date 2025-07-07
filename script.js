// グローバル変数
let animationId = null;
let time = 0;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeUnitCircle();
    initializeTransformationDemo();
    initializeCanvasDemo();
    initializeMatrixDemo();
    initializeInteractiveDemo();
    initializeWaveDemo();
    
    // イベントリスナーの設定
    setupEventListeners();
});

// イベントリスナーの設定
function setupEventListeners() {
    // 角度スライダー
    const angleSlider = document.getElementById('angleSlider');
    const angleValue = document.getElementById('angleValue');
    angleSlider.addEventListener('input', function() {
        const angle = this.value;
        angleValue.textContent = angle + '°';
        updateUnitCircle(angle);
    });

    // 回転スライダー
    const rotationSlider = document.getElementById('rotationSlider');
    const rotationValue = document.getElementById('rotationValue');
    rotationSlider.addEventListener('input', function() {
        const angle = this.value;
        rotationValue.textContent = angle + '°';
        updateTransformationDemo(angle);
    });

    // スケールスライダー
    const scaleSlider = document.getElementById('scaleSlider');
    const scaleValue = document.getElementById('scaleValue');
    scaleSlider.addEventListener('input', function() {
        const scale = this.value;
        scaleValue.textContent = scale;
        updateMatrixDemo(scale);
    });

    // 波の数スライダー
    const waveCountSlider = document.getElementById('waveCountSlider');
    const waveCountValue = document.getElementById('waveCountValue');
    waveCountSlider.addEventListener('input', function() {
        const count = this.value;
        waveCountValue.textContent = count;
    });

    // アニメーションボタン
    document.getElementById('startAnimation').addEventListener('click', startAnimation);
    document.getElementById('stopAnimation').addEventListener('click', stopAnimation);
}

// 単位円の初期化と描画
function initializeUnitCircle() {
    const canvas = document.getElementById('unitCircle');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 座標軸を描画
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 単位円を描画
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // 初期角度の点を描画
    updateUnitCircle(0);
}

function updateUnitCircle(angleDegrees) {
    const canvas = document.getElementById('unitCircle');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    // 角度をラジアンに変換
    const angleRadians = (angleDegrees * Math.PI) / 180;

    // 三角関数で座標を計算
    const x = centerX + radius * Math.cos(angleRadians);
    const y = centerY - radius * Math.sin(angleRadians); // Y軸は反転

    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 座標軸を描画
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 単位円を描画
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // 点を描画
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();

    // 線を描画
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // 座標を表示
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.fillText(`(${Math.cos(angleRadians).toFixed(2)}, ${Math.sin(angleRadians).toFixed(2)})`, x + 10, y - 10);
}

// 座標変換デモの初期化
function initializeTransformationDemo() {
    const canvas = document.getElementById('transformationDemo');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 座標軸を描画
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 元の図形（三角形）を描画
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.beginPath();
    ctx.moveTo(centerX - 30, centerY + 20);
    ctx.lineTo(centerX + 30, centerY + 20);
    ctx.lineTo(centerX, centerY - 30);
    ctx.closePath();
    ctx.fill();

    updateTransformationDemo(0);
}

function updateTransformationDemo(angleDegrees) {
    const canvas = document.getElementById('transformationDemo');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 座標軸を描画
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 元の図形（三角形）を描画
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.beginPath();
    ctx.moveTo(centerX - 30, centerY + 20);
    ctx.lineTo(centerX + 30, centerY + 20);
    ctx.lineTo(centerX, centerY - 30);
    ctx.closePath();
    ctx.fill();

    // 角度をラジアンに変換
    const angleRadians = (angleDegrees * Math.PI) / 180;

    // 回転行列の要素
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);

    // 三角形の頂点（元の座標）
    const originalPoints = [
        {x: -30, y: 20},
        {x: 30, y: 20},
        {x: 0, y: -30}
    ];

    // 回転後の座標を計算
    const rotatedPoints = originalPoints.map(point => ({
        x: point.x * cos - point.y * sin,
        y: point.x * sin + point.y * cos
    }));

    // 回転後の図形を描画
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(centerX + rotatedPoints[0].x, centerY + rotatedPoints[0].y);
    ctx.lineTo(centerX + rotatedPoints[1].x, centerY + rotatedPoints[1].y);
    ctx.lineTo(centerX + rotatedPoints[2].x, centerY + rotatedPoints[2].y);
    ctx.closePath();
    ctx.fill();
}

// Canvas API デモの初期化
function initializeCanvasDemo() {
    const canvas = document.getElementById('canvasDemo');
    const ctx = canvas.getContext('2d');
    
    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 基本的な図形を描画
    drawBasicShapes(ctx, canvas.width, canvas.height);
}

function drawBasicShapes(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;

    // 円を描画（三角関数を使用）
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fill();

    // 正六角形を描画
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = centerX + 60 * Math.cos(angle);
        const y = centerY + 60 * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();

    // 星を描画
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x = centerX + 80 * Math.cos(angle);
        const y = centerY + 80 * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
}

// アニメーション機能
function startAnimation() {
    if (animationId) return;
    
    const canvas = document.getElementById('canvasDemo');
    const ctx = canvas.getContext('2d');
    
    function animate() {
        time += 0.02;
        
        // 背景をクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 回転する図形を描画
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time);
        
        // 回転する多角形
        ctx.fillStyle = `hsl(${time * 50 % 360}, 70%, 60%)`;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            const x = 70 * Math.cos(angle);
            const y = 70 * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// 行列演算デモの初期化
function initializeMatrixDemo() {
    const canvas = document.getElementById('matrixDemo');
    const ctx = canvas.getContext('2d');
    
    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 座標軸を描画
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    
    updateMatrixDemo(1);
}

function updateMatrixDemo(scale) {
    const canvas = document.getElementById('matrixDemo');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 座標軸を描画
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    
    // 元の図形（四角形）
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.fillRect(centerX - 25, centerY - 25, 50, 50);
    
    // スケール変換後の図形
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(
        centerX - 25 * scale,
        centerY - 25 * scale,
        50 * scale,
        50 * scale
    );
}

// インタラクティブデモの初期化
function initializeInteractiveDemo() {
    const canvas = document.getElementById('interactiveDemo');
    const ctx = canvas.getContext('2d');
    
    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // マウスイベントの設定
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        updateInteractiveDemo(mouseX, mouseY);
    });
    
    // 初期描画
    updateInteractiveDemo(canvas.width / 2, canvas.height / 2);
}

function updateInteractiveDemo(mouseX, mouseY) {
    const canvas = document.getElementById('interactiveDemo');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // マウスと中心の距離を計算
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 角度を計算
    const angle = Math.atan2(dy, dx);
    
    // 距離に応じたスケール
    const scale = Math.min(2, Math.max(0.5, distance / 100));
    
    // 回転する図形を描画
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    
    // 星を描画
    ctx.fillStyle = `hsl(${angle * 180 / Math.PI + 180}, 70%, 60%)`;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const starAngle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x = 40 * Math.cos(starAngle);
        const y = 40 * Math.sin(starAngle);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    
    // マウス位置を示す円
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
    ctx.fill();
}

// 波動アニメーションの初期化
function initializeWaveDemo() {
    const canvas = document.getElementById('waveDemo');
    const ctx = canvas.getContext('2d');
    
    function animateWave() {
        time += 0.05;
        
        // 背景をクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const waveCount = parseInt(document.getElementById('waveCountSlider').value);
        const centerY = canvas.height / 2;
        
        // 複数の波を重ね合わせ
        for (let wave = 0; wave < waveCount; wave++) {
            ctx.strokeStyle = `hsl(${240 + wave * 30}, 70%, 60%)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x++) {
                const normalizedX = (x / canvas.width) * Math.PI * 4;
                const amplitude = 30 + wave * 10;
                const frequency = 1 + wave * 0.5;
                const phase = time + wave * Math.PI / 3;
                
                const y = centerY + amplitude * Math.sin(frequency * normalizedX + phase);
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        requestAnimationFrame(animateWave);
    }
    
    animateWave();
} 