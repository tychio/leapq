<template>
<div>
  <score-section
    :title="'根据每一项的要求对你的语言能力进行评分'"
    :section="level"
    :names="levelNames"
    :languages="languages"
    :legends="levelLegends"
  ></score-section>
  <score-section
    :title="'根据下列各种因素对你学习每种语言的影响程度进行评分'"
    :section="impact"
    :names="impactNames"
    :languages="languages"
    :legends="impactLegends"
  ></score-section>
  <score-section
    :title="'根据下列语言环境对你每种语言的出现频率进行评分'"
    :section="touch"
    :names="touchNames"
    :languages="languages"
    :legends="rateLegends"
  ></score-section>
  <score-section
    :title="'根据下列描述的口音情况进行评分'"
    :section="oral"
    :names="oralNames"
    :languages="otherLanguages"
    :legends="rateLegends"
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
    const init = {}
    _.each(this.languages, lang => {
      init[lang.id] = 0
    })
    return {
      levelLegends: ['无', '很差', '差', '勉强', '尚可', '一般', '较好', '良好', '很好', '优秀', '精通'],
      impactLegends: ['无影响', '最小影响', '微弱影响', '稍有影响', '较少影响', '一般影响', '较为影响', '特别影响', '很大影响', '巨大影响', '最重要影响'],
      rateLegends: ['无', '几乎无', '很少', '少有', '偶尔', '平均', '稍多', '较多', '很多', '极多', '总是'],
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
      oralNames: {
        speak: '你感觉自己使用每种语言的口音有多重',
        listen: this.oralName()
      },
      level: {
        speak: _.clone(init),
        listen: _.clone(init),
        read: _.clone(init)
      },
      impact: {
        family: _.clone(init),
        friend: _.clone(init),
        school: _.clone(init),
        broadcast: _.clone(init),
        read: _.clone(init),
        tv: _.clone(init),
        network: _.clone(init),
        social: _.clone(init)
      },
      touch: {
        family: _.clone(init),
        friend: _.clone(init),
        school: _.clone(init),
        broadcast: _.clone(init),
        read: _.clone(init),
        tv: _.clone(init),
        network: _.clone(init),
        social: _.clone(init)
      },
      oral: {
        speak: _.clone(init),
        listen: _.clone(init)
      }
    }
  },
  methods: {
    oralName: function () {
      const languagesText = _.map(this.languages, lang => lang.text)
      const text = '他人根据你的口音，判断出你说的' + languagesText.slice(1).join('，') + '不是你的母语（' + languagesText[0] + '）的概率'
      return text
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
      names.suffix = '语境中出现该语言的频率'
      return names
    },
    otherLanguages: function () {
      return this.languages.slice(1)
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