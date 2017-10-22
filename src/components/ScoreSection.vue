<template>
  <section>
    <p>{{title}}：</p>
    <fieldset v-for="(item, name) in section">
      <legend><strong>{{names[name]}}</strong>{{names.suffix}}</legend>
      <div v-for="lang in languages">
        <label class="rate-label">{{lang.text}}</label>
        <Rate :count="10" v-model="item[lang.id]"></Rate>
      </div>
    </fieldset>
  </section>
</template>
<script>
export default {
  name: 'ScoreSection',
  props: ['title', 'section', 'names', 'languages']
}
</script>

<style>
  .rate-label {
    display: inline-block;
    padding-left: 50px;
    width: 150px;
  }
</style>