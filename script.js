// 主JavaScript文件 - 处理用户交互和UI逻辑

document.addEventListener('DOMContentLoaded', function() {
    // DOM元素
    const distanceInput = document.getElementById('distance');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const paceMinInput = document.getElementById('pace-min');
    const paceSecInput = document.getElementById('pace-sec');
    
    const themeSelect = document.getElementById('theme-select');
    const spacingSelect = document.getElementById('spacing-select');
    const layoutSelect = document.getElementById('layout-select');
    const sizeSelect = document.getElementById('size-select');
    const showStatusCheckbox = document.getElementById('show-status');
    const showBottomTextCheckbox = document.getElementById('show-bottom-text');
    const bottomTextInput = document.getElementById('bottom-text-input');
    const randomTextButton = document.getElementById('random-text');
    
    const cardRadiusSlider = document.getElementById('card-radius');
    const cardBorderSlider = document.getElementById('card-border');
    const radiusValue = document.getElementById('radius-value');
    const borderValue = document.getElementById('border-value');
    
    const generateButton = document.getElementById('generate-btn');
    const previewButton = document.getElementById('preview-btn');
    const resetButton = document.getElementById('reset-btn');
    const calcPaceButton = document.getElementById('calc-pace');
    const calcTimeButton = document.getElementById('calc-time');
    const downloadButton = document.getElementById('download-btn');
    const copyButton = document.getElementById('copy-btn');
    
    const canvas = document.getElementById('preview-canvas');
    const canvasSizeElement = document.getElementById('canvas-size');
    const statusMessage = document.getElementById('status-message');
    const fileInfo = document.getElementById('file-info');
    
    const currentTheme = document.getElementById('current-theme');
    const currentSpacing = document.getElementById('current-spacing');
    const currentLayout = document.getElementById('current-layout');
    const currentSize = document.getElementById('current-size');
    const currentData = document.getElementById('current-data');
    
    // 底部文字选项
    const bottomTexts = [
        "每一公里都算数",
        "自律给我自由",
        "坚持就是胜利",
        "奔跑不停，梦想不止",
        "健康从跑步开始",
        "今日份跑步已完成",
        "跑出更好的自己",
        "跑步是心灵的洗礼",
        "一步一脚印，一跑一健康",
        "跑步让我更强大"
    ];
    
    // 当前配置
    let currentConfig = {
        distance: 5.0,
        hours: 0,
        minutes: 30,
        seconds: 0,
        paceMin: 6,
        paceSec: 0,
        theme: 'keep_green',
        spacing: 'normal',
        layout: 'time_top',
        canvasSize: 'iphone15',
        showStatus: true,
        showBottomText: true,
        bottomText: bottomTexts[Math.floor(Math.random() * bottomTexts.length)],
        cardRadius: 25,
        cardBorder: 3
    };
    
    // 画布尺寸映射
    const canvasSizes = {
        iphone15: { width: 1179, height: 2556, name: 'iPhone 15竖屏' },
        square: { width: 1000, height: 1000, name: '正方形' },
        wide: { width: 1600, height: 900, name: '宽屏' },
        portrait: { width: 800, height: 1200, name: '竖屏' },
        landscape: { width: 1200, height: 800, name: '横屏' }
    };
    
    // 主题名称映射
    const themeNames = {
        keep_green: 'Keep经典绿',
        blue_ocean: '蓝色海洋',
        sunset: '日落黄昏',
        dark: '深色模式',
        pink: '粉红主题',
        red: '热情红',
        yellow: '活力黄'
    };
    
    // 排版名称映射
    const spacingNames = {
        compact: '紧凑',
        normal: '适中',
        spacious: '宽松'
    };
    
    // 布局名称映射
    const layoutNames = {
        time_top: '时间在上',
        pace_top: '配速在上',
        vertical: '竖直紧凑',
        side_by_side: '并排显示'
    };
    
    // 初始化UI
    function initUI() {
        // 设置初始值
        distanceInput.value = currentConfig.distance;
        hoursInput.value = currentConfig.hours;
        minutesInput.value = currentConfig.minutes;
        secondsInput.value = currentConfig.seconds;
        paceMinInput.value = currentConfig.paceMin;
        paceSecInput.value = currentConfig.paceSec;
        
        themeSelect.value = currentConfig.theme;
        spacingSelect.value = currentConfig.spacing;
        layoutSelect.value = currentConfig.layout;
        sizeSelect.value = currentConfig.canvasSize;
        showStatusCheckbox.checked = currentConfig.showStatus;
        showBottomTextCheckbox.checked = currentConfig.showBottomText;
        bottomTextInput.value = currentConfig.bottomText;
        
        cardRadiusSlider.value = currentConfig.cardRadius;
        cardBorderSlider.value = currentConfig.cardBorder;
        radiusValue.textContent = currentConfig.cardRadius;
        borderValue.textContent = currentConfig.cardBorder;
        
        // 更新当前配置显示
        updateCurrentConfigDisplay();
        updateCanvasSizeDisplay();
    }
    
    // 更新当前配置显示
    function updateCurrentConfigDisplay() {
        currentTheme.textContent = themeNames[currentConfig.theme] || '自定义';
        currentSpacing.textContent = spacingNames[currentConfig.spacing] || '适中';
        currentLayout.textContent = layoutNames[currentConfig.layout] || '时间在上';
        currentSize.textContent = canvasSizes[currentConfig.canvasSize]?.name || '自定义';
        
        // 更新跑步数据显示
        const timeText = currentConfig.hours > 0 
            ? `${currentConfig.hours.toString().padStart(2, '0')}:${currentConfig.minutes.toString().padStart(2, '0')}:${currentConfig.seconds.toString().padStart(2, '0')}`
            : `${currentConfig.minutes.toString().padStart(2, '0')}:${currentConfig.seconds.toString().padStart(2, '0')}`;
            
        const paceText = `${currentConfig.paceMin}'${currentConfig.paceSec.toString().padStart(2, '0')}"`;
        currentData.textContent = `${currentConfig.distance}公里, ${timeText}, ${paceText}/公里`;
    }
    
    // 更新画布尺寸显示
    function updateCanvasSizeDisplay() {
        const size = canvasSizes[currentConfig.canvasSize];
        if (size) {
            canvasSizeElement.textContent = `${size.width}×${size.height}`;
        }
    }
    
    // 随机底部文字
    function getRandomBottomText() {
        const randomText = bottomTexts[Math.floor(Math.random() * bottomTexts.length)];
        bottomTextInput.value = randomText;
        currentConfig.bottomText = randomText;
        updateCurrentConfigDisplay();
    }
    
    // 计算配速（根据距离和时间）
    function calculatePaceFromDistanceTime() {
        const distance = parseFloat(distanceInput.value);
        const totalSeconds = parseInt(hoursInput.value) * 3600 + 
                            parseInt(minutesInput.value) * 60 + 
                            parseInt(secondsInput.value);
        
        if (distance <= 0) {
            showStatus('距离必须大于0', 'error');
            return;
        }
        
        if (totalSeconds <= 0) {
            showStatus('时间必须大于0', 'error');
            return;
        }
        
        const paceSecondsPerKm = totalSeconds / distance;
        const paceMin = Math.floor(paceSecondsPerKm / 60);
        const paceSec = Math.round(paceSecondsPerKm % 60);
        
        paceMinInput.value = paceMin;
        paceSecInput.value = paceSec;
        
        currentConfig.paceMin = paceMin;
        currentConfig.paceSec = paceSec;
        
        showStatus(`配速已计算: ${paceMin}分${paceSec.toString().padStart(2, '0')}秒/公里`, 'success');
        updateCurrentConfigDisplay();
    }
    
    // 计算时间（根据距离和配速）
    function calculateTimeFromDistancePace() {
        const distance = parseFloat(distanceInput.value);
        const paceSeconds = parseInt(paceMinInput.value) * 60 + parseInt(paceSecInput.value);
        
        if (distance <= 0) {
            showStatus('距离必须大于0', 'error');
            return;
        }
        
        if (paceSeconds <= 0) {
            showStatus('配速必须大于0', 'error');
            return;
        }
        
        const totalSeconds = distance * paceSeconds;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.round(totalSeconds % 60);
        
        hoursInput.value = hours;
        minutesInput.value = minutes;
        secondsInput.value = seconds;
        
        currentConfig.hours = hours;
        currentConfig.minutes = minutes;
        currentConfig.seconds = seconds;
        
        const timeText = hours > 0 
            ? `${hours}小时${minutes}分${seconds}秒`
            : `${minutes}分${seconds}秒`;
            
        showStatus(`时间已计算: ${timeText}`, 'success');
        updateCurrentConfigDisplay();
    }
    
    // 显示状态消息
    function showStatus(message, type = 'info') {
        statusMessage.textContent = message;
        
        // 根据类型设置颜色
        statusMessage.className = '';
        switch(type) {
            case 'success':
                statusMessage.style.color = '#00B074';
                break;
            case 'error':
                statusMessage.style.color = '#ff4757';
                break;
            case 'warning':
                statusMessage.style.color = '#ffa502';
                break;
            default:
                statusMessage.style.color = '#2f3542';
        }
        
        // 3秒后清除状态消息
        setTimeout(() => {
            if (statusMessage.textContent === message) {
                statusMessage.textContent = '就绪';
                statusMessage.style.color = '#00B074';
            }
        }, 3000);
    }
    
    // 更新配置
    function updateConfig() {
        currentConfig.distance = parseFloat(distanceInput.value);
        currentConfig.hours = parseInt(hoursInput.value);
        currentConfig.minutes = parseInt(minutesInput.value);
        currentConfig.seconds = parseInt(secondsInput.value);
        currentConfig.paceMin = parseInt(paceMinInput.value);
        currentConfig.paceSec = parseInt(paceSecInput.value);
        
        currentConfig.theme = themeSelect.value;
        currentConfig.spacing = spacingSelect.value;
        currentConfig.layout = layoutSelect.value;
        currentConfig.canvasSize = sizeSelect.value;
        currentConfig.showStatus = showStatusCheckbox.checked;
        currentConfig.showBottomText = showBottomTextCheckbox.checked;
        currentConfig.bottomText = bottomTextInput.value || bottomTexts[0];
        currentConfig.cardRadius = parseInt(cardRadiusSlider.value);
        currentConfig.cardBorder = parseInt(cardBorderSlider.value);
        
        updateCurrentConfigDisplay();
        updateCanvasSizeDisplay();
    }
    
    // 预览截图
    function previewScreenshot() {
        updateConfig();
        
        try {
            const size = canvasSizes[currentConfig.canvasSize];
            if (!size) {
                showStatus('无效的画布尺寸', 'error');
                return;
            }
            
            // 计算配速文本
            const paceText = `${currentConfig.paceMin}'${currentConfig.paceSec.toString().padStart(2, '0')}"`;
            const paceFullText = `${currentConfig.paceMin}分${currentConfig.paceSec.toString().padStart(2, '0')}秒/公里`;
            
            // 计算时间文本
            const timeDisplay = currentConfig.hours > 0 
                ? `${currentConfig.hours.toString().padStart(2, '0')}:${currentConfig.minutes.toString().padStart(2, '0')}:${currentConfig.seconds.toString().padStart(2, '0')}`
                : `${currentConfig.minutes.toString().padStart(2, '0')}:${currentConfig.seconds.toString().padStart(2, '0')}`;
                
            const timeFullText = currentConfig.hours > 0 
                ? `${currentConfig.hours}小时${currentConfig.minutes.toString().padStart(2, '0')}分${currentConfig.seconds.toString().padStart(2, '0')}秒`
                : `${currentConfig.minutes}分${currentConfig.seconds.toString().padStart(2, '0')}秒`;
            
            // 调用screenshot.js中的函数生成截图
            if (typeof generateScreenshot === 'function') {
                generateScreenshot(
                    canvas,
                    currentConfig,
                    size.width,
                    size.height,
                    paceText,
                    paceFullText,
                    timeDisplay,
                    timeFullText
                );
                
                showStatus('预览已生成', 'success');
                downloadButton.disabled = false;
                copyButton.disabled = false;
            } else {
                showStatus('截图生成功能未加载', 'error');
            }
        } catch (error) {
            console.error('生成预览时出错:', error);
            showStatus(`生成失败: ${error.message}`, 'error');
        }
    }
    
    // 下载截图
    function downloadScreenshot() {
        try {
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            const filename = `跑步_${currentConfig.distance}km_${currentConfig.theme}_${currentConfig.spacing}_${timestamp}.png`;
            
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            fileInfo.textContent = `已保存: ${filename}`;
            showStatus('截图下载成功', 'success');
        } catch (error) {
            console.error('下载截图时出错:', error);
            showStatus('下载失败', 'error');
        }
    }
    
    // 复制到剪贴板
    async function copyToClipboard() {
        try {
            canvas.toBlob(async (blob) => {
                const item = new ClipboardItem({ "image/png": blob });
                await navigator.clipboard.write([item]);
                showStatus('截图已复制到剪贴板', 'success');
            });
        } catch (error) {
            console.error('复制到剪贴板时出错:', error);
            showStatus('复制失败: 浏览器可能不支持此功能', 'error');
        }
    }
    
    // 重置为默认配置
    function resetToDefaults() {
        if (confirm('确定要重置所有设置为默认值吗？')) {
            currentConfig = {
                distance: 5.0,
                hours: 0,
                minutes: 30,
                seconds: 0,
                paceMin: 6,
                paceSec: 0,
                theme: 'keep_green',
                spacing: 'normal',
                layout: 'time_top',
                canvasSize: 'iphone15',
                showStatus: true,
                showBottomText: true,
                bottomText: bottomTexts[Math.floor(Math.random() * bottomTexts.length)],
                cardRadius: 25,
                cardBorder: 3
            };
            
            initUI();
            showStatus('已重置为默认配置', 'success');
        }
    }
    
    // 事件监听器
    distanceInput.addEventListener('input', updateConfig);
    hoursInput.addEventListener('input', updateConfig);
    minutesInput.addEventListener('input', updateConfig);
    secondsInput.addEventListener('input', updateConfig);
    paceMinInput.addEventListener('input', updateConfig);
    paceSecInput.addEventListener('input', updateConfig);
    
    themeSelect.addEventListener('change', updateConfig);
    spacingSelect.addEventListener('change', updateConfig);
    layoutSelect.addEventListener('change', updateConfig);
    sizeSelect.addEventListener('change', updateConfig);
    showStatusCheckbox.addEventListener('change', updateConfig);
    showBottomTextCheckbox.addEventListener('change', updateConfig);
    bottomTextInput.addEventListener('input', updateConfig);
    
    cardRadiusSlider.addEventListener('input', function() {
        radiusValue.textContent = this.value;
        updateConfig();
    });
    
    cardBorderSlider.addEventListener('input', function() {
        borderValue.textContent = this.value;
        updateConfig();
    });
    
    randomTextButton.addEventListener('click', getRandomBottomText);
    
    calcPaceButton.addEventListener('click', calculatePaceFromDistanceTime);
    calcTimeButton.addEventListener('click', calculateTimeFromDistancePace);
    
    previewButton.addEventListener('click', previewScreenshot);
    generateButton.addEventListener('click', function() {
        previewScreenshot();
        setTimeout(downloadScreenshot, 500);
    });
    
    downloadButton.addEventListener('click', downloadScreenshot);
    copyButton.addEventListener('click', copyToClipboard);
    resetButton.addEventListener('click', resetToDefaults);
    
    // 初始化
    initUI();
    getRandomBottomText();
});