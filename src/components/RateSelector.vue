<template>
  <section>
    <h3>请拖动滑动条按要求选择关于你所掌握语言的百分比</h3>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'分别给出你接触下列语言的时间：'"
    ></rate-slicer>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'假设有一篇文章，有各种你所掌握语言的版本，你会选择每种语言阅读这篇文章的概率分别是多少：'"
    ></rate-slicer>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'当你和一个与你语言水平和语言能力都相仿的人<b>交谈</b>时，你会使用每种语言进行对话的概率是多少：'"
    ></rate-slicer>
    <rate-slicer
      v-if="languages.length"
      :sliders="languages"
      :tip="'当你和一个与你语言水平和语言能力都相仿的人<b>书信交流</b>时，你会使用每种语言进行对话的概率是多少：'"
    ></rate-slicer>
  </section>
</template>

<script>
import RateSlider from './RateSlider'

export default {
  name: 'RateSelector',
  props: ['languages'],
  components: {
    'rate-slicer': RateSlider
  }
}
</script>