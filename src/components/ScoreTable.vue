<template>
<div>
  <score-section
    :title="'根据每一项的要求对你的语言能力进行评分'"
    :section="level"
    :names="levelNames"
    :languages="languages"
    :legends="levelLegends"
    @updated="updated"
  ></score-section>
  <score-section
    :title="'根据下列各种因素对你学习每种语言的影响程度进行评分'"
    :section="impact"
    :names="impactNames"
    :languages="languages"
    :legends="impactLegends"
    @updated="updated"
  ></score-section>
  <score-section
    :title="'根据下列语言环境对你每种语言的使用频率进行评分'"
    :section="touch"
    :names="touchNames"
    :languages="languages"
    :legends="rateLegends"
    @updated="updated"
  ></score-section>
  <score-section
    :title="'根据下列描述的口音情况进行评分'"
    :section="oral"
    :names="oralNames"
    :languages="otherLanguages"
    :legends="rateLegends"
    @updated="updated"
  ></score-section>
</div>
</template>
<script>
import * as _ from 'lodash'
import ScoreSection from './ScoreSection'

export default {
  name: 'ScoreTable',
  props: ['languages'],
  data: function () {
    return {
      levelLegends: ['无', '很差', '差', '勉强', '尚可', '一般', '较好', '良好', '很好', '优秀', '精通'],
      impactLegends: ['无影响', '最小影响', '微弱影响', '稍有影响', '较少影响', '一般影响', '较为影响', '较大影响', '很大影响', '极大影响', '最大影响'],
      rateLegends: ['无', '几乎无', '很少', '少有', '偶尔', '中等', '稍多', '较多', '很多', '极多', '总是'],
      levelNames: {
        suffix: '该语言的能力',
        speak: '说',
        listen: '理解其他人说',
        read: '阅读'
      },
      contextNames: {
        family: '与家庭成员的互动',
        friend: '与朋友的互动',
        school: '学校',
        broadcast: '听广播或音乐',
        read: '阅读',
        tv: '看电视',
        network: '网站（如新闻/视频网站等）',
        social: '社交媒体（如QQ，微博，论坛等）'
      },
      level: {
        speak: {},
        listen: {},
        read: {}
      },
      impact: {
        family: {},
        friend: {},
        school: {},
        broadcast: {},
        read: {},
        tv: {},
        network: {},
        social: {}
      },
      touch: {
        family: {},
        friend: {},
        school: {},
        broadcast: {},
        read: {},
        tv: {},
        network: {},
        social: {}
      },
      oral: {
        speak: {},
        listen: {}
      }
    }
  },
  methods: {
    updated: function () {
      this.$emit('updated', {
        level: _.clone(this.level),
        impact: _.clone(this.impact),
        touch: _.clone(this.touch),
        oral: _.clone(this.oral)
      })
    }
  },
  watch: {
    languages: function (languages) {
      const init = {}
      _.each(languages, lang => {
        init[lang.id] = 0
      })

      this.level.speak = _.clone(init)
      this.level.listen = _.clone(init)
      this.level.read = _.clone(init)

      this.impact.family = _.clone(init)
      this.impact.friend = _.clone(init)
      this.impact.school = _.clone(init)
      this.impact.broadcast = _.clone(init)
      this.impact.read = _.clone(init)
      this.impact.tv = _.clone(init)
      this.impact.network = _.clone(init)
      this.impact.social = _.clone(init)

      this.touch.family = _.clone(init)
      this.touch.friend = _.clone(init)
      this.touch.school = _.clone(init)
      this.touch.broadcast = _.clone(init)
      this.touch.read = _.clone(init)
      this.touch.tv = _.clone(init)
      this.touch.network = _.clone(init)
      this.touch.social = _.clone(init)

      const initOthers = {}
      _.each(this.otherLanguages, lang => {
        initOthers[lang.id] = 0
      })
      this.oral.speak = _.clone(initOthers)
      this.oral.listen = _.clone(initOthers)
      this.updated()
    }
  },
  computed: {
    impactNames: function () {
      var names = _.clone(this.contextNames)
      names.suffix = '对你学习语言的影响程度'
      return names
    },
    touchNames: function () {
      var names = _.clone(this.contextNames)
      names.suffix = '语境中使用该语言的频率'
      return names
    },
    otherLanguages: function () {
      return this.languages.slice(1)
    },
    oralNames: function () {
      const languagesText = _.map(this.languages, lang => lang.text)
      const text = '他人根据你的口音，判断出你说的' + languagesText.slice(1).join('，') + '不是你的母语（' + languagesText[0] + '）的概率'
      return {
        speak: '你感觉自己使用每种语言的口音有多重',
        listen: text
      }
    }
  },
  components: {
    'score-section': ScoreSection
  }
}
</script>

<style>
  .rate-label {
    display: inline-block;
    padding-left: 50px;
    width: 150px;
  }
</style>