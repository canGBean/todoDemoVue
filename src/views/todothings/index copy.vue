<template>
  <el-row>
    <el-row>
      <el-button type="primary" :icon="collapseListIcon" @click="collapseList">
        {{ collapseListTitel }}
      </el-button>
    </el-row>
    <el-row>
      <el-col :span="calendarSpan">
        <div class="grid-content bg-purple">
          <el-calendar v-model="calendarValue">
            <template v-slot:dateCell="{ date, data }">
              <todoItem
                v-if="data.isSelected"
                :itemsDataGroupByDate="todoDataGroupByDate"
                :cellDate="data.day"
              >
              </todoItem>
              <!-- 初始化标记是否有事情要办 -->
              <todoCellCheck
                :itemsDataGroupByDate="todoDataGroupByDate"
                :cellDate="data.day"
              ></todoCellCheck>
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{
                  data.day
                    .split("-")
                    .slice(1)
                    .join("-")
                }}
              </p>
            </template>
          </el-calendar>
        </div>
      </el-col>
      <el-col :span="todoItemSpan" v-if="isCollapseList">
        <todoItemTable :tableData="todoItemThings"></todoItemTable>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import todoItem from "./components/todoItem";
import todoItemTable from "./components/todoItemTable";
import todoCellCheck from "./components/todoCellCheck";
import { jsonArraysGroupByValue } from "@/utils/jsonUtils.js";
import { prevMonthFirstDate, nextMonthLastDate } from "@/utils/date";

export default {
  created() {
    this.initTodoThings();
  },

  data() {
    return {
      /**
       * calendarSpan 日历宽度
       * todoItemSpan 右侧列表宽度
       * isCollapseList 右侧折叠
       * cellDate 选中单元格的日期
       * cellData 选中单元格的数据
       * cellItemThings 选中单元格弹出层的待办事项
       * todoItemThings 当前月及前后各一月的事项
       * calendarValue 日历当前月
       * ---------------
       * todoDataGroupByDate 按日期分组的待办事项
       * ---------------
       *
       */
      calendarSpan: 12,
      todoItemSpan: 12,
      isCollapseList: true,
      cellDate: null,
      cellData: null,
      collapseListTitel: "收起列表",
      collapseListIcon: "el-icon-arrow-left",
      cellItemThings: null,
      // calendarData: null,
      calendarValue: new Date(),
      todoItemThings: null,
      todoDataGroupByDate: null,
      contextmenuVisible: false,
      top: 0,
      left: 0,
      editFormVisible: false
    };
  },
  components: { todoItem, todoItemTable, todoCellCheck },
  watch: {
    calendarValue() {
      this.initTodoThings();
    }
  },
  methods: {
    //查询选中日期及前后各一个月的todo
    initTodoThings() {
      const beginDate = prevMonthFirstDate(this.calendarValue);
      const endDate = nextMonthLastDate(this.calendarValue);
      this.$store
        .dispatch("todoThings/getTodoThingsByDate", {
          beginDate: beginDate,
          endDate: endDate
        })
        .then(response => {
          if (response.code === 200) {
            this.todoItemThings = response.data;
            this.todoDataGroupByDate = jsonArraysGroupByValue(
              this.todoItemThings,
              "date"
            );
          }
        });
    },
    collapseList() {
      if (this.isCollapseList) {
        this.calendarSpan = 24;
        this.todoItemSpan = 0;
      } else {
        this.calendarSpan = 12;
        this.todoItemSpan = 12;
        this.cellDate = null;
        this.cellData = null;
      }
      this.isCollapseList = !this.isCollapseList;
      this.collapseListTitel = !this.isCollapseList ? "展开列表" : "收起列表";
      this.collapseListIcon = !this.isCollapseList
        ? "el-icon-arrow-right el-icon--right"
        : "el-icon-arrow-left";
    }
  }
};
</script>

<style lang="scss" scoped>
.is-selected {
  color: #1989fa;
}
</style>
