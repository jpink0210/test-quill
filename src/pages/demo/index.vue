<template>
  <div class="layout">
    這邊是我要塞 toolbar 的地方，官方元件預設 id: toolbar
    <div id="toolbar"></div>

    this is demo Default.
    <button class="btn" @click="insertText">從第0行插入一段文字</button>
    <button class="btn" @click="getContents">拿取畫面中所有的資訊</button>
    <button class="btn" @click="addHTML">加上圖片</button>
    官方元件預設 id: editor 
    <div id="editor" class="text-editor"></div>
  </div>
</template>

<script>
const toolbarOptions = [
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [
    {
      color: [
        "#ffffff",
        "#dddddd",
        "#a9a9a9",
        "#7e7e7e",
        "#292929",
        "#ea475b",
        "#ff7800",
        "#ffc31b",
        "#6fb827",
        "#00afb8"
      ]
    },
    {
      background: [
        "#ffffff",
        "#ebeced",
        "#e9e5e3",
        "#faebdd",
        "#fbf3db",
        "#fbe3e4",
        "#f4dfeb",
        "#eae4f2",
        "#deebf1",
        "#deedea"
      ]
    }
  ],
  ["blockquote", "code"],
  [{ list: "ordered" }, { list: "bullet" }, { align: ["", "center"] }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["link", "clean"],
  ["divider"],
  ["image"]
];

import Quill from "quill";
import ImageUploader from "quill-image-uploader";

export default {
  name: "Demo",
  data() {
    return {
      quill: null
    }
  },
  created() {
    let BlockEmbed = Quill.import("blots/block/embed");

    class DividerBlot extends BlockEmbed {
      static create() {
        let node = super.create();
        node.setAttribute("class", "ql-divider");
        return node;
      }
    }
    DividerBlot.blotName = "divider";
    DividerBlot.tagName = "hr";
    Quill.register(DividerBlot);
    Quill.register("modules/imageUploader", ImageUploader);

  },
  mounted() {

    const editor = this.$el.querySelector(".text-editor");
    this.quill = new Quill(editor, {
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            divider: this.dividerHandler
          }
        },
        imageUploader: {
          upload: (file) => {
            console.log(file)
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
                );
              }, 3500);
            });
          },
        },
      },
      theme: "snow",
      placeholder: 'Compose an epic...',
    });
    window.quill = this.quill;
  
    /*
    getModule 是拿到 dom 的神器
    dom 往父層傳上去，可以再任意的地方 appendChild
    const toolbar = this.quill.getModule("toolbar").container;
    ↓↓↓
    appendTextToolbar(toolbar) {
      this.$refs.textToolbarList.appendChild(toolbar);
      // this.$refs.textToolbarList.style.height = `${toolbar.offsetHeight}px`;
    },
    
    */
  },
  methods: {
    insertText() {
      this.quill.insertText(0, "這是測試文字\n", {
        'color': '#977C00',
        'italic': true
      });
    },
    getContents() {
      var delta = this.quill.getContents();
      console.log(delta)
      console.log(this.quill.root)
      console.log(this.quill.root.innerHTML)
    },
    addHTML() {
      const html = `
        <div>
          <img src="https://picsum.photos/200" alt="123">
          <img src="https://picsum.photos/200" width="100" alt="123">
          <img src="https://picsum.photos/200" alt="123">
        </div>
        <div>
          <img src="https://picsum.photos/200" width="100" alt="123">
        </div>
      `
      this.quill.clipboard.dangerouslyPasteHTML(0, html, "api")
      
    },
    dividerHandler() {
      let range = this.quill.getSelection(true);
      this.quill.insertText(range.index, "\n", Quill.sources.USER);
      this.quill.insertEmbed(
        range.index + 1,
        "divider",
        true,
        Quill.sources.USER
      );
      this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
    }
  }
}
</script>

<style lang="scss">
@import "~node_modules/quill/dist/quill.snow.css";
@import "~scss/variables";

.layout {
  max-width: 800px;
}
.btn {
  margin-right: 8px;
}
.ql-snow {
  &.ql-toolbar {
    // border: 0;
    .ql-picker-label {
      border: 0;
    }
    .ql-picker-options {
      width: 112px;
      top: 34px;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
      padding: 8px;
    }
    button:hover,
    .ql-active {
      color: $blue;
      &::before {
        background: rgba($color: $blue, $alpha: .3);
        border-radius: 4px;
      }
    }
    .ql-background,
    .ql-color {
      .ql-picker-item {
        border: 1px solid #dddddd;
        height: 15px;
        width: 15px;
      }
    }
    .ql-size {
      .ql-picker-options {
        padding: 4px 12px;
      }
      .ql-picker-item {
        font-weight: normal;
        height: 48px;
        line-height: 48px;
        font-size: $font-medium;
        padding: 0;
        &[data-value="small"] {
          &::before {
            font-size: $font-smaller;
          }
        }
        &[data-value="large"] {
          &::before {
            font-size: $font-large;
          }
        }
        &[data-value="huge"] {
          &::before {
            font-size: $font-x-large;
          }
        }
      }
    }
    button.ql-divider {
      &::before {
        content: "...";
        // background-color: $black;
        display: inline-block;
        height: 20px;
        width: 20px;
      }
    }
  }

  &.ql-container {
    hr.ql-divider {
      border: none;
      text-align: center;
      letter-spacing: 12px;
      font-size: $font-larger;
      font-weight: $font-weight-bold;
      margin: 8px 0 48px 0;
      &::before {
        content: "...";
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~scss/variables";

.text-editor {
  &__container {
    font-family: $font-family-base;
    border: dashed 1px transparent;
  }

  &--edit {
    &:hover {
      .text-editor__container {
        border-radius: 4px;
        border-color: $primary;
      }

      .edit-tool-bar {
        opacity: 1;
      }
    }

    .ql-container {
      padding: 16px;
    }
  }

  /deep/ {
    .ql-toolbar {
      display: none;
    }

    &,
    .ql-container {
      .ql-editor {
        padding: 0;
        caret-color: $primary;
        line-height: $font-xx-large;
        font-size: $font-medium;

        a {
          &:hover {
            color: $blue-light;
          }
        }

        $indent: 12px;
        ol,
        ul {
          padding: $indent 0 $indent $indent;
        }

        $max: 9;
        @for $i from 1 through $max {
          .ql-indent-#{$i} {
            padding-left: 24px + $indent * $i;
          }
        }

        .ql-size-small {
          line-height: $font-larger;
          font-size: $font-smaller;
        }
        .ql-size-large {
          font-size: $font-large;
        }
        .ql-size-huge {
          line-height: $font-xx-large;
          font-size: $font-x-large;
        }
      }

      .ql-blank {
        &::before {
          color: $gray-600;
          font-weight: bold;
          font-style: normal;
          left: 20px;
          right: 20px;
        }
      }
    }

    .ql-tooltip {
      min-width: 162px;
      padding: 16px;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
      z-index: 1;

      &::before {
        content: attr(data-content);
        margin-right: 0;
      }

      &::before,
      .ql-preview,
      .ql-action::after,
      .ql-remove::before {
        font-size: $font-smaller;
        margin-left: 0;
      }

      .ql-action,
      .ql-remove {
        line-height: $font-larger;
        color: $blue;
      }

      .ql-action {
        display: block;
        margin-top: 8px;

        &::after {
          content: attr(data-edit);
        }
      }

      .ql-remove {
        position: absolute;
        left: 90px;
        bottom: 16px;

        &::before {
          content: attr(data-remove);
        }
      }
    }

    .ql-tooltip[data-mode="link"] {
      height: 108px;

      &::before {
        content: attr(data-label);
        line-height: 44px;
        margin-right: 16px;
      }

      input[data-link] {
        width: 296px;
        height: 44px;
        padding: 8px 12px;
        border-radius: 4px;
        border: solid 1px $gray-400;
        background-color: $gray-300;
        font-size: $font-small;
        font-weight: $font-weight-bold;

        &::placeholder {
          color: $gray-600;
        }
      }

      .ql-action {
        position: absolute;
        left: 74px;
        bottom: 16px;

        &::after {
          content: attr(data-save);
        }
      }

      .ql-remove {
        display: inline-block;
        position: absolute;
        left: 112px;
        bottom: 16px;

        &::before {
          content: attr(data-cancel);
          border-left: 1px solid $gray-400;
          padding-left: 8px;
        }
      }
    }

  }

  .edit-tool-bar {
    opacity: 0;
    top: -32px;
    right: 16px;
  }
}
</style>
