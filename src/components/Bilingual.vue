<template>
<div>
  <section>
    <h3>是否在双语学校进行过学习？</h3>
    <p><small>双语学校指的是在学校的教学中会使用2种语言，比如“民汉合校”。</small></p>
    <fieldset>
      <span>否</span>
      <i-switch v-model="isBilingual"></i-switch>
      <span>是</span>
    </fieldset>
    <fieldset v-if="isBilingual">
      <legend>请选出该学校使用的哪2种语言:</legend>
      <Select v-model="bilingualLanguages" multiple style="width:260px">
        <Option v-for="item in languages" :value="item.id" :key="item.text">
          <span>{{ item.text }}</span>
        </Option>
      </Select>
    </fieldset>
    <fieldset v-if="isBilingual">
      <legend>你在<strong>双语言学校</strong>学习了多少年：</legend>
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
  props: ['languages', 'bilingual'],
  data: function () {
    const init = {}
    _.each(this.languages, lang => {
      init[lang.id] = 0
    })
    return {
      first: _.clone(init),
      study: _.clone(init),
      speak: _.clone(init),
      normal: _.clone(init),
      school: _.clone(init),
      home: _.clone(init),
      community: _.clone(init),
      isBilingual: this.bilingual.isBilingual,
      bilingualLanguages: _.keys(this.bilingual),
      bilingualPeriod: this.bilingual[_.keys(this.bilingual)[0]]
    }
  },
  methods: {
    drag: function () {
      const data = {
        isBilingual: this.isBilingual
      }
      _.each(this.bilingualLanguages, langId => {
        data[langId] = this.bilingualPeriod
      })
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