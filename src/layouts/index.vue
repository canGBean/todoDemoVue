<template>
  <div :class="classObj"
       class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }"
         class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="true">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RightPanel from "@/components/RightPanel";
import Settings from "./components/Settings";

import AppMain from "./components/AppMain";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import TagsView from "./components/TagsView";
// import ResizeMixin from "./mixin/ResizeHandler";
import Cookies from "js-cookie";

//加载皮肤用
const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#409EFF"; // default color

export default {
  name: "Layout",
  components: { AppMain, Navbar, Sidebar, TagsView, RightPanel, Settings },
  // mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  mounted () {
    //取cooike中的换肤
    this.handleUserTheme();
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    //换皮肤 防止F5后皮肤丢失
    async handleUserTheme () {
      let val = Cookies.get("theme");
      const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
      if (typeof val !== "string") return;
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
      console.log(themeCluster, originalCluster);
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );

          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        await this.getCSSString(url, "chalk");
      }

      const chalkHandler = getHandler("chalk", "chalk-style");

      chalkHandler();

      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter(style => {
          const text = style.innerText;
          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });

    },

    getThemeCluster (theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },

    updateStyle (style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },

    getCSSString (url, variable) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
            resolve();
          }
        };
        xhr.open("GET", url);
        xhr.send();
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
// @import "~@/styles/sidebar.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
