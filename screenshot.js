// 截图生成核心逻辑 - 使用Canvas绘制跑步截图

function generateScreenshot(canvas, config, width, height, paceText, paceFullText, timeDisplay, timeFullText) {
    // 设置画布尺寸
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    
    // 根据主题获取颜色
    const colors = getThemeColors(config.theme);
    
    // 根据排版获取字体大小
    const fontSizes = getFontSizes(config.spacing);
    
    // 清除画布
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制状态栏
    if (config.showStatus) {
        drawStatusBar(ctx, width, colors);
    }
    
    // 绘制标题区域
    drawTitleSection(ctx, width, height, colors, fontSizes, config.showStatus);
    
    // 绘制距离区域
    drawDistanceSection(ctx, width, height, colors, fontSizes, config.distance, config.showStatus);
    
    // 绘制卡片区域
    drawCardsSection(ctx, width, height, colors, fontSizes, config, 
                    timeDisplay, timeFullText, paceText, paceFullText);
    
    // 绘制底部文字
    if (config.showBottomText && config.bottomText) {
        drawBottomText(ctx, width, height, colors, fontSizes, config.bottomText);
    }
}

// 获取主题颜色
function getThemeColors(theme) {
    const themes = {
        keep_green: {
            primary: '#00B074',
            background: '#F5F5F5',
            card: '#FFFFFF',
            textDark: '#333333',
            textLight: '#666666'
        },
        blue_ocean: {
            primary: '#4285F4',
            background: '#F0F8FF',
            card: '#FFFFFF',
            textDark: '#333333',
            textLight: '#666699'
        },
        sunset: {
            primary: '#FF5722',
            background: '#FFF3E0',
            card: '#FFFFFF',
            textDark: '#3C2D23',
            textLight: '#8C6450'
        },
        dark: {
            primary: '#00C896',
            background: '#141419',
            card: '#28282D',
            textDark: '#E6E6E6',
            textLight: '#B4B4B4'
        },
        pink: {
            primary: '#FF69B4',
            background: '#FFF0F5',
            card: '#FFFFFF',
            textDark: '#503246',
            textLight: '#966482'
        },
        red: {
            primary: '#DC143C',
            background: '#FFF5F5',
            card: '#FFFFFF',
            textDark: '#3C1E1E',
            textLight: '#8C5050'
        },
        yellow: {
            primary: '#FFC107',
            background: '#FFFDE7',
            card: '#FFFFFF',
            textDark: '#463C23',
            textLight: '#8C7A50'
        }
    };
    
    return themes[theme] || themes.keep_green;
}

// 获取字体大小
function getFontSizes(spacing) {
    const sizes = {
        compact: {
            title: 65,
            large: 120,
            medium: 50,
            small: 35,
            titleTop: 60,
            distanceTop: 150,
            cardHeight: 180,
            cardSpacing: 20
        },
        normal: {
            title: 75,
            large: 150,
            medium: 60,
            small: 45,
            titleTop: 80,
            distanceTop: 220,
            cardHeight: 220,
            cardSpacing: 40
        },
        spacious: {
            title: 85,
            large: 170,
            medium: 70,
            small: 55,
            titleTop: 100,
            distanceTop: 280,
            cardHeight: 250,
            cardSpacing: 60
        }
    };
    
    return sizes[spacing] || sizes.normal;
}

// 绘制状态栏
function drawStatusBar(ctx, width, colors) {
    const statusHeight = 100;
    
    // 状态栏背景
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, statusHeight);
    
    // 当前时间
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold 40px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timeStr, width / 2, statusHeight / 2);
    
    return statusHeight;
}

// 绘制标题区域
function drawTitleSection(ctx, width, height, colors, fontSizes, hasStatusBar) {
    const statusHeight = hasStatusBar ? 100 : 0;
    const titleY = statusHeight + fontSizes.titleTop;
    
    // 主标题
    ctx.fillStyle = colors.primary;
    ctx.font = `bold ${fontSizes.title}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('跑步记录', width / 2, titleY);
    
    // 日期时间
    const now = new Date();
    const dateStr = now.getFullYear() + '年' + 
                   (now.getMonth() + 1).toString().padStart(2, '0') + '月' + 
                   now.getDate().toString().padStart(2, '0') + '日 ' + 
                   now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    
    ctx.fillStyle = colors.textLight;
    ctx.font = `${fontSizes.small}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.fillText(dateStr, width / 2, titleY + fontSizes.title + 30);
    
    return titleY + fontSizes.title + 80;
}

// 绘制距离区域
function drawDistanceSection(ctx, width, height, colors, fontSizes, distance, hasStatusBar) {
    const statusHeight = hasStatusBar ? 100 : 0;
    const titleY = statusHeight + fontSizes.titleTop;
    const distanceY = titleY + fontSizes.distanceTop;
    
    // 距离数字
    const distanceText = distance.toFixed(2);
    ctx.fillStyle = colors.primary;
    ctx.font = `bold ${fontSizes.large}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(distanceText, width / 2, distanceY);
    
    // 单位
    ctx.fillStyle = colors.textLight;
    ctx.font = `bold ${fontSizes.title}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.fillText('公里', width / 2, distanceY + fontSizes.large / 2 + 50);
    
    return distanceY + fontSizes.large / 2 + 100;
}

// 绘制卡片区域
function drawCardsSection(ctx, width, height, colors, fontSizes, config, 
                         timeDisplay, timeFullText, paceText, paceFullText) {
    const statusHeight = config.showStatus ? 100 : 0;
    const titleY = statusHeight + fontSizes.titleTop;
    const distanceY = titleY + fontSizes.distanceTop;
    const cardsStartY = distanceY + fontSizes.large / 2 + 150;
    
    if (config.layout === 'side_by_side') {
        // 并排布局
        const cardWidth = (width - 200) / 2;
        const leftX = (width - (cardWidth * 2 + 50)) / 2;
        const rightX = leftX + cardWidth + 50;
        
        drawCard(ctx, leftX, cardsStartY, cardWidth, fontSizes.cardHeight, 
                colors, fontSizes, config.cardRadius, config.cardBorder,
                '跑步时间', timeDisplay, timeFullText);
        
        drawCard(ctx, rightX, cardsStartY, cardWidth, fontSizes.cardHeight, 
                colors, fontSizes, config.cardRadius, config.cardBorder,
                '平均配速', paceText, paceFullText);
    } else if (config.layout === 'pace_top') {
        // 配速在上
        const cardWidth = width - 150;
        const cardX = (width - cardWidth) / 2;
        
        // 第一张卡片：配速
        drawCard(ctx, cardX, cardsStartY, cardWidth, fontSizes.cardHeight, 
                colors, fontSizes, config.cardRadius, config.cardBorder,
                '平均配速', paceText, paceFullText);
        
        // 第二张卡片：时间
        const secondCardY = cardsStartY + fontSizes.cardHeight + fontSizes.cardSpacing;
        drawCard(ctx, cardX, secondCardY, cardWidth, fontSizes.cardHeight, 
                colors, fontSizes, config.cardRadius, config.cardBorder,
                '跑步时间', timeDisplay, timeFullText);
    } else {
        // 默认：时间在上
        const cardWidth = width - 150;
        const cardX = (width - cardWidth) / 2;
        
        // 第一张卡片：时间
        drawCard(ctx, cardX, cardsStartY, cardWidth, fontSizes.cardHeight, 
                colors, fontSizes, config.cardRadius, config.cardBorder,
                '跑步时间', timeDisplay, timeFullText);
        
        // 第二张卡片：配速
        const secondCardY = cardsStartY + fontSizes.cardHeight + fontSizes.cardSpacing;
        drawCard(ctx, cardX, secondCardY, cardWidth, fontSizes.cardHeight, 
                colors, fontSizes, config.cardRadius, config.cardBorder,
                '平均配速', paceText, paceFullText);
    }
}

// 绘制单个卡片
function drawCard(ctx, x, y, width, height, colors, fontSizes, radius, border, 
                 title, data, detail) {
    // 卡片背景
    ctx.fillStyle = colors.card;
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = border;
    
    // 绘制圆角矩形
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.fill();
    ctx.stroke();
    
    // 卡片标题
    ctx.fillStyle = colors.textLight;
    ctx.font = `${fontSizes.small}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(title, x + 50, y + 30);
    
    // 主数据
    ctx.fillStyle = colors.textDark;
    ctx.font = `bold ${fontSizes.medium}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(data, x + width / 2, y + height / 2 - 20);
    
    // 详细数据
    ctx.fillStyle = colors.textLight;
    ctx.font = `${fontSizes.small - 10}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.fillText(detail, x + width / 2, y + height / 2 + 30);
}

// 绘制圆角矩形
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// 绘制底部文字
function drawBottomText(ctx, width, height, colors, fontSizes, text) {
    ctx.fillStyle = colors.textLight;
    ctx.font = `${fontSizes.small}px 'Segoe UI', 'Microsoft YaHei', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, width / 2, height - 80);
}