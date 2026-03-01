/**
 * 视差效果与交互动画
 * 包含：视差初始化、眨眼效果、快速晃动检测
 */

// 获取视差场景容器元素
var scene = document.getElementById('scene');

// 初始化Parallax视差效果
var parallax = new Parallax(scene, {
    relativeInput: true,
    hoverOnly: false,
    scalarX: 10,
    scalarY: 10
});

// 获取眨眼遮罩容器
var eyeCovers = document.querySelector('.eye-covers');
var isBlinking = false;
var isHeadShaking = false;

// ========== 眨眼效果 ==========
function blink() {
    if (isBlinking || isHeadShaking) return;

    isBlinking = true;

    // 为遮罩容器添加眨眼动画类
    eyeCovers.classList.add('blinking');

    // 动画结束后移除类
    setTimeout(function() {
        eyeCovers.classList.remove('blinking');
        isBlinking = false;
    }, 200);
}

// 点击屏幕触发眨眼
document.addEventListener('click', function(e) {
    // 防止与触摸事件冲突
    if (e.pointerType === 'touch') return;
    blink();
});

// 触摸屏幕触发眨眼（移动端）
document.addEventListener('touchstart', function(e) {
    blink();
}, { passive: true });

// ========== 快速晃动检测与摇头效果 ==========
var mousePositions = [];
var shakeCheckInterval = 100; // 检测间隔（毫秒）
var shakeTimeWindow = 500; // 检测时间窗口（毫秒）
var shakeThreshold = 8; // 晃动次数阈值

function checkMouseShake() {
    var now = Date.now();

    // 清理过期的位置记录
    mousePositions = mousePositions.filter(function(pos) {
        return now - pos.time < shakeTimeWindow;
    });

    // 检测晃动次数
    if (mousePositions.length >= shakeThreshold && !isHeadShaking) {
        triggerHeadShake();
        mousePositions = []; // 清空记录
    }
}

function triggerHeadShake() {
    if (isHeadShaking) return;

    isHeadShaking = true;

    // 直接添加摇头动画
    scene.classList.add('head-shaking');

    // 动画结束后恢复
    setTimeout(function() {
        scene.classList.remove('head-shaking');
        isHeadShaking = false;
    }, 2000); // 与CSS动画时间对应
}

// 监听鼠标移动
var lastMouseX = 0;
var lastMouseY = 0;
var moveThreshold = 30; // 移动距离阈值

document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    var dx = e.clientX - lastMouseX;
    var dy = e.clientY - lastMouseY;
    var distance = Math.sqrt(dx * dx + dy * dy);

    // 只有当移动距离超过阈值时才记录
    if (distance > moveThreshold) {
        mousePositions.push({
            x: e.clientX,
            y: e.clientY,
            time: now
        });

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        checkMouseShake();
    }
});

// 触摸移动检测（移动端）
var lastTouchX = 0;
var lastTouchY = 0;

document.addEventListener('touchmove', function(e) {
    if (e.touches.length === 0) return;

    var touch = e.touches[0];
    var now = Date.now();
    var dx = touch.clientX - lastTouchX;
    var dy = touch.clientY - lastTouchY;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > moveThreshold) {
        mousePositions.push({
            x: touch.clientX,
            y: touch.clientY,
            time: now
        });

        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;

        checkMouseShake();
    }
}, { passive: true });

// 定期清理旧数据
setInterval(function() {
    var now = Date.now();
    mousePositions = mousePositions.filter(function(pos) {
        return now - pos.time < shakeTimeWindow;
    });
}, shakeTimeWindow);

// ========== 自动眨眼（随机） ==========
function autoBlink() {
    if (!isBlinking && !isHeadShaking && Math.random() > 0.7) {
        blink();
    }
    // 随机间隔 3-8 秒
    setTimeout(autoBlink, Math.random() * 5000 + 3000);
}

// 启动自动眨眼
setTimeout(autoBlink, 3000);