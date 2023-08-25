// 定义一个函数，用于导出rpgsave文件
function exportSave() {
    // 获取页面中的下拉列表元素
    var select = document.getElementById("select");

    // 获取用户选择的所有选项
    var options = select.selectedOptions;

    // 如果没有选择任何选项，说明没有要导出的文件
    if (options.length == 0) {
        // 弹出提示框，告诉用户没有要导出的文件
        alert("没有要导出的文件");
        return;
    }

    // 创建一个空对象
    var saveData = {};

    // 遍历用户选择的所有选项
    for (var i = 0; i < options.length; i++) {
        // 获取选项的文本，也就是键名
        var key = options[i].text;

        // 获取localStorage中对应的值
        var value = localStorage.getItem(key);

        // 将键和对应的值添加到对象中
        saveData[key] = value;
    }

    // 将对象转换为JSON字符串
    var saveJSON = JSON.stringify(saveData);

    // 创建一个blob对象，用于存储JSON字符串
    var blob = new Blob([saveJSON], { type: "text/plain;charset=utf-8" });

    // 创建一个a标签，用于下载blob对象
    var a = document.createElement("a");

    // 设置a标签的属性，指定下载文件名为save.rpgsave
    a.download = "save.rpgsave";

    // 设置a标签的href属性，指定下载内容为blob对象
    a.href = URL.createObjectURL(blob);

    // 触发a标签的点击事件，开始下载
    a.click();
}

// 定义一个函数，用于初始化下拉列表
function initSelect() {
    // 获取页面中的下拉列表元素
    var select = document.getElementById("select");

    // 清空下拉列表中的所有选项
    select.innerHTML = "";

    // 遍历localStorage中的所有键
    for (var key in localStorage) {
        // 如果键以RPG File开头，说明是rpgmacker游戏存档
        if (key.startsWith("RPG File")) {
            // 创建一个option元素，用于显示键名
            var option = document.createElement("option");

            // 设置option元素的文本为键名
            option.text = key;

            // 将option元素添加到下拉列表中
            select.add(option);
        }
    }
}