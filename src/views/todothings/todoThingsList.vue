<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="lable-title">种子播种量计算器</div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24"><div class="line"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="explain">
          1 - 从下拉菜单中选择一种类 2 - 播种密度（万株/公顷） =
          保苗密度（万株/公顷） + 保苗密度（万株/公顷） * (1 - 种子芽率 * 0.01)
          3 - 播种量（公斤） = 播种密度（万株/公顷）* 百粒重（克）/10
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-form ref="form" :model="formData" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="种类">
              <el-select
                v-model="formData.categoryid"
                @change="compute"
                placeholder="请选择农作物种类"
              >
                <el-option
                  v-for="item in options"
                  :key="item.categoryid"
                  :label="item.categoryname"
                  :value="item.categoryid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click="resetForm" type="warning" plain
                >数据重置</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="保苗密度">
              <el-input
                v-model="formData.keepDensity"
                class="input-with"
                @change="compute"
                type="number"
              >
                <template slot="append">万株/公顷</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="种子牙率">
              <el-input
                v-model="formData.sproutRate"
                class="input-with"
                @change="compute"
                type="number"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="播种密度">
              <el-input
                v-model="formData.seedingDensity"
                class="input-with"
                @change="compute"
              >
                <template slot="append">万株/公顷</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="百粒重">
              <el-input
                v-model="formData.seedweight"
                class="input-with"
                @change="compute"
                type="number"
              >
                <template slot="append">克</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="播种量">
              <el-input
                v-model="formData.seedingQuantity"
                :disabled="true"
                class="input-with"
                @change="compute"
              >
                <template slot="append">公斤</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="株距">
              <el-input
                v-model="formData.spacing"
                :disabled="true"
                class="input-with"
                @change="compute"
              >
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="垄距">
              <el-input
                v-model="formData.distance"
                class="input-with"
                @change="compute"
              >
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="米间粒数">
              <el-input
                v-model="formData.ridgingSpacing"
                :disabled="true"
                class="input-with"
                @change="compute"
              >
                <template slot="append">颗</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        categoryid: "corn",
        keepDensity: "",
        sproutRate: "",
        seedingDensity: "",
        seedweight: "",
        seedingQuantity: "",
        ridgingSpacing: "",
        spacing: "",
        distance: "65"
      },
      options: [
        {
          categoryid: "corn",
          categoryname: "玉米"
        },
        {
          categoryid: "rice",
          categoryname: "水稻"
        }
      ]
    };
  },
  methods: {
    //重置
    resetForm() {
      //this.$refs.AreaForm.resetFields();
      this.formData = {
        category: "corn",
        keepDensity: "",
        sproutRate: "",
        seedingDensity: "",
        seedweight: "",
        seedingQuantity: "",
        ridgingSpacing: "",
        spacing: "",
        distance: "65"
      };
    },
    compute() {
      let keepDensity = this.formData.keepDensity;
      let sproutRate = this.formData.sproutRate;
      let seedweight = this.formData.seedweight;
      let seedingDensity = this.formData.seedingDensity;
      if (keepDensity != "" && sproutRate != "" && seedweight == "") {
        this.computeDensity();
      } else if (seedingDensity != "" && seedweight != "") {
        this.computeQuantityNew();
      } else if (
        seedingDensity != "" &&
        sproutRate != "" &&
        keepDensity == ""
      ) {
        this.computeKeepDensity();
      } else {
        this.clear();
      }
    },
    clear() {
      this.formData.seedingQuantity = "";
      this.formData.ridgingSpacing = "";
      this.formData.spacing = "";
    },
    computeDensity() {
      var params = Object.assign(this.formData, this.page);
      this.$store
        .dispatch("tools/SeedingQuantity/getSeedingDensity", params)
        .then(res => {
          console.log(res);
          this.formData = res.data.result;
        });
    },
    computeQuantity() {
      var params = Object.assign(this.formData, this.page);
      this.$store
        .dispatch("tools/SeedingQuantity/getSeedingQuantity", params)
        .then(res => {
          console.log(res);
          this.formData = res.data.result;
        });
    },
    computeQuantityNew() {
      var params = Object.assign(this.formData, this.page);
      this.$store
        .dispatch("tools/SeedingQuantity/getSeedingQuantityNew", params)
        .then(res => {
          console.log(res);
          this.formData = res.data.result;
        });
    },
    computeKeepDensity() {
      var params = Object.assign(this.formData, this.page);
      this.$store
        .dispatch("tools/SeedingQuantity/getKeepDensity", params)
        .then(res => {
          console.log(res);
          this.formData = res.data.result;
        });
    }
  }
};
</script>
<style>
.lable-title {
  color: #000000;
  font-size: 20px;
}
.line {
  width: 100%;
  height: 2px;
  border-top: solid #7ed2df 2px;
}

.explain {
  color: #909399;
  font-size: 14px;
}
.input-with .el-input-group__append {
  background-color: #fff;
}
.input-with .el-input-group__prepend {
  background-color: #fff;
}
.el-select .el-input {
  width: 150px;
}
</style>
