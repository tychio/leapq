<template>
  <div class="card-wrapper">
    <p>请按照<strong>{{tip}}</strong>对下列语言进行排序（左边为最）</p>
    <Draggable v-model="sortedLanguages">
      <div class="card" v-for="lang in sortedLanguages" :key="lang.id">
        <Card>
          <p slot="title">{{lang.text}}</p>
          <p>{{lang.id | capitalize}}</p>
        </Card>
      </div>
    </Draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'LanguageSortable',
  props: ['languages', 'tip'],
  data: function () {
    return {
      sortedLanguages: this.languages
    }
  },
  watch: {
    sortedLanguages: function (languages) {
      this.$emit('sorted', languages)
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  components: {
    Draggable: draggable
  }
}
</script>

<style>
.card {
  display: inline-block;
  width: 20%;
  padding: 0 8px;
  cursor: move;
}
.card-wrapper {
  padding: 20px;
}
</style>