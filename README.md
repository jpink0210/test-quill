# bfm-quill

### 安裝步驟

yarn add quill quill-image-uploader  -S

給snow.css用
.set("node_modules", path.resolve(__dirname, "./node_modules"))

@import "~node_modules/quill/dist/quill.snow.css";

用於監聽，可執行雙向綁定。
quill.on("text-change")

否則，也可以用 vue-quill-editor

是監看視窗的操作，譬如 focus/blur
quill.on("selection-change")

### yarn add 
quill-image-uploader
https://github.com/noeloconnell/quill-image-uploader#readme
