<template>
<div>
  <section>
    <h3>{{text.is}}</h3>
    <p><small>{{text.explain}}</small></p>
    <fieldset>
      <span>否</span>
      <i-switch v-model="isBilingual"></i-switch>
      <span>是</span>
    </fieldset>
    <fieldset v-if="isBilingual">
      <legend>{{text.which}}：</legend>
      <Select v-model="bilingualLanguages" multiple style="width:260px">
        <Option v-for="item in languages" :value="item.id" :key="item.text">
          <span>{{ item.text }}</span>
        </Option>
      </Select>
    </fieldset>
    <fieldset v-if="isBilingual">
      <legend>{{text.how}}：</legend>
      <div class="slider-container">
        <label>双语（{{bilingualPeriod}}年）:</label>
        <Slider @input="drag" v-model="bilingualPeriod" :min="0" :max="30"></Slider>
      </div>
    </fieldset>
  </section>
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
    },
    isBilingual: function (is) {
      if (!is) {
        this.bilingualLanguages = []
        this.bilingualPeriod = 0
      }
    }
  }
}
</script>