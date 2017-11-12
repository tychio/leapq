<template>
<div>
  <section>
    <h3>请拖动滑动条根据说明选择你出现下列情况时的年龄</h3>
    <fieldset>
      <legend>你开始接触该语言的年龄：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{first[lang.id]}}岁）:</label>
          <Slider v-model="first[lang.id]" :min="0" :max="30"></Slider>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>你在学校正式学习该语言的年龄：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{study[lang.id]}}岁）:</label>
          <Slider v-model="study[lang.id]" :min="0" :max="30"></Slider>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>该语言第一次被用作<strong>教学语言</strong>时，你的年龄：（例如，老师用汉语上语文课）</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{speak[lang.id]}}岁）:</label>
          <Slider v-model="speak[lang.id]" :min="0" :max="30"></Slider>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>该语言第一次被用来教学<strong>非语言科目</strong>时，你的年龄：（例如，老师用汉语上数学、物理等课程）</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{normal[lang.id]}}岁）:</label>
          <Slider v-model="normal[lang.id]" :min="0" :max="30"></Slider>
        </template>
      </div>
    </fieldset>
  </section>

  <section>
    <h3>请拖动滑动条根据说明选择你在每种语言环境中所度过的时间（总年数）：</h3>
    <fieldset>
      <legend>你在使用该语言的<strong>学校</strong>进行学习了多少年：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{school[lang.id]}}年）:</label>
          <Slider v-model="school[lang.id]" :min="0" :max="30"></Slider>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>你在<strong>家里</strong>使用该语言有多少年：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{home[lang.id]}}年）:</label>
          <Slider @input="drag" v-model="home[lang.id]" :min="0" :max="30"></Slider>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>你在使用该语言的<strong>城市或社区</strong>生活了多少年：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{community[lang.id]}}年）:</label>
          <Slider @input="drag" v-model="community[lang.id]" :min="0" :max="30"></Slider>
        </template>
      </div>
    </fieldset>
  </section>
</div>
</template>
<script>
import * as _ from 'lodash'

export default {
  name: 'NumSelector',
  props: ['languages'],
  data: function () {
    return {
      first: {},
      study: {},
      speak: {},
      normal: {},
      school: {},
      home: {},
      community: {}
    }
  },
  methods: {
    drag: function () {
      this.$emit('updated', _.clone(this.$data))
    }
  },
  watch: {
    languages: function (languages) {
      const init = {}
      _.each(languages, lang => {
        init[lang.id] = 0
      })

      this.first = _.clone(init)
      this.study = _.clone(init)
      this.speak = _.clone(init)
      this.normal = _.clone(init)
      this.school = _.clone(init)
      this.home = _.clone(init)
      this.community = _.clone(init)
    }
  }
}
</script>