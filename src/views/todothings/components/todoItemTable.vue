<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column label="日期" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="事项" width="300">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>摘要: {{ scope.row.abstracts }}</p>
          <p>明细: {{ scope.row.detail }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.abstracts }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{
          scope.row.status === 0 ? "已完成" : "待完成"
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleComplete(scope.$index, scope.row)"
          >完成任务</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(index, row) {
      this.$emit("editForm", row);
    },
    handleComplete(index, row) {
      row.status = 0;
      this.$emit("completeForm", row);
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

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
