import Vue from "vue";
import Cookies from "js-cookie";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission"; // permission control
import "@/styles/index.scss"; // global css
import "./icons";
import i18n from "./locale";
import ElementLocale from "element-ui/lib/locale";

import {
  Form,
  FormItem,
  Input,
  Button,
  Tooltip,
  Dialog,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Scrollbar,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Message,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DatePicker,
  ColorPicker,
  Switch,
  Calendar,
  Row,
  Col,
  Tag,
  Popover,
  Select,
  Option,
  Notification
} from "element-ui";

Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Scrollbar);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(DatePicker);
Vue.use(ColorPicker);
Vue.use(Switch);
Vue.use(Calendar);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tag);
Vue.use(Popover);
Vue.use(Select);
Vue.use(Option);

Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = {
  size: Cookies.get("size") || "medium"
};

Vue.prototype.$notify = Notification;

Vue.config.productionTip = false;

ElementLocale.i18n((key, value) => i18n.t(key, value));

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
