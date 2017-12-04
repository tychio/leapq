<template>
  <div id="app">
    <header>
      <h1>语言经历和语言水平调查问卷 (Leap-Q)</h1>
    </header>
    <analysis v-if="page === 'analysis'"/>
    <leapq v-else/>
    <footer>
      <p>改编自<strong>西北双语和心理语言研究实验室</strong></p>
      <p>玛丽安，布鲁莫菲尔德，及考山斯卡娅2007版的LEAP-Q</p>
      <p>改编者 吴蕊霖 布鲁塞尔自由大学</p>
      <ul>
        <li><a href="http://www.vub.ac.be/" target="_blank">Vrije Universiteit Brussel</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import LeapQ from './components/LeapQ'
import Analysis from './components/Analysis'

export default {
  name: 'app',
  data: function () {
    return {
      page: null
    }
  },
  components: {
    leapq: LeapQ,
    analysis: Analysis
  },
  mounted: function () {
    const params = window.location.search.match(/(p=)([\w]+)/)
    if (params.length >= 3) {
      this.page = params[2]
    }
    window.onbeforeunload = function (e) {
      const message = '是否确认关闭当前窗口？'
      e = e || window.event
      // For IE and Firefox
      if (e) {
        e.returnValue = message
      }
      // For Safari
      return message
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

header, footer {
  text-align: center;
  font-weight: normal;
  padding: 20px 0;
}

header {
  border-bottom: 1px solid #888;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
