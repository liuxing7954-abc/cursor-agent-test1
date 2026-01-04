// Markdown 转 HTML 工具函数
export function markdownToHtml(markdown) {
    if (!markdown) return '';
    
    let html = markdown;
    
    // 代码块（先处理代码块，避免被其他规则影响）
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 行内代码（在代码块之后处理）
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 列表
    const lines = html.split('\n');
    let inList = false;
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.match(/^[\-\*\+]\s/)) {
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            result.push(`<li>${line.replace(/^[\-\*\+]\s/, '')}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            if (line.trim() && !line.startsWith('<')) {
                result.push(`<p>${line}</p>`);
            } else if (line.trim()) {
                result.push(line);
            }
        }
    }
    
    if (inList) {
        result.push('</ul>');
    }
    
    html = result.join('\n');
    
    // 段落（处理剩余的非标签内容）
    html = html.split('\n\n').map(para => {
        if (!para.trim()) return '';
        if (para.startsWith('<')) return para;
        return `<p>${para}</p>`;
    }).join('\n');
    
    return html;
}

// HTML 转义
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
