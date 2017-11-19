<template>
<div>
  <fieldset>
    <legend>{{text.is}}</legend>
    <p><i>{{text.explain}}</i></p>
    <div class="form-group">
      <span>否</span>
      <i-switch v-model="isBilingual"></i-switch>
      <span>是</span>
    </div>
    <div class="form-group" v-if="isBilingual">
      <legend>{{text.which}}：</legend>
      <Select v-model="bilingualLanguages" multiple style="width:260px">
        <Option v-for="item in languages" :value="item.id" :key="item.text">
          <span>{{ item.text }}</span>
        </Option>
      </Select>
    </div>
    <div class="form-group" v-if="isBilingual">
      <legend>{{text.how}}：</legend>
      <div class="slider-container">
        <label>双语（{{bilingualPeriod}}年）:</label>
        <Slider @input="drag" v-model="bilingualPeriod" :min="0" :max="30"></Slider>
      </div>
    </div>
  </fieldset>
</div>
</template>
<script>
import * as _ from 'lodash'

export default {
  name: 'Bilingual',
  props: ['languages', 'bilingual', 'text'],
  data: function () {
    return {
      isBilingual: this.bilingual.isBilingual,
      bilingualLanguages: _.keys(this.bilingual),
      bilingualPeriod: this.bilingual[_.keys(this.bilingual)[0]]
    }
  },
  methods: {
    drag: function () {
      const data = {
        isBilingual: this.isBilingual,
        languages: this.bilingualLanguages,
        value: this.bilingualPeriod
      }
      this.$emit('updated', data)
    }
  },
  watch: {
    bilingualLanguages: function (langs) {
      if (langs.length >= 2) {
        this.bilingualLanguages.length = 2
      }
      this.drag()
    },
    isBilingual: function (is) {
      if (!is) {
        this.bilingualLanguages = []
        this.bilingualPeriod = 0
      }
      this.drag()
    }
  }
}
</script>

<style>
  .form-group {
    margin: 10px 0;
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }
</style>