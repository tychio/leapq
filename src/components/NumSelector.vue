<template>
<div>
  <section>
    <h3>请{{actionName}}根据说明选择你出现下列情况时的年龄</h3>
    <fieldset>
      <legend>你开始接触该语言的年龄：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}
            <template v-if="results.first[lang.id] >= 0">（{{results.first[lang.id]}}岁）
            </template>
            <template v-else>（无此语言经历）</template>
          :</label>

          <v-touch @panstart="pan = 'first_' + lang.id" @panmove="panmove($event, 31)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
            <Slider ref="slider" @input="drag" v-model="results.first[lang.id]" :min="-1" :max="30" :tip-format="tipText"></Slider>
          </v-touch>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>你在学校正式学习该语言的年龄：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}
            <template v-if="results.study[lang.id] >= 0">（{{results.study[lang.id]}}岁）
            </template>
            <template v-else>（无此语言经历）</template>
          :</label>

          <v-touch @panstart="pan = 'study_' + lang.id" @panmove="panmove($event, 31)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
            <Slider ref="slider" @input="drag" v-model="results.study[lang.id]" :min="-1" :max="30" :tip-format="tipText"></Slider>
          </v-touch>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>该语言第一次被用作<strong>教学语言</strong>时，你的年龄：（例如，老师用汉语上汉语课；用英语上英语课）</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">

          <label>{{lang.text}}
            <template v-if="results.speak[lang.id] >= 0">（{{results.speak[lang.id]}}岁）
            </template>
            <template v-else>（无此语言经历）</template>
          :</label>

          <v-touch @panstart="pan = 'speak_' + lang.id" @panmove="panmove($event, 31)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
            <Slider ref="slider" @input="drag" v-model="results.speak[lang.id]" :min="-1" :max="30" :tip-format="tipText"></Slider>
          </v-touch>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>该语言第一次被用来教学<strong>非语言科目</strong>时，你的年龄：（例如，老师用汉语上数学、物理、化学等课程）</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}
            <template v-if="results.normal[lang.id] >= 0">（{{results.normal[lang.id]}}岁）
            </template>
            <template v-else>（无此语言经历）</template>
          :</label>

          <v-touch @panstart="pan = 'normal_' + lang.id" @panmove="panmove($event, 31)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
            <Slider ref="slider" @input="drag" v-model="results.normal[lang.id]" :min="-1" :max="30" :tip-format="tipText"></Slider>
          </v-touch>
        </template>
      </div>
    </fieldset>
  </section>

  <section>
    <h3>请{{actionName}}根据说明选择你在每种语言环境中所度过的时间（总年数）：</h3>
    <fieldset>
      <legend>你在使用该语言的<strong>学校</strong>学习了多少年：</legend>
      <p><i>例如：A同学，小学选择了维语民校学习6年，初中在维语民学校双语班3年，高中在内高班学习了3年，然后大学到海外留学了1年。由于初中双语班有维语授课也有汉语授课，因此使用维语学习为6年加3年，共<strong>9年</strong>维语学习时间；而初中双语班汉语授课3年，高中内高班为汉语学校，总共使用汉语学习为<strong>6年</strong>；虽然在初、高中阶段有英语课，但学校并未用英语授课，只有留学期间是英语授课，因此英语学习为<strong>1年</strong>。</i></p>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{results.school[lang.id]}}年）:</label>
          <v-touch @panstart="pan = 'school_' + lang.id" @panmove="panmove($event, 30)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
            <Slider ref="slider" @input="drag" v-model="results.school[lang.id]" :min="0" :max="30"></Slider>
          </v-touch>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>你在<strong>家里</strong>使用该语言有多少年：</legend>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{results.home[lang.id]}}年）:</label>
          <v-touch @panstart="pan = 'home_' + lang.id" @panmove="panmove($event, 30)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
            <Slider ref="slider" @input="drag" v-model="results.home[lang.id]" :min="0" :max="30"></Slider>
          </v-touch>
        </template>
      </div>
    </fieldset>
    <fieldset>
      <legend>你在使用该语言的<strong>城市或社区</strong>生活了多少年：</legend>
      <p><i>例如：A同学从出生到12岁之前都住在喀什市，后来搬到乌鲁木齐市居住了6年，接着到西安读大学，刚刚2年。喀什市以维语为主，西安以汉语为主，而乌鲁木齐市双语皆有，那么他在维语城市的生活时间应该是12年喀什生活加上6年乌鲁木齐生活，也就是<strong>18年</strong>维语生活；而汉语生活则是，乌鲁木齐6年加上西安2年的<strong>8年</strong>汉语生活。</i></p>
      <div class="slider-container">
        <template v-for="(lang, index) in languages">
          <label>{{lang.text}}（{{results.community[lang.id]}}年）:</label>
          <v-touch @panstart="pan = 'community_' + lang.id" @panmove="panmove($event, 30)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
            <Slider ref="slider" @input="drag" v-model="results.community[lang.id]" :min="0" :max="30"></Slider>
          </v-touch>
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
      results: {
        first: {},
        study: {},
        speak: {},
        normal: {},
        school: {},
        home: {},
        community: {}
      },
      pan: null
    }
  },
  methods: {
    drag: function () {
      this.$emit('updated', _.clone(this.results))
    },
    panmove: function (event, range) {
      if (this.pan) {
        const pos = event.center.x - this.$refs.slider[0].$el.offsetLeft
        let rate = pos / this.$refs.slider[0].$el.offsetWidth
        rate = rate > 1 ? 1 : rate
        let value = _.round(rate * range)
        const min = range === 30 ? 0 : -1
        value = value > min ? value : min
        const result = this.pan.split('_')
        this.results[result[0]][result[1]] = value
        this.drag()
      }
    },
    init: function (languages, original, defaultValue) {
      const init = {}
      _.each(languages, language => {
        init[language.id] = original[language.id] || defaultValue || 0
      })
      return init
    },
    tipText: function (age) {
      return age >= 0 ? age : '无'
    }
  },
  computed: {
    actionName: function () {
      if (window.document.body.clientWidth < 960) {
        return '点击横条'
      } else {
        return '拖动滑动条'
      }
    }
  },
  watch: {
    languages: function () {
      this.results.first = this.init(this.languages, this.results.first, -1)
      this.results.study = this.init(this.languages, this.results.study, -1)
      this.results.speak = this.init(this.languages, this.results.speak, -1)
      this.results.normal = this.init(this.languages, this.results.normal, -1)
      this.results.school = this.init(this.languages, this.results.school)
      this.results.home = this.init(this.languages, this.results.home)
      this.results.community = this.init(this.languages, this.results.community)
    }
  }
}
</script>