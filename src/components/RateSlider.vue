<template>
  <fieldset>
    <legend v-html="tip"></legend>
    <div class="slider-container" v-if="sliders.length">
      <template v-for="(slider, index) in sliders">
        <label>{{slider.text}}({{results[slider.id]}}%):</label>
        <v-touch @panstart="pan = slider.id" @panmove="panmove($event, index)" @panend="pan = null" :pan-options="{ direction: 'horizontal', threshold: 1 }">
          <Slider ref="slider" v-model="results[slider.id]" @input="drag(index)" :step="5" show-stops></Slider>
        </v-touch>
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
      noInput: true,
      pan: null
    }
  },
  watch: {
    sliders: function () {
      const copyResults = _.clone(this.results)
      this.results = {}
      _.each(this.sliders, slider => {
        this.results[slider.id] = copyResults[slider.id] || 0
        this.updatedResults()
        this.noInput = false
      })
    }
  },
  methods: {
    panmove: function (event, index) {
      if (this.pan) {
        let pos = event.center.x - this.$refs.slider[0].$el.offsetLeft
        pos = pos > 0 ? pos : 0
        let rate = pos / this.$refs.slider[0].$el.offsetWidth
        rate = rate > 1 ? 1 : rate
        this.results[this.pan] = _.round(rate * 100)
        this.drag(index)
      }
    },
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