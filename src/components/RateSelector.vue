<template>
  <section>
    <h3>请{{actionName}}按要求选择关于你所掌握语言的百分比</h3>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'分别给出你接触下列语言的时间：'"
      @updated="updatedFirst"
    ></rate-slicer>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'假设有一篇文章，有各种你所掌握语言的版本，你会选择每种语言阅读这篇文章的概率分别是多少：'"
      @updated="updatedRead"
    ></rate-slicer>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'当你和一个与你语言水平和语言能力都相仿的人<b>交谈</b>时，你会使用每种语言进行对话的概率是多少：'"
      @updated="updatedSpeak"
    ></rate-slicer>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'当你和一个与你语言水平和语言能力都相仿的人<b>书信交流</b>时，你会使用每种语言进行对话的概率是多少：'"
      @updated="updatedWrite"
    ></rate-slicer>
  </section>
</template>

<script>
import RateSlider from './RateSlider'

export default {
  name: 'RateSelector',
  props: ['languages'],
  data: function () {
    return {
      results: {
        first: {},
        read: {},
        speak: {},
        write: {}
      }
    }
  },
  methods: {
    updatedFirst: function (data) {
      this.results.first = data
      this.update()
    },
    updatedRead: function (data) {
      this.results.read = data
      this.update()
    },
    updatedSpeak: function (data) {
      this.results.speak = data
      this.update()
    },
    updatedWrite: function (data) {
      this.results.write = data
      this.update()
    },
    update: function () {
      this.$emit('updated', this.results)
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
  components: {
    'rate-slicer': RateSlider
  }
}
</script>