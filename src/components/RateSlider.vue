<template>
  <fieldset>
    <legend v-html="tip"></legend>
    <div class="slider-container" v-if="sliders.length">
      <template v-for="(slider, index) in sliders">
        <label>{{slider.text}}({{results[slider.id]}}%):</label>
        <Slider v-model="results[slider.id]" @input="drag(index)" :step="5" show-stops></Slider>
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
    return {
      results: {},
      noInput: true
    }
  },
  watch: {
    sliders: function () {
      this.results = {}
      _.each(this.sliders, slider => {
        this.results[slider.id] = Math.round(100 / this.sliders.length)
        this.updatedResults()
        this.noInput = false
      })
    }
  },
  methods: {
    drag: function (index) {
      if (this.noInput) {
        return
      }

      this.noInput = true
      this.$nextTick(() => {
        this.results = this.average(this.results, index)
        this.updatedResults()
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
    },
    updatedResults: function () {
      this.$emit('updated', this.results)
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

@media (max-width: 960px) {
  .slider-container {
    padding: 0;
  }

  .ivu-slider-bar,
  .ivu-slider-stop,
  .ivu-slider-wrap {
    height: 16px;
    border-radius: 0;
  }

  .ivu-slider-button,
  .ivu-tooltip {
    display: none;
  }
}
</style>