<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        :icon="collapseListIcon"
        @click="collapseList"
      >
        {{ collapseListTitel }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t("table.add") }}
      </el-button>
    </div>
    <div class="grid-content bg-purple" style="width:100%;">
      <el-row>
        <el-col :span="calendarSpan">
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
        </el-col>
        <el-col
          :span="todoItemSpan"
          v-if="isCollapseList"
          class="el-calendar__header"
        >
          <todoItemTable
            :tableData="todoItemThings"
            @editForm="handleUpdate"
            @completeForm="completeUpdateData"
          ></todoItemTable>
        </el-col>
      </el-row>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker
            v-model="temp.date"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="摘要" prop="abstracts">
          <el-input v-model="temp.abstracts" />
        </el-form-item>

        <el-form-item label="明细">
          <el-input
            v-model="temp.detail"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>

        <el-form-item :label="$t('table.status')">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t("table.cancel") }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          {{ $t("table.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import todoItem from "./components/todoItem";
import todoItemTable from "./components/todoItemTable";
import todoCellCheck from "./components/todoCellCheck";
import { jsonArraysGroupByValue } from "@/utils/jsonUtils.js";
import { prevMonthFirstDate, nextMonthLastDate } from "@/utils/date";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  created() {
    this.initTodoThings();
  },
  filters: {
    //列表中的状态
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  components: { todoItem, todoItemTable, todoCellCheck },
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
      calendarValue: new Date(),
      todoItemThings: null,
      todoDataGroupByDate: null,
      //
      /**
       * temp 提交保存的form属性
       * dialogFormVisible 新增或编辑表单的dialog
       * textMap
       * calendarTypeOptions 日历组件
       * statusOptions 状态
       */
      temp: {
        id: undefined,
        date: new Date(),
        abstracts: "",
        detail: "",
        status: 0
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      calendarTypeOptions,
      statusOptions: [
        { key: 0, label: "已完成" },
        { key: 1, label: "待完成" },
        { key: 999, label: "其他" }
      ]
    };
  },

  watch: {
    calendarValue() {
      this.initTodoThings();
    }
  },
  methods: {
    completeUpdateData(rowData) {
      const tempData = Object.assign({}, rowData);
      this.todoUpdate(tempData);
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    todoUpdate(tempData) {
      this.$store
        .dispatch("todoThings/updateTodoThing", {
          todoThing: tempData
        })
        .then(response => {
          if (response.code === 200) {
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          }
        });
    },

    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          this.todoUpdate(tempData);
        }
      });
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        date: new Date(),
        abstracts: "",
        detail: "",
        status: 1
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("todoThings/createTodoThing", {
              todoThing: this.temp
            })
            .then(response => {
              if (response.code === 200) {
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success",
                  duration: 2000
                });
              }
            });
        }
      });
    },
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
