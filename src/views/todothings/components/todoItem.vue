<template>
  <div class="todocell">
    <slot name="todoItems" :itemThings="cellItemThings"></slot>
    <el-popover placement="right" width="800" trigger="click" v-model="visible">
      <el-table :data="cellItemThings" :row-class-name="tableRowClassName">
        <el-table-column
          width="150"
          property="date"
          label="日期"
        ></el-table-column>
        <el-table-column
          width="100"
          property="abstracts"
          label="概要"
        ></el-table-column>
        <el-table-column
          width="300"
          property="detail"
          label="明细"
        ></el-table-column>

        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              scope.row.status === 0 ? "已完成" : "待完成"
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    itemsDataGroupByDate: {
      type: Object,
      default: null
    },
    cellDate: {
      type: String,
      default: ""
    }
  },
  created() {
    this.initCellItemThings();
  },
  data() {
    return {
      visible: false,
      cellItemThings: null
    };
  },
  methods: {
    initCellItemThings() {
      if (this.itemsDataGroupByDate !== null) {
        this.cellItemThings = this.itemsDataGroupByDate[this.cellDate];
        if (
          this.cellItemThings !== null &&
          typeof this.cellItemThings !== "undefined"
        ) {
          this.visible = true;
        }
      }
    },
    tableRowClassName({ row }) {
      if (row.status === 0) {
        return "success-row";
      } else {
        return "warning-row";
      }
    }
  }
};
</script>
<style scoped>
.todocell {
  color: #1989fa;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
