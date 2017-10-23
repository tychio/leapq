<template>
  <section>
    <p>{{title}}：</p>
    <p>评分参考：（{{legends.join(' - ')}}）</p>
    <fieldset v-for="(item, name) in section">
      <legend><strong>{{names[name]}}</strong>{{names.suffix}}</legend>
      <div v-for="lang in languages">
        <label class="rate-label">{{lang.text}}</label>
        <Rate show-text :count="11" v-model="item[lang.id]">
          <span>{{legends[item[lang.id] - 1]}}</span>
        </Rate>
      </div>
    </fieldset>
  </section>
</template>
<script>
export default {
  name: 'ScoreSection',
  props: ['title', 'section', 'names', 'languages', 'legends']
}
</script>

<style>
  .rate-label {
    display: inline-block;
    padding-left: 50px;
    width: 150px;
  }
</style>