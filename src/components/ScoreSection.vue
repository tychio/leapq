<template>
  <section>
    <p>{{title}}：</p>
    <p>评分参考：（{{legends.join(' - ')}}）</p>
    <fieldset v-for="(item, name) in section">
      <legend><strong>{{names[name]}}</strong>{{names.suffix}}</legend>
      <div v-for="lang in languages">
        <label class="rate-label">{{lang.text}}</label>
        <Rate @input="updated" show-text :count="11" v-model="item[lang.id]">
          <span>{{legends[item[lang.id] - 1]}}</span>
        </Rate>
      </div>
    </fieldset>
  </section>
</template>
<script>
import * as _ from 'lodash'
export default {
  name: 'ScoreSection',
  props: ['title', 'section', 'names', 'languages', 'legends'],
  methods: {
    updated: function () {
      return this.$emit('updated', _.clone(this.section))
    }
  }
}
</script>

<style>
  .rate-label {
    display: inline-block;
    padding-left: 50px;
    width: 150px;
  }

  .ivu-rate-star {
    width: 30px;
    margin: 0;
  }


  @media (max-width: 960px) {
    .rate-label {
      padding-left: 0;
    }

    .ivu-rate {
      position: relative;
      width: 100%;
    }

    .ivu-rate-star {
      width: 9%;
    }

    .ivu-rate-text {
      position: absolute;
      top: -20px;
      right: 0;
    }
  }
</style>