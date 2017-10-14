<template>
  <fieldset>
    <legend v-html="tip"></legend>
    <div class="slider-container">
      <template v-for="(slider, index) in sliders">
        <label>{{slider.text}}({{results[slider.id]}}%):</label><Slider v-model="results[slider.id]" @input="drag(index)"></Slider>
      </template>
    </div>
  </fieldset>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'RateSlider',
  props: ['sliders', 'tip'],
  data: function () {
    const data = {
      results: {},
      noInput: false
    }
    _.each(this.sliders, slider => {
      data.results[slider.id] = Math.round(100 / this.sliders.length)
    })
    return data
  },
  methods: {
    drag: function (index) {
      if (this.noInput) {
        return
      }

      this.noInput = true
      this.$nextTick(() => {
        this.results = this.average(this.results, index)
        this.$nextTick(() => {
          this.noInput = false
        })
      })
    },
    average: function (results, specialIndex) {
      results = _.clone(results)
      const nextIndex = (specialIndex + 1) % this.sliders.length
      const nextLangId = this.sliders[nextIndex].id
      const rest = this.rest(results)
      const target = results[nextLangId] - rest
      results[nextLangId] = target < 0 ? 0 : target
      if (this.rest(results) !== 0) {
        return this.average(results, nextIndex)
      } else {
        return results
      }
    },
    rest: function (results) {
      return _.sum(_.map(results, item => item)) - 100
    }
  },
  mounted: function () {
    this.drag(0)
  }
}
</script>
<style>
fieldset {
  margin: 20px 0;
  padding: 20px;
}
legend {
  font-size: 18px;
}
.slider-container {
  padding: 10px 300px 10px 20px;
}
</style>