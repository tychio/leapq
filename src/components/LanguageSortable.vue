<template>
  <div class="card-wrapper">
    <h3 v-if="sortedLanguages.length">请{{isMobile ? '由上至下' : '由左至右'}}，按照你<strong>{{tip}}</strong>排列出下列语言</h3>
    <Draggable v-model="sortedLanguages">
      <div class="card" v-for="lang in sortedLanguages" :key="lang.id">
        <Card>
          <p slot="title">
            <span>{{lang.text}}</span>
            <Icon style="float: right" type="arrow-move" />
          </p>
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
      sortedLanguages: this.languages,
      isMobile: window.document.body.clientWidth < 960
    }
  },
  watch: {
    sortedLanguages: function (languages) {
      this.$emit('sorted', languages)
    },
    languages: function () {
      this.sortedLanguages = this.languages
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
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.card-wrapper {
  padding: 20px 0;
  border-top: 1px solid #ccc;
  margin-top: 20px;
}

h2 {
  font-size: 20px;
  font-weight: normal;
}

@media (max-width: 960px) {
  .card {
    overflow: hidden;
    width: 100%;
    margin: 10px 0;
  }
  .ivu-card-body {
    position: relative;
    top: -16px;
    right: -100%;
    padding: 0;
    margin-top: -22px;
    margin-left: -150px;
  }
}
</style>